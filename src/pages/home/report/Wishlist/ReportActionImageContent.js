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


const ReportActionImageContent = () => {
    const source = useTemplateValue((item) => {
        if (item?.action?.message[0]?.html?.startsWith('<img')) {
            const html = item.action.message[0].html;
            const url = html.split(`"`)[1];
            console.log(`attachment: ${url}`);


            //TODO get token
            const authToken = lodashGet(props, 'session.encryptedAuthToken', null);
            const imageSource = {
                source: {uri: url},
                headers: authToken
                    ? {
                        [CONST.CHAT_ATTACHMENT_TOKEN_KEY]: authToken,
                    }
                    : null,
            };
            return imageSource;
        }
        return {uri: ''};
    });

    return (
        <View style={{borderWidth: 1, borderColor: 'green'}}>
            <Wishlist.Image source={source} style={{width: 100, height: 100}} />
            
        </View>
    );
};

ReportActionImageContent.propTypes = propTypes;
ReportActionImageContent.defaultProps = defaultProps;
ReportActionImageContent.displayName = 'ReportActionImageContent';

export default ReportActionImageContent;
