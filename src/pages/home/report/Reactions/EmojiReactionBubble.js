import React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';

const propTypes = {
    emojiCode: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
};

const EmojiReactionBubble = props => (
    <Pressable style={styles.emojiReactionBubble} onPress={props.onPress}>
        <Text>
            {props.emojiCode}
            {' '}
            {props.count}
        </Text>
    </Pressable>
);

EmojiReactionBubble.propTypes = propTypes;
EmojiReactionBubble.displayName = 'EmojiReactionBubble';

export default EmojiReactionBubble;
