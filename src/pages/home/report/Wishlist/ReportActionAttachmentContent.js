import React from 'react';
import {Wishlist, useTemplateValue} from 'react-native-wishlist';

const propTypes = {};

const defaultProps = {};

function ReportActionAttachmentContent() {
    const text = useTemplateValue((item) => `It's an attachment - uri: ${item.attachmentInfo.source || 'nope'}`);

    return <Wishlist.Text>{text}</Wishlist.Text>;
}

ReportActionAttachmentContent.propTypes = propTypes;
ReportActionAttachmentContent.defaultProps = defaultProps;
ReportActionAttachmentContent.displayName = 'ReportActionAttachmentContent';

export default ReportActionAttachmentContent;
