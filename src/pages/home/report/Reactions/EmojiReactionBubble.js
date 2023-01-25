import React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';
import * as StyleUtils from '../../../../styles/StyleUtils';
import ReactionTooltip from './ReactionTooltip';

const propTypes = {
    emojiCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
    count: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func.isRequired,
    hasUserReacted: PropTypes.bool.isRequired,
    senderIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    emojiName: PropTypes.string.isRequired,
};

const EmojiReactionBubble = props => (
    <ReactionTooltip
        emojiCodes={props.emojiCodes}
        senderIDs={props.senderIDs}
        emojiName={props.emojiName}
    >
        <Pressable
            style={({hovered}) => [styles.emojiReactionBubble, StyleUtils.getEmojiReactionBubbleStyle(hovered, props.hasUserReacted)]}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <Text style={styles.emojiReactionText}>
                {props.emojiCodes.join('')}
                {' '}
            </Text>
            <Text style={[styles.reactionCounterText, StyleUtils.getEmojiReactionTextStyle(props.hasUserReacted)]}>
                {props.count}
            </Text>
        </Pressable>
    </ReactionTooltip>
);

EmojiReactionBubble.propTypes = propTypes;
EmojiReactionBubble.displayName = 'EmojiReactionBubble';

export default EmojiReactionBubble;
