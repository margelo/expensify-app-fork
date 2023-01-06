import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {useTemplateValue, Wishlist, createRunInJsFn} from 'react-native-wishlist';
import CONST from '../../../CONST';
import ONYXKEYS from '../../../ONYXKEYS';
import reportActionPropTypes from './reportActionPropTypes';
import * as StyleUtils from '../../../styles/StyleUtils';
import ReportActionItemSingle from './ReportActionItemSingle';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import ReportActionItemMessage from './ReportActionItemMessage';
import compose from '../../../libs/compose';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../components/withWindowDimensions';
import {withBlockedFromConcierge, withNetwork, withReportActionsDrafts} from '../../../components/OnyxProvider';
import InlineSystemMessage from '../../../components/InlineSystemMessage';
import styles from '../../../styles/styles';
import OfflineWithFeedback from '../../../components/OfflineWithFeedback';
import * as ReportActions from '../../../libs/actions/ReportActions';
import reportPropTypes from '../../reportPropTypes';
import Navigation from '../../../libs/Navigation/Navigation';
import ROUTES from '../../../ROUTES';

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

const showUserDetails = (email) => {
    Navigation.navigate(ROUTES.getDetailsRoute(email));
};

function ReportActionItem(props) {
    const errorMessage = useTemplateValue(item => item.error);
    const displayAsGroup = false; // TODO

    const onUserPressed = useCallback((item) => {
        showUserDetails(item.actorEmail);
    });

    return (
        <View>
            <View accessibilityLabel="Chat message">
                <View
                    style={StyleUtils.getReportActionItemStyle(
                        false,
                        false,
                        '',
                        false,
                    )}
                >
                    {!displayAsGroup
                        ? (
                            <ReportActionItemSingle showHeader onUserPressed={createRunInJsFn(onUserPressed)} action={props.action}>
                                <ReportActionItemMessage />
                            </ReportActionItemSingle>
                        )
                        : (
                            <ReportActionItemGrouped>
                                <ReportActionItemMessage />
                            </ReportActionItemGrouped>
                        )}
                </View>
            </View>
            {/* <View style={styles.reportActionSystemMessageContainer}>
                <InlineSystemMessage message={errorMessage} />
            </View> */}
        </View>
    );
}

ReportActionItem.propTypes = propTypes;
ReportActionItem.defaultProps = defaultProps;
ReportActionItem.displayName = 'ReportActionItem';

export default compose(
    withWindowDimensions,
    withNetwork(),
    withBlockedFromConcierge({propName: 'blockedFromConcierge'}),
)(ReportActionItem);
