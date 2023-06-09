import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {Wishlist, useTemplateValue} from 'react-native-wishlist';
import _ from 'underscore';
import CONST from '../../../../CONST';
import * as StyleUtils from '../../../../styles/StyleUtils';
import stylePropTypes from '../../../../styles/stylePropTypes';

const propTypes = {
    /** Source for the avatar. Can be a URL or an icon. */
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    /** Extra styles to pass to Image */
    // eslint-disable-next-line react/forbid-prop-types
    imageStyles: PropTypes.arrayOf(PropTypes.object),

    /** Extra styles to pass to View wrapper */
    containerStyles: stylePropTypes,

    /** Set the size of Avatar */
    size: PropTypes.oneOf(_.values(CONST.AVATAR_SIZE)),

    /** Denotes whether it is an avatar or a workspace avatar */
    type: PropTypes.oneOf([CONST.ICON_TYPE_AVATAR, CONST.ICON_TYPE_WORKSPACE]),
};

const defaultProps = {
    source: null,
    imageStyles: [],
    containerStyles: [],
    size: CONST.AVATAR_SIZE.DEFAULT,
    type: CONST.ICON_TYPE_AVATAR,
};

function Avatar(props) {
    if (!props.source) {
        return null;
    }

    const imageStyle = props.imageStyles ? [StyleUtils.getAvatarStyle(props.size), ...props.imageStyles, StyleUtils.getAvatarBorderRadius(props.size, props.type)] : undefined;

    return (
        <View
            pointerEvents="none"
            style={props.containerStyles}
        >
            <Wishlist.Image
                source={{uri: props.source}}
                style={imageStyle}
            />
        </View>
    );
}
Avatar.defaultProps = defaultProps;
Avatar.propTypes = propTypes;
export default Avatar;
