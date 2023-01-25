import React from 'react';
import {Pressable, View} from 'react-native';
import Tooltip from '../../../../components/Tooltip';
import styles from '../../../../styles/styles';
import * as StyleUtils from '../../../../styles/StyleUtils';
import Icon from '../../../../components/Icon';
import * as Expensicons from '../../../../components/Icon/Expensicons';
import Text from '../../../../components/Text';
import getButtonState from '../../../../libs/getButtonState';

const AddReactionBubble = () => (

    <Tooltip text="Add Reaction…">
        <Pressable
            style={({
                hovered,
                pressed,
            }) => [styles.emojiReactionBubble, StyleUtils.getEmojiReactionBubbleStyle(hovered || pressed, false)]}
            onPress={() => {
            }}
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

AddReactionBubble.displayName = 'AddReactionBubble';

export default AddReactionBubble;
