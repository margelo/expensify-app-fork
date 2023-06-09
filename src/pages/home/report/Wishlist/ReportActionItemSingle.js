/* eslint-disable es/no-optional-chaining */
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {Wishlist, useTemplateValue, runOnJS} from 'react-native-wishlist';
import CONST from '../../../../CONST';
import ROUTES from '../../../../ROUTES';
import Avatar from './Avatar';
import Navigation from '../../../../libs/Navigation/Navigation';
import * as UserUtils from '../../../../libs/UserUtils';
import styles from '../../../../styles/styles';
import personalDetailsPropType from '../../../personalDetailsPropType';
import reportActionPropTypes from '../reportActionPropTypes';
import ReportActionItemDate from './ReportActionItemDate';
import Text from './Text';

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
    const {personalDetails, action} = props;
    const actorEmail = useTemplateValue(() => action.value().actorEmail.replace(CONST.REGEX.MERGED_ACCOUNT_PREFIX, ''));
    const actorPersonalDetails = useTemplateValue(() => personalDetails[actorEmail.value()]);
    const displayName = useTemplateValue(() => actorPersonalDetails.value()?.displayName);
    const avatarSource = useTemplateValue(() => {
        return UserUtils.getAvatar(actorPersonalDetails.value()?.avatar, actorEmail.value())
    });

    const createdFormatted = useTemplateValue((item) => item.action.createdFormatted);

    const handleShowUserDetails = () => {
        'worklet';

        runOnJS(showUserDetails)(actorEmail.value());
    };

    return (
        <View style={props.wrapperStyles}>
            <Wishlist.Pressable
                style={[styles.alignSelfStart, styles.mr3]}
                // onPressIn={ControlSelection.block}
                // onPressOut={ControlSelection.unblock}
                onPress={handleShowUserDetails}
            >
                <View>
                    <Avatar
                        containerStyles={[styles.actionAvatar]}
                        source={avatarSource}
                    />
                </View>
            </Wishlist.Pressable>
            <View style={[styles.chatItemRight]}>
                {props.showHeader ? (
                    <View style={[styles.chatItemMessageHeader]}>
                        <Wishlist.Pressable
                            style={[styles.flexShrink1, styles.mr1]}
                            // onPressIn={ControlSelection.block}
                            // onPressOut={ControlSelection.unblock}
                            onPress={handleShowUserDetails}
                        >
                            <Text>{displayName}</Text>
                        </Wishlist.Pressable>
                        <ReportActionItemDate created={createdFormatted} />
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

export default ReportActionItemSingle;
