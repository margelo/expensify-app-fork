/* eslint-disable es/no-optional-chaining */
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {Wishlist, createRunInJsFn, useTemplateValue} from 'react-native-wishlist';
import ROUTES from '../../../../ROUTES';
import Navigation from '../../../../libs/Navigation/Navigation';
import styles from '../../../../styles/styles';
import reportActionPropTypes from '../reportActionPropTypes';
import Avatar from './Avatar';
import ReportActionItemDate from './ReportActionItemDate';
import Text from './Text';

// TODO:
// - isWorkspaceActor
// - delegateAccountID

const propTypes = {
    /** All the data of the action */
    action: PropTypes.shape(reportActionPropTypes).isRequired,

    /** Styles for the outermost View */
    // eslint-disable-next-line react/forbid-prop-types
    wrapperStyles: PropTypes.arrayOf(PropTypes.object),

    /** Children view component for this action item */
    children: PropTypes.node.isRequired,

    /** Show header for action */
    showHeader: PropTypes.bool,
};

const defaultProps = {
    wrapperStyles: [styles.chatItem],
    showHeader: true,
};

const showUserDetails = createRunInJsFn((email) => {
    Navigation.navigate(ROUTES.getDetailsRoute(email));
});

function ReportActionItemSingle(props) {
    const {action} = props;
    const actorAccountID = useTemplateValue(() => action.value().actorAccountID);
    const displayName = useTemplateValue(() => action.value().actorDisplayName);
    const avatarSource = useTemplateValue(() => action.value().actorAvatar);
    const createdFormatted = useTemplateValue(() => action.value().createdFormatted);

    const handleShowUserDetails = () => {
        'worklet';

        showUserDetails(actorAccountID.value());
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
}

ReportActionItemSingle.propTypes = propTypes;
ReportActionItemSingle.defaultProps = defaultProps;
ReportActionItemSingle.displayName = 'ReportActionItemSingle';

export default ReportActionItemSingle;
