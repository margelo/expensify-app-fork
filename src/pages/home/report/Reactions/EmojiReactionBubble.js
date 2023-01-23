import React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';
import * as StyleUtils from '../../../../styles/StyleUtils';

const propTypes = {
    emojiCode: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    hasUserReacted: PropTypes.bool.isRequired,
};

const EmojiReactionBubble = props => (
    <Pressable
        style={({hovered}) => [styles.emojiReactionBubble, StyleUtils.getEmojiReactionBubbleStyle(hovered, props.hasUserReacted)]}
        onPress={props.onPress}
    >
        <Text style={styles.emojiReactionText}>
            {props.emojiCode}
            {' '}
        </Text>
        <Text style={[styles.reactionCounterText, StyleUtils.getEmojiReactionTextStyle(props.hasUserReacted)]}>
            {props.count}
        </Text>
    </Pressable>
);

EmojiReactionBubble.propTypes = propTypes;
EmojiReactionBubble.displayName = 'EmojiReactionBubble';

export default EmojiReactionBubble;
