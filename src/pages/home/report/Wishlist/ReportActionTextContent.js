/* eslint-disable es/no-optional-chaining */
import React from 'react';
import {Wishlist, useTemplateValue} from 'react-native-wishlist';

const propTypes = {};

const defaultProps = {};

function ReportActionTextContent() {
    const text = useTemplateValue((item) => item.action.message[0].text);

    return <Wishlist.Text>{text}</Wishlist.Text>;
}

ReportActionTextContent.propTypes = propTypes;
ReportActionTextContent.defaultProps = defaultProps;
ReportActionTextContent.displayName = 'ReportActionTextContent';

export default ReportActionTextContent;
