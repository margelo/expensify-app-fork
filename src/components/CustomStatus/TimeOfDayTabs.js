import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from '../../styles/styles';
import themeColors from '../../styles/themes/default';

// TODO: i know this is a federal crime and i will move it to the styles
const localStyles = StyleSheet.create({
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 40,
        backgroundColor: themeColors.activeComponentBG,
    },
});

// TODO: add selected and hover state
function TimeOfDayTabs(props) {
    return (
        <View
            style={{
                flexDirection: 'row',
            }}
        >
            <View style={localStyles.tab}>
                <Text style={styles.textMicroBold}>AM</Text>
            </View>

            <View style={localStyles.tab}>
                <Text style={styles.textMicroBold}>PM</Text>
            </View>
        </View>
    );
}

TimeOfDayTabs.propTypes = {
    onChange: PropTypes.func.isRequired,
};
TimeOfDayTabs.defaultProps = {};
TimeOfDayTabs.displayName = 'TimeOfDayTabs';

export default TimeOfDayTabs;
