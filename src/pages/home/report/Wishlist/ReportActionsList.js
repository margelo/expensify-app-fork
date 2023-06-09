import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Wishlist, useWishlistData} from 'react-native-wishlist';
import _ from 'underscore';
import CONST from '../../../../CONST';
import {withNetwork, withPersonalDetails} from '../../../../components/OnyxProvider';
import withDrawerState, {withDrawerPropTypes} from '../../../../components/withDrawerState';
import withLocalize from '../../../../components/withLocalize';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../../components/withWindowDimensions';
import compose from '../../../../libs/compose';
import styles from '../../../../styles/styles';
import reportActionPropTypes from '../reportActionPropTypes';
import ReportActionItem from './ReportActionItem';
import * as ReportActionsUtils from '../../../../libs/ReportActionsUtils';
import * as EmojiUtils from '../../../../libs/EmojiUtils';

const propTypes = {
    /** Sorted actions prepared for display */
    sortedReportActions: PropTypes.arrayOf(PropTypes.shape(reportActionPropTypes)).isRequired,

    ...withDrawerPropTypes,
    ...windowDimensionsPropTypes,
};

const defaultProps = {};

const ReportActionsList = (props) => {
    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, {duration: 100});
    }, [opacity]);

    const data = useWishlistData(
        _.map(props.sortedReportActions, (a, index) => ({
            key: a.reportActionID,
            type: a.actionName,
            action: {
                ...a,
                message: _.map(a.message, (m) => ({
                    ...m,
                    isOnlyEmoji: EmojiUtils.containsOnlyEmojis(m.text),

                })),
                createdFormatted: props.datetimeToCalendarTime(a.created),
                displayAsGroup: ReportActionsUtils.isConsecutiveActionMadeByPreviousActor(props.sortedReportActions, index),
            },
        })),
    );

    return (
        <Animated.View style={[animatedStyles, styles.flex1]}>
            <Wishlist.Component
                style={styles.flex1}
                initialIndex={props.sortedReportActions.length - 1}
                data={data}
            >
                <Wishlist.Template type={CONST.REPORT.ACTIONS.TYPE.ADDCOMMENT}>
                    <ReportActionItem personalDetails={props.personalDetails} />
                </Wishlist.Template>
            </Wishlist.Component>
        </Animated.View>
    );
};

ReportActionsList.propTypes = propTypes;
ReportActionsList.defaultProps = defaultProps;
ReportActionsList.displayName = 'ReportActionsList';

export default compose(withDrawerState, withWindowDimensions, withLocalize, withPersonalDetails(), withNetwork())(ReportActionsList);
