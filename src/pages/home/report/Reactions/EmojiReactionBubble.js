import React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import _ from 'underscore';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';
import * as StyleUtils from '../../../../styles/StyleUtils';
import ReactionTooltip from './ReactionTooltip';
import emojis from '../../../../../assets/emojis';

const propTypes = {
    emojiName: PropTypes.string.isRequired,
    emojiCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    count: PropTypes.number,
    hasUserReacted: PropTypes.bool,
    senderIDs: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
    count: 0,
    onLongPress: () => {},
    hasUserReacted: false,
    senderIDs: [],
};

const EmojiReactionBubble = (props) => {
    const emoji = _.find(emojis, e => `${e.name}` === props.emojiName);
    if (!emoji) {
        return null;
    }

    const content = (
        <Pressable
            style={({hovered}) => [styles.emojiReactionBubble, StyleUtils.getEmojiReactionBubbleStyle(hovered, props.hasUserReacted)]}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <Text style={styles.emojiReactionText}>
                {props.emojiCodes.join('')}
                {' '}
            </Text>
            {props.count > 0 && (
            <Text style={[styles.reactionCounterText, StyleUtils.getEmojiReactionTextStyle(props.hasUserReacted)]}>
                {props.count}
            </Text>
            )}
        </Pressable>
    );

    if (props.senderIDs > 0) {
        return (
            <ReactionTooltip
                emojiCodes={props.emojiCodes}
                senderIDs={props.senderIDs}
                emojiName={props.emojiName}
            >
                {content}
            </ReactionTooltip>
        );
    }

    return content;
};

EmojiReactionBubble.propTypes = propTypes;
EmojiReactionBubble.defaultProps = defaultProps;
EmojiReactionBubble.displayName = 'EmojiReactionBubble';

export default EmojiReactionBubble;
