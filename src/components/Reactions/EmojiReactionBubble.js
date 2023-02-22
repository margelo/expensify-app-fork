import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import styles from '../../styles/styles';
import Text from '../Text';
import * as StyleUtils from '../../styles/StyleUtils';
import withCurrentUserPersonalDetails, {
    withCurrentUserPersonalDetailsDefaultProps,
    withCurrentUserPersonalDetailsPropTypes,
} from '../withCurrentUserPersonalDetails';
import PressableWithSecondaryInteraction from '../PressableWithSecondaryInteraction';

const propTypes = {
    /**
     * The emoji codes to display in the bubble.
     */
    emojiCodes: PropTypes.arrayOf(PropTypes.string).isRequired,

    /**
     * Called when the user presses on the reaction bubble.
     */
    onPress: PropTypes.func.isRequired,

    /**
     * Called when the user long presses or right clicks
     * on the reaction bubble.
     */
    onReactionListOpen: PropTypes.func,

    /**
     * The number of reactions to display in the bubble.
     */
    count: PropTypes.number,

    /**
     * The account ids of the users who reacted.
     */
    reactionUsers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

    /**
     * The default size of the reaction bubble is defined
     * by the styles in styles.js. This scale factor can be used
     * to make the bubble bigger or smaller.
     */
    sizeScale: PropTypes.number,

    ...withCurrentUserPersonalDetailsPropTypes,
};

const defaultProps = {
    count: 0,
    onReactionListOpen: () => {},
    reactionUsers: [],
    sizeScale: 1,

    ...withCurrentUserPersonalDetailsDefaultProps,
};

const EmojiReactionBubble = (props) => {
    const hasUserReacted = _.find(props.reactionUsers, accountID => `${accountID}` === `${props.currentUserPersonalDetails.accountID}`) != null;
    return (
        <PressableWithSecondaryInteraction
            ref={props.forwardedRef}
            style={({hovered}) => [
                styles.emojiReactionBubble,
                StyleUtils.getEmojiReactionBubbleStyle(hovered, hasUserReacted, props.sizeScale),
            ]}
            onPress={props.onPress}
            onSecondaryInteraction={props.onReactionListOpen}
        >
            <Text style={[
                styles.emojiReactionText,
                StyleUtils.getEmojiReactionTextStyle(props.sizeScale),
            ]}
            >
                {props.emojiCodes.join('')}
            </Text>
            {props.count > 0 && (
                <Text style={[
                    styles.reactionCounterText,
                    StyleUtils.getEmojiReactionCounterTextStyle(hasUserReacted, props.sizeScale),
                ]}
                >
                    {props.count}
                </Text>
            )}
        </PressableWithSecondaryInteraction>
    );
};

EmojiReactionBubble.propTypes = propTypes;
EmojiReactionBubble.defaultProps = defaultProps;
EmojiReactionBubble.displayName = 'EmojiReactionBubble';

export default withCurrentUserPersonalDetails(forwardRef((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <EmojiReactionBubble {...props} forwardedRef={ref} />
)));
