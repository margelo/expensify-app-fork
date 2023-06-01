/* eslint-disable es/no-optional-chaining */
import React from 'react';
import {Wishlist, useTemplateValue} from 'react-native-wishlist';
import ReportActionImageContent from './ReportActionImageContent';
import Text from './Text';
import ReportActionHTMLContent from './ReportActionHTMLContent';

const propTypes = {};

const defaultProps = {};

const MessageTypeUtils = {
    isImage: (message) => {
        'worklet';

        return message.startsWith('<img');
    },
    isAttachment: (item) => {
        'worklet';

        return item.action.isAttachment;
    },
    isPureText: (item) => {
        'worklet';

        return item.action.message[0].isOnlyEmoji;
    },
};

function ReportActionContent() {
    const contentType = useTemplateValue((item) => {
        const html = item.action.message[0].html;
        if (MessageTypeUtils.isImage(html)) {
            return 'Image';
        }
        if (MessageTypeUtils.isAttachment(item)) {
            return 'Attachment';
        }
        if (MessageTypeUtils.isPureText(item)) {
            return 'PureText';
        }
        return 'HTML';
    });

    return (
        <Wishlist.Switch value={contentType}>
            <Wishlist.Case value="Image">
                <ReportActionImageContent />
            </Wishlist.Case>
            <Wishlist.Case value="Attachment">
                <Text> dummy attachment </Text>
            </Wishlist.Case>
            <Wishlist.Case value="PureText">
                <Text> dummy pure Text </Text>
            </Wishlist.Case>
            <Wishlist.Case value="HTML">
                <ReportActionHTMLContent />
            </Wishlist.Case>
        </Wishlist.Switch>
    );
}

ReportActionContent.propTypes = propTypes;
ReportActionContent.defaultProps = defaultProps;
ReportActionContent.displayName = 'ReportActionContent';

export default ReportActionContent;
