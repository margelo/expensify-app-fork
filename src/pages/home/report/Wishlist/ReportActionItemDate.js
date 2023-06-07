import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../../../styles/styles';
import Text from './Text';

const propTypes = {
    /** UTC timestamp for when the action was created */
    created: PropTypes.string.isRequired,
};

const ReportActionItemDate = (props) => <Text style={[styles.chatItemMessageHeaderTimestamp]}>{props.created}</Text>;

ReportActionItemDate.propTypes = propTypes;
ReportActionItemDate.displayName = 'ReportActionItemDate';

export default ReportActionItemDate;
