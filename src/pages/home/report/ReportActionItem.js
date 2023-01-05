import _ from 'underscore';
import lodashGet from 'lodash/get';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import CONST from '../../../CONST';
import ONYXKEYS from '../../../ONYXKEYS';
import reportActionPropTypes from './reportActionPropTypes';
import * as StyleUtils from '../../../styles/StyleUtils';
import PressableWithSecondaryInteraction from '../../../components/PressableWithSecondaryInteraction';
import Hoverable from '../../../components/Hoverable';
import ReportActionItemSingle from './ReportActionItemSingle';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import IOUAction from '../../../components/ReportActionItem/IOUAction';
import ReportActionItemMessage from './ReportActionItemMessage';
import UnreadActionIndicator from '../../../components/UnreadActionIndicator';
import ReportActionItemMessageEdit from './ReportActionItemMessageEdit';
import ReportActionItemCreated from './ReportActionItemCreated';
import compose from '../../../libs/compose';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../components/withWindowDimensions';
import ControlSelection from '../../../libs/ControlSelection';
import canUseTouchScreen from '../../../libs/canUseTouchscreen';
import MiniReportActionContextMenu from './ContextMenu/MiniReportActionContextMenu';
import * as ReportActionContextMenu from './ContextMenu/ReportActionContextMenu';
import * as ContextMenuActions from './ContextMenu/ContextMenuActions';
import {withBlockedFromConcierge, withNetwork, withReportActionsDrafts} from '../../../components/OnyxProvider';
import RenameAction from '../../../components/ReportActionItem/RenameAction';
import InlineSystemMessage from '../../../components/InlineSystemMessage';
import styles from '../../../styles/styles';
import SelectionScraper from '../../../libs/SelectionScraper';
import * as User from '../../../libs/actions/User';
import * as ReportUtils from '../../../libs/ReportUtils';
import OfflineWithFeedback from '../../../components/OfflineWithFeedback';
import * as ReportActions from '../../../libs/actions/ReportActions';
import reportPropTypes from '../../reportPropTypes';
import focusTextInputAfterAnimation from '../../../libs/focusTextInputAfterAnimation';

const propTypes = {
    /** Report for this action */
    report: reportPropTypes.isRequired,

    /** All the data of the action item */
    action: PropTypes.shape(reportActionPropTypes).isRequired,

    /** Should the comment have the appearance of being grouped with the previous comment? */
    displayAsGroup: PropTypes.bool.isRequired,

    /** Is this the most recent IOU Action? */
    isMostRecentIOUReportAction: PropTypes.bool.isRequired,

    /** Should we display the new indicator on top of the comment? */
    shouldDisplayNewIndicator: PropTypes.bool.isRequired,

    /** Position index of the report action in the overall report FlatList view */
    index: PropTypes.number.isRequired,

    /** Draft message - if this is set the comment is in 'edit' mode */
    draftMessage: PropTypes.string,

    ...windowDimensionsPropTypes,
};

const defaultProps = {
    draftMessage: '',
};

const ReportActionItem = (props) => {
    const [isContextMenuActive, setIsContextMenuActive] = useState(ReportActionContextMenu.isActiveReportAction(props.action.reportActionID));

    const popoverAnchor = useRef();
    const textInput = useRef();

    const previousDraftMessage = usePrevious(props.draftMessage);

    /**
     * Show the ReportActionContextMenu modal popover.
     *
     * @param {Object} [event] - A press event.
     */
    const showPopover = (event) => {
        // Block menu on the message being Edited
        if (props.draftMessage) {
            return;
        }

        setIsContextMenuActive(true);
        const selection = SelectionScraper.getCurrentSelection();
        ReportActionContextMenu.showContextMenu(
            ContextMenuActions.CONTEXT_MENU_TYPES.REPORT_ACTION,
            event,
            selection,
            popoverAnchor,
            props.report.reportID,
            props.action,
            props.draftMessage,
            undefined,
            () => setIsContextMenuActive(ReportActionContextMenu.isActiveReportAction(props.action.reportActionID)),
        );
    };

    /**
     * Get the content of ReportActionItem
     *
     * @param {Boolean} hovered whether the ReportActionItem is hovered
     * @returns {Object} child component(s)
     */
    const renderItemContent = (hovered = false) => {
        let children;
        if (props.action.actionName === CONST.REPORT.ACTIONS.TYPE.IOU) {
            children = (
                <IOUAction
                    chatReportID={props.report.reportID}
                    action={props.action}
                    isMostRecentIOUReportAction={props.isMostRecentIOUReportAction}
                    isHovered={hovered}
                />
            );
        } else {
            children = props.draftMessage
                ? (
                    <ReportActionItemMessageEdit
                        action={props.action}
                        draftMessage={props.draftMessage}
                        reportID={props.report.reportID}
                        index={props.index}
                        ref={textInput}
                        report={props.report}
                        shouldDisableEmojiPicker={
                            (ReportUtils.chatIncludesConcierge(props.report) && User.isBlockedFromConcierge(props.blockedFromConcierge))
                            || ReportUtils.isArchivedRoom(props.report)
                        }
                    />
                ) : (
                    <ReportActionItemMessage action={props.action} />
                );
        }
        return children;
    };

    if (props.draftMessage && !previousDraftMessage) {
        // Only focus the input when user edits a message, skip it for existing drafts being edited of the report.
        // There is an animation when the comment is hidden and the edit form is shown, and there can be bugs on different mobile platforms
        // if the input is given focus in the middle of that animation which can prevent the keyboard from opening.
        focusTextInputAfterAnimation(textInput, 100);
    }

    if (props.action.actionName === CONST.REPORT.ACTIONS.TYPE.CREATED) {
        return <ReportActionItemCreated reportID={props.report.reportID} />;
    }

    if (props.action.actionName === CONST.REPORT.ACTIONS.TYPE.RENAMED) {
        return <RenameAction action={props.action} />;
    }

    return (
        <PressableWithSecondaryInteraction
            ref={popoverAnchor}
            onPressIn={() => props.isSmallScreenWidth && canUseTouchScreen() && ControlSelection.block()}
            onPressOut={() => ControlSelection.unblock()}
            onSecondaryInteraction={showPopover}
            preventDefaultContentMenu={!props.draftMessage}
        >
            <Hoverable>
                {hovered => (
                    <View accessibilityLabel="Chat message">
                        {props.shouldDisplayNewIndicator && (
                            <UnreadActionIndicator sequenceNumber={props.action.sequenceNumber} />
                        )}
                        <View
                            style={StyleUtils.getReportActionItemStyle(
                                hovered
                                || isContextMenuActive
                                || props.draftMessage,
                                (props.network.isOffline && props.action.isLoading) || props.action.error,
                            )}
                        >
                            <OfflineWithFeedback
                                onClose={() => {
                                    if (props.action.pendingAction === CONST.RED_BRICK_ROAD_PENDING_ACTION.ADD) {
                                        const sequenceNumber = props.action.actionName === CONST.REPORT.ACTIONS.TYPE.IOU
                                            ? props.action.sequenceNumber
                                            : props.action.clientID;
                                        ReportActions.deleteOptimisticReportAction(props.report.reportID, sequenceNumber);
                                    } else {
                                        ReportActions.clearReportActionErrors(props.report.reportID, props.action.sequenceNumber);
                                    }
                                }}
                                pendingAction={props.draftMessage ? null : props.action.pendingAction}
                                errors={props.action.errors}
                                errorRowStyles={[styles.ml10, styles.mr2]}
                            >
                                {!props.displayAsGroup
                                    ? (
                                        <ReportActionItemSingle action={props.action} showHeader={!props.draftMessage}>
                                            {renderItemContent(hovered || isContextMenuActive)}
                                        </ReportActionItemSingle>
                                    )
                                    : (
                                        <ReportActionItemGrouped>
                                            {renderItemContent(hovered || isContextMenuActive)}
                                        </ReportActionItemGrouped>
                                    )}
                            </OfflineWithFeedback>
                        </View>
                        <MiniReportActionContextMenu
                            reportID={props.report.reportID}
                            reportAction={props.action}
                            isArchivedRoom={ReportUtils.isArchivedRoom(props.report)}
                            displayAsGroup={props.displayAsGroup}
                            isVisible={hovered && !isContextMenuActive && !props.draftMessage}
                            draftMessage={props.draftMessage}
                            isChronosReport={ReportUtils.chatIncludesChronos(props.report)}
                        />
                    </View>
                )}
            </Hoverable>
            <View style={styles.reportActionSystemMessageContainer}>
                <InlineSystemMessage message={props.action.error} />
            </View>
        </PressableWithSecondaryInteraction>
    );
};

ReportActionItem.propTypes = propTypes;
ReportActionItem.defaultProps = defaultProps;
ReportActionItem.displayName = 'ReportActionItem';

export default compose(
    withWindowDimensions,
    withNetwork(),
    withBlockedFromConcierge({propName: 'blockedFromConcierge'}),
    withReportActionsDrafts({
        propName: 'draftMessage',
        transformValue: (drafts, props) => {
            const draftKey = `${ONYXKEYS.COLLECTION.REPORT_ACTIONS_DRAFTS}${props.report.reportID}_${props.action.reportActionID}`;
            return lodashGet(drafts, draftKey, '');
        },
    }),
)(ReportActionItem);
