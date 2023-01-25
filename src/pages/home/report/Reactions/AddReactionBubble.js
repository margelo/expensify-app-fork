import React from 'react';
import {Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import Tooltip from '../../../../components/Tooltip';
import styles from '../../../../styles/styles';
import * as StyleUtils from '../../../../styles/StyleUtils';
import Icon from '../../../../components/Icon';
import * as Expensicons from '../../../../components/Icon/Expensicons';
import Text from '../../../../components/Text';
import getButtonState from '../../../../libs/getButtonState';
import * as EmojiPickerAction from '../../../../libs/actions/EmojiPickerAction';

const propTypes = {
    onSelectEmoji: PropTypes.func.isRequired,
};

const AddReactionBubble = (props) => {
    const ref = React.createRef();

    const onPress = () => {
        EmojiPickerAction.showEmojiPicker(() => {}, props.onSelectEmoji, ref.current);
    };

    return (

        <Tooltip text="Add Reaction…">
            <Pressable
                ref={ref}
                style={({
                    hovered,
                    pressed,
                }) => [styles.emojiReactionBubble, StyleUtils.getEmojiReactionBubbleStyle(hovered || pressed, false)]}
                onPress={onPress}
            >
                {({
                    hovered,
                    pressed,
                }) => (
                    <>
                        {/* This text will make the view have the same size as a regular
            emoji reaction. We make the text invisible and put the
            icon on top of it. */}
                        <Text style={[styles.emojiReactionText, styles.opacity0]}>aw</Text>
                        <View style={styles.pAbsolute}>
                            <Icon
                                src={Expensicons.AddReaction}
                                width={16}
                                height={16}
                                fill={StyleUtils.getIconFillColor(
                                    getButtonState(hovered, pressed),
                                )}
                            />
                        </View>
                    </>
                )}
            </Pressable>

        </Tooltip>
    );
};

AddReactionBubble.propTypes = propTypes;
AddReactionBubble.displayName = 'AddReactionBubble';

export default AddReactionBubble;
