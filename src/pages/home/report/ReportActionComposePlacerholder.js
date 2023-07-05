import React from 'react';
import {View} from 'react-native';
import Composer from '../../../components/Composer';
import styles from '../../../styles/styles';
import themeColors from '../../../styles/themes/default';
import withLocalize from '../../../components/withLocalize';
import EmojiPickerButton from '../../../components/EmojiPicker/EmojiPickerButton';
import Icon from '../../../components/Icon';
import * as Expensicons from '../../../components/Icon/Expensicons';

function ReportActionComposePlaceholder(props) {
    return (
        <View style={[styles.chatItemComposeBoxColor, styles.flexRow, styles.chatItemComposeBox]}>
            <View style={[styles.textInputComposeSpacing, styles.textInputComposeBorder]}>
                <Composer
                    multiline
                    textAlignVertical="top"
                    placeholder={props.translate('reportActionCompose.writeSomething')}
                    placeholderTextColor={themeColors.placeholderText}
                    style={[styles.textInputCompose, styles.flex4]}
                />
            </View>
            <EmojiPickerButton />
            <View style={[styles.justifyContentEnd]}>
                <View style={styles.chatItemSubmitButton}>
                    <Icon
                        src={Expensicons.Send}
                        fill={themeColors.icon}
                    />
                </View>
            </View>
        </View>
    );
}

export default withLocalize(ReportActionComposePlaceholder);
