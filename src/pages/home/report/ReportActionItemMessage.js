import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import styles from '../../../styles/styles';
import ReportActionItemFragment from './ReportActionItemFragment';
import reportActionPropTypes from './reportActionPropTypes';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';

const propTypes = {
    /** The report action */
    action: PropTypes.shape(reportActionPropTypes).isRequired,

    /** Additional styles to add after local styles. */
    style: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]),

    /** localization props */
    ...withLocalizePropTypes,
};

const defaultProps = {
    style: [],
};

function ReportActionItemMessage() {
    const message = useTemplateValue(action => action.previousMessage || action.message);

    return (
        <View style={[styles.chatItemMessage]}>

            <Wishlist.Template type="report-action-item-fragment">
                <ReportActionItemFragment />
            </Wishlist.Template>

            <Wishlist.ForEach items={message} template="report-action-item-fragment" />
        </View>
    );
}

ReportActionItemMessage.propTypes = propTypes;
ReportActionItemMessage.defaultProps = defaultProps;
ReportActionItemMessage.displayName = 'ReportActionItemMessage';

export default withLocalize(ReportActionItemMessage);
