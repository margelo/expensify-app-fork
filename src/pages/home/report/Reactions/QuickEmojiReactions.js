import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import EmojiReactionBubble from './EmojiReactionBubble';
import AddReactionBubble from './AddReactionBubble';

const DEFAULT_COMMON_EMOJIS = [
    {
        name: '+1',
        code: '👍',
        types: [
            '👍🏿',
            '👍🏾',
            '👍🏽',
            '👍🏼',
            '👍🏻',
        ],
    },
    {code: '🔥', name: 'fire'},
    {code: '😂', name: 'joy'},
    {code: '❤️', name: 'heart'},
];

const propTypes = {
    /** Stores user's preferred skin tone */
    preferredSkinTone: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** User's frequently used emojis */
    frequentlyUsedEmojis: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        keywords: PropTypes.arrayOf(PropTypes.string),
        types: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,

    onSelectedEmoji: PropTypes.func.isRequired,
};

const defaultProps = {
    preferredSkinTone: undefined,
};

const QuickEmojiReactions = (props) => {
    const quickReactionEmojis = _.map(Array(4).fill(null), (__, index) => props.frequentlyUsedEmojis[index] || DEFAULT_COMMON_EMOJIS[index]);

    return (
        <View style={styles.quickEmojiReactions}>
            {_.map(quickReactionEmojis, emoji => (
                <EmojiReactionBubble
                    key={emoji.name}
                    emojiName={emoji.name}
                    emojiCodes={[emoji.types[props.preferredSkinTone] || emoji.code]}
                    onPress={() => props.onSelectedEmoji(emoji)}
                />
            ))}
            <AddReactionBubble onSelectEmoji={props.onSelectedEmoji} />
        </View>
    );
};

QuickEmojiReactions.displayName = 'QuickEmojiReactions';
QuickEmojiReactions.propTypes = propTypes;
QuickEmojiReactions.defaultProps = defaultProps;
export default withOnyx({
    preferredSkinTone: {
        key: ONYXKEYS.PREFERRED_EMOJI_SKIN_TONE,
    },
    frequentlyUsedEmojis: {
        key: ONYXKEYS.FREQUENTLY_USED_EMOJIS,
    },
})(QuickEmojiReactions);
