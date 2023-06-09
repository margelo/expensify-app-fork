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
import ReportActionImageContent from './ReportActionImageContent'

const propTypes = {

};

const defaultProps = {
};

const MessageTypeUtils = {
    isImage: (message) => {
        'worklet'
        return message.startsWith('<img');
    },
    isAttachment: (item) => {
        'worklet'
        return item.action.isAttachment;
    },
    isPureText: (item) => {
        'worklet'
        return item.action.message[0].isOnlyEmoji;
    }
};

const ReportActionContent = () => {
    
    const contentType = useTemplateValue((item) => {
        const html = item.action.message[0].html
        if (MessageTypeUtils.isImage(html)) {
            return 'Image';
        }
        if (MessageTypeUtils.isAttachment(item)) {
            return 'Attachment';
        }
        if (MessageTypeUtils.isPureText(item)) {
            return 'PureText';
        }
        return 'HTML'
    });

    return (
        <Wishlist.Switch value={contentType} > 
            <Wishlist.Case value="Image" >
                <ReportActionImageContent/>
            </Wishlist.Case>
            <Wishlist.Case value="Attachment" >
                <Text> dummy attachment </Text>
            </Wishlist.Case>
            <Wishlist.Case value="PureText" >
                <Text> dummy pure Text </Text>
            </Wishlist.Case>
            <Wishlist.Case value="HTML">
                <Text> dummy HTML </Text>
            </Wishlist.Case>
        </Wishlist.Switch>
    );
};

ReportActionContent.propTypes = propTypes;
ReportActionContent.defaultProps = defaultProps;
ReportActionContent.displayName = 'ReportActionContent';

export default ReportActionContent;
