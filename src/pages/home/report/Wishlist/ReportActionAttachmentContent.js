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


const ReportActionAttachmentContent = () => {

    const text = useTemplateValue((item) => {
        return `It's an attachment - uri: ${item.attachmentInfo.source ?? 'nope'}`
    })

    return (
        <Wishlist.Text> {text}  </Wishlist.Text>
    );
};

ReportActionAttachmentContent.propTypes = propTypes;
ReportActionAttachmentContent.defaultProps = defaultProps;
ReportActionAttachmentContent.displayName = 'ReportActionAttachmentContent';

export default ReportActionAttachmentContent;
