import React, {useCallback} from 'react';
import {View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Str from 'expensify-common/lib/str';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import reportActionPropTypes from './reportActionPropTypes';
import ReportActionItemFragment from './ReportActionItemFragment';
import styles from '../../../styles/styles';
import CONST from '../../../CONST';
import ReportActionItemDate from './ReportActionItemDate';
import Avatar from '../../../components/Avatar';
import personalDetailsPropType from '../../personalDetailsPropType';
import compose from '../../../libs/compose';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import Navigation from '../../../libs/Navigation/Navigation';
import ROUTES from '../../../ROUTES';
import {withPersonalDetails} from '../../../components/OnyxProvider';
import Tooltip from '../../../components/Tooltip';
import ControlSelection from '../../../libs/ControlSelection';

const propTypes = {
    /** All the data of the action */
    action: PropTypes.shape(reportActionPropTypes).isRequired,

    /** All of the personalDetails */
    personalDetails: PropTypes.objectOf(personalDetailsPropType),

    /** Styles for the outermost View */
    // eslint-disable-next-line react/forbid-prop-types
    wrapperStyles: PropTypes.arrayOf(PropTypes.object),

    /** Children view component for this action item */
    children: PropTypes.node.isRequired,

    /** Show header for action */
    showHeader: PropTypes.bool,

    ...withLocalizePropTypes,
};

const defaultProps = {
    personalDetails: {},
    wrapperStyles: [styles.chatItem],
    showHeader: true,
};

const showUserDetails = (email) => {
    Navigation.navigate(ROUTES.getDetailsRoute(email));
};

const ReportActionItemSingle = (props) => {
    // const avatarUrl = props.action.automatic
    //     ? `${CONST.CLOUDFRONT_URL}/images/icons/concierge_2019.svg`

    //     // Use avatar in personalDetails if we have one then fallback to avatar provided by the action
    //     : (avatar || props.action.avatar);

    const personArray = useTemplateValue(action => [{type: 'TEXT', text: 'Marc'}]);

    const avatarUrl = useTemplateValue(action => action.avatar);

    return (
        <View style={props.wrapperStyles}>
            <Wishlist.Pressable
                style={styles.alignSelfStart}
                onPress={props.onUserPressed}
            >
                <Wishlist.Image style={styles.actionAvatar} source={{uri: avatarUrl}} />
                {/* <Tooltip text={props.action.actorEmail}>
                    <Avatar
                        containerStyles={[styles.actionAvatar]}
                        source={avatarUrl}
                    />
                </Tooltip> */}
            </Wishlist.Pressable>
            <View style={[styles.chatItemRight]}>
                {props.showHeader ? (
                    <View style={[styles.chatItemMessageHeader]}>
                        <Wishlist.Pressable
                            style={[styles.flexShrink1]}
                            onPressIn={ControlSelection.block}
                            onPressOut={ControlSelection.unblock}
                            onPress={props.onUserPressed}
                        >
                            <Wishlist.Template type="report-action-item-fragment-person">
                                <ReportActionItemFragment tooltipText="TODO" isSingleLine />
                            </Wishlist.Template>

                            <Wishlist.ForEach items={personArray} template="report-action-item-fragment-person" />
                        </Wishlist.Pressable>
                        {/* <ReportActionItemDate created={props.action.created} /> */}
                    </View>
                ) : null}
                {props.children}
            </View>
        </View>
    );
};

ReportActionItemSingle.propTypes = propTypes;
ReportActionItemSingle.defaultProps = defaultProps;
ReportActionItemSingle.displayName = 'ReportActionItemSingle';

export default compose(
    withLocalize,
    withPersonalDetails(),
)(ReportActionItemSingle);
