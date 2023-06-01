import React from 'react';
import {useTemplateValue} from 'react-native-wishlist';
import HTMLRenderer from './HTMLRenderer';

const propTypes = {};

const defaultProps = {};

function ReportActionHTMLContent() {
    const html = useTemplateValue((item) => item.action.message[0].htmlTree);

    return <HTMLRenderer html={html} />;
}

ReportActionHTMLContent.propTypes = propTypes;
ReportActionHTMLContent.defaultProps = defaultProps;
ReportActionHTMLContent.displayName = 'ReportActionHTMLContent';

export default ReportActionHTMLContent;
