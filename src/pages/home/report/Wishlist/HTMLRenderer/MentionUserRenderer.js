import React from 'react';
import {Wishlist, useTemplateValue, createRunInJsFn} from 'react-native-wishlist';
import ROUTES from '../../../../../ROUTES';
import Navigation from '../../../../../libs/Navigation/Navigation';
import * as StyleUtils from '../../../../../styles/StyleUtils';
import personalDetailsPropType from '../../../../personalDetailsPropType';
import Text from '../Text';

// Have to extract individual functions since they are used in a worklet.
const {getMentionStyle, getMentionTextColor} = StyleUtils;

const propTypes = {
    /**
     * Current user personal details
     */
    currentUserPersonalDetails: personalDetailsPropType.isRequired,
};

/**
 * Navigates to user details screen based on email
 * @param {String} email
 * @returns {void}
 * */
const showUserDetails = createRunInJsFn((email) => {
    Navigation.navigate(ROUTES.getDetailsRoute(email));
});

const MentionUserRenderer = (props) => {
    const login = props.currentUserPersonalDetails.login;
    const text = useTemplateValue((item) => item.children);
    // We need to remove the leading @ from data as it is not part of the login
    const loginWhithoutLeadingAt = useTemplateValue(() => text.value().slice(1));

    const style = useTemplateValue((item) => {
        const isOurMention = loginWhithoutLeadingAt.value() === login;
        return {...item.props, ...getMentionStyle(isOurMention), color: getMentionTextColor(isOurMention)};
    });

    return (
        <Wishlist.Pressable
            onPress={() => {
                'worklet';

                showUserDetails(loginWhithoutLeadingAt.value());
            }}
        >
            <Text style={style}>{text}</Text>
        </Wishlist.Pressable>
    );
};

MentionUserRenderer.propTypes = propTypes;
MentionUserRenderer.displayName = 'MentionUserRenderer';

export default MentionUserRenderer;
