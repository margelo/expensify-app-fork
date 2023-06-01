/* eslint-disable es/no-optional-chaining */
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useAmbientTRenderEngine} from 'react-native-render-html';
import {Wishlist, useTemplateValue, useWishlistData} from 'react-native-wishlist';
import _ from 'underscore';
import CONST from '../../../../CONST';
import {withNetwork, withPersonalDetails} from '../../../../components/OnyxProvider';
import ReportActionsSkeletonView from '../../../../components/ReportActionsSkeletonView';
import withCurrentUserPersonalDetails, {withCurrentUserPersonalDetailsDefaultProps, withCurrentUserPersonalDetailsPropTypes} from '../../../../components/withCurrentUserPersonalDetails';
import withLocalize from '../../../../components/withLocalize';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../../components/withWindowDimensions';
import * as EmojiUtils from '../../../../libs/EmojiUtils';
import * as ReportActionsUtils from '../../../../libs/ReportActionsUtils';
import * as ReportUtils from '../../../../libs/ReportUtils';
import * as UserUtils from '../../../../libs/UserUtils';
import * as Report from '../../../../libs/actions/Report';
import compose from '../../../../libs/compose';
import styles from '../../../../styles/styles';
import reportActionPropTypes from '../reportActionPropTypes';
import CustomRenderers from './HTMLRenderer/CustomRenderers';
import parseHtml from './HTMLRenderer/parseHtml';
import ReportActionItem from './ReportActionItem';
import ReportActionItemCreated from './ReportActionItemCreated';
import FloatingMessageCounter from '../FloatingMessageCounter';
import useNetwork from '../../../../hooks/useNetwork';
import useReportScrollManager from '../../../../hooks/useReportScrollManager';

function ReportActionItemUnimplemented() {
    const type = useTemplateValue((item) => item.action.actionName);
    return (
        <View style={{flexDirection: 'row', borderColor: 'red', borderWidth: 1, padding: 16}}>
            <Text style={{color: 'white'}}>Unimplemented:</Text>
            <Wishlist.Text style={{color: 'white'}}>{type}</Wishlist.Text>
        </View>
    );
}

function ReportActionItemLoading() {
    return (
        <ReportActionsSkeletonView
            containerHeight={CONST.CHAT_SKELETON_VIEW.AVERAGE_ROW_HEIGHT}
            animate
        />
    );
}

const propTypes = {
    /** Sorted actions prepared for display */
    sortedReportActions: PropTypes.arrayOf(PropTypes.shape(reportActionPropTypes)).isRequired,

    ...windowDimensionsPropTypes,
    ...withCurrentUserPersonalDetailsPropTypes,
};

const defaultProps = {
    ...withCurrentUserPersonalDetailsDefaultProps,
};

function ReportActionsList({
    report,
    sortedReportActions,
    windowHeight,
    onScroll,
    mostRecentIOUReportActionID,
    isSmallScreenWidth,
    personalDetailsList,
    currentUserPersonalDetails,
    hasOutstandingIOU,
    loadMoreChats,
    onLayout,
    isComposerFullSize,
    datetimeToCalendarTime,
    policy,
}) {
    const reportScrollManager = useReportScrollManager();
    const [skeletonViewHeight, setSkeletonViewHeight] = useState(0);
    const {isOffline} = useNetwork();
    const opacity = useSharedValue(0);
    const [isFloatingMessageCounterVisible, setIsFloatingMessageCounterVisible] = useState(false);
    const currentUnreadMarker = useRef(null);
    const readActionSkipped = useRef(false);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, {duration: 100});
    }, [opacity]);

    const renderEngine = useAmbientTRenderEngine();

    const mapReportAction = useCallback(
        (a, index, loading) => {
            let type;
            switch (a.actionName) {
                case CONST.REPORT.ACTIONS.TYPE.CREATED:
                case CONST.REPORT.ACTIONS.TYPE.ADDCOMMENT:
                    type = a.actionName;
                    break;
                default:
                    type = 'unimplemented';
                    break;
            }

            const actorPersonalDetails = personalDetailsList[a.actorAccountID];
            return {
                key: a.reportActionID,
                type: loading ? 'loading' : type,
                action: loading
                    ? null
                    : {
                          ...a,
                          message: _.map(a.message, (m) => ({
                              ...m,
                              isOnlyEmoji: EmojiUtils.containsOnlyEmojis(m.text),
                              htmlTree: m.html != null ? parseHtml(renderEngine, m.html) : null,
                          })),
                          createdFormatted: datetimeToCalendarTime(a.created),
                          displayAsGroup: ReportActionsUtils.isConsecutiveActionMadeByPreviousActor(sortedReportActions, index),
                          actorDisplayName: actorPersonalDetails?.displayName,
                          actorAvatar: UserUtils.getAvatar(actorPersonalDetails?.avatar, a.actorAccountID),
                      },
            };
        },
        [datetimeToCalendarTime, sortedReportActions, renderEngine, personalDetailsList],
    );

    const data = useWishlistData(() => _.map(sortedReportActions, (a, i) => mapReportAction(a, i, i >= 100)).reverse());

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newData = _.map(sortedReportActions, (a, i) => mapReportAction(a, i, false)).reverse();
            data.update((dataCopy) => {
                'worklet';

                dataCopy.setItems(newData);
            });
        }, 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [data, mapReportAction, sortedReportActions]);

    const onStartReached = () => {
        loadMoreChats();
    };

    const scrollToBottomAndMarkReportAsRead = () => {
        reportScrollManager.scrollToBottom();
        readActionSkipped.current = false;
        Report.readNewestAction(report.reportID);
    };

    const shouldShowReportRecipientLocalTime = ReportUtils.canShowReportRecipientLocalTime(personalDetailsList, report);

    return (
        <>
            <FloatingMessageCounter
                isActive={isFloatingMessageCounterVisible && !!currentUnreadMarker.current}
                onClick={scrollToBottomAndMarkReportAsRead}
            />
            <Animated.View style={[animatedStyles, styles.flex1]}>
                <Wishlist.Component
                    style={styles.flex1}
                    initialIndex={sortedReportActions.length - 1}
                    data={data}
                    contentContainerStyle={[styles.chatContentScrollView, shouldShowReportRecipientLocalTime && styles.pt0]}
                    onStartReached={onStartReached}
                    ListHeaderComponent={() => {
                        if (report.isLoadingMoreReportActions) {
                            return <ReportActionsSkeletonView containerHeight={CONST.CHAT_SKELETON_VIEW.AVERAGE_ROW_HEIGHT * 3} />;
                        }

                        // Make sure the oldest report action loaded is not the first. This is so we do not show the
                        // skeleton view above the created action in a newly generated optimistic chat or one with not
                        // that many comments.
                        const lastReportAction = _.last(sortedReportActions) || {};
                        if (report.isLoadingReportActions && lastReportAction.actionName !== CONST.REPORT.ACTIONS.TYPE.CREATED) {
                            return (
                                <ReportActionsSkeletonView
                                    containerHeight={skeletonViewHeight}
                                    animate={!isOffline}
                                />
                            );
                        }

                        return null;
                    }}
                    onLayout={(event) => {
                        setSkeletonViewHeight(event.nativeEvent.layout.height);
                        onLayout(event);
                    }}
                >
                    <Wishlist.Template type={CONST.REPORT.ACTIONS.TYPE.ADDCOMMENT}>
                        <ReportActionItem />
                    </Wishlist.Template>
                    <Wishlist.Template type={CONST.REPORT.ACTIONS.TYPE.CREATED}>
                        <ReportActionItemCreated
                            report={report}
                            policy={policy}
                            personalDetails={personalDetailsList}
                        />
                    </Wishlist.Template>
                    <Wishlist.Template type="unimplemented">
                        <ReportActionItemUnimplemented />
                    </Wishlist.Template>
                    <Wishlist.Template type="loading">
                        <ReportActionItemLoading />
                    </Wishlist.Template>
                    {_.map(CustomRenderers, (getComponent, name) => {
                        const Component = getComponent();
                        return (
                            <Wishlist.Template
                                key={name}
                                type={name}
                            >
                                <Component currentUserPersonalDetails={currentUserPersonalDetails} />
                            </Wishlist.Template>
                        );
                    })}
                </Wishlist.Component>
            </Animated.View>
        </>
    );
}

ReportActionsList.propTypes = propTypes;
ReportActionsList.defaultProps = defaultProps;
ReportActionsList.displayName = 'ReportActionsList';

export default compose(withWindowDimensions, withLocalize, withPersonalDetails(), withNetwork(), withCurrentUserPersonalDetails)(ReportActionsList);
