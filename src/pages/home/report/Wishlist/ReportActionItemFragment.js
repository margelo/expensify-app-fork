import PropTypes from 'prop-types';
import React from 'react';
import {useTemplateValue} from 'react-native-wishlist';
import styles from '../../../../styles/styles';
import reportActionFragmentPropTypes from '../reportActionFragmentPropTypes';
import Text from './Text';

const propTypes = {
    /** The message fragment needing to be displayed */
    fragment: reportActionFragmentPropTypes.isRequired,

    // Additional styles to add after local styles
    style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
};

const defaultProps = {
    style: [],
};

const ReportActionItemFragment = ({fragment, style}) => {
    const text = useTemplateValue(() => fragment.value().text);
    const emojiTextStyle = useTemplateValue(() => (fragment.value().isOnlyEmoji ? styles.onlyEmojisText : undefined));
    return (
        <Text
            family="EMOJI_TEXT_FONT"
            selectable={false}
            style={[styles.ltr, ...style]}
        >
            {text}
        </Text>
    );
};

ReportActionItemFragment.propTypes = propTypes;
ReportActionItemFragment.defaultProps = defaultProps;
ReportActionItemFragment.displayName = 'ReportActionItemFragment';

export default ReportActionItemFragment;
