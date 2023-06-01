/* eslint-disable es/no-optional-chaining */
import React from 'react';
import {View} from 'react-native';
import {Wishlist, useTemplateValue} from 'react-native-wishlist';
import CONST from '../../../../CONST';

const propTypes = {};

const defaultProps = {};

function ReportActionImageContent() {
    const source = useTemplateValue((item) => {
        if (item?.action?.message[0]?.html?.startsWith('<img')) {
            const html = item.action.message[0].html;
            const url = html.split(`"`)[1];

            // TODO get token
            const authToken = ''; // props.session.encryptedAuthToken;
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
            <Wishlist.Image
                source={source}
                style={{width: 100, height: 100}}
            />
        </View>
    );
}

ReportActionImageContent.propTypes = propTypes;
ReportActionImageContent.defaultProps = defaultProps;
ReportActionImageContent.displayName = 'ReportActionImageContent';

export default ReportActionImageContent;
