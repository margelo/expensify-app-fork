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

};

const defaultProps = {
};

const MessageTypeUtils = {
    isImage: (message) => {
        'worklet'
        message.startsWith('<img')
    },
    isAttachment: (item) => {
        'worklet'
        return item.isAttachment
    },
    isPureText: (item) => {
        'worklet'
        return item.action.message[0].isOnlyEmoji
    }
};

const ReportActionImageContent = () => {
    
    const source = useTemplateValue((item) => {
        if (item.isAttachment) {
            console.log(`attachment: ${item.action.attachmentInfo}`)
        } else {
            return null
        }
        
        return item.action.attachmentInfo.source;
    });

    return (
        <Wishlist.Image source={{uri: source}} style={{width: 10, height: 10}} />
    );
};

ReportActionImageContent.propTypes = propTypes;
ReportActionImageContent.defaultProps = defaultProps;
ReportActionImageContent.displayName = 'ReportActionImageContent';

export default ReportActionImageContent;
