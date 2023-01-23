import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';

const propTypes = {
    emojiCode: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

const EmojiReactionBubble = props => (
    <View style={styles.emojiReactionBubble}>
        <Text>
            {props.emojiCode}
            {' '}
            {props.count}
        </Text>
    </View>
);

EmojiReactionBubble.propTypes = propTypes;
EmojiReactionBubble.displayName = 'EmojiReactionBubble';

export default EmojiReactionBubble;
