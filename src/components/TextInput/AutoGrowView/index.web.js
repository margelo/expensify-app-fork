import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text';
import styles from '../../../styles/styles';

/**
 * Text input component doesn't support auto grow by default on the web
 * We're using a hidden text input to achieve that.
 * This text view is used to calculate width or height of the input value given textStyle in this component.
 * This Text component is intentionally positioned out of the screen.
 * @param {Object} props - props passed from above
 * @returns {React.Component}
 */
function AutoGrowView(props) {
    return (
        // Add +2 to width so that the first digit of amount do not cut off on mWeb - https://github.com/Expensify/App/issues/8158.
        <Text
            style={[...props.inputStyle, styles.hiddenElementOutsideOfWindow, styles.visibilityHidden]}
            onLayout={(e) => {
                // setTextInputWidth(e.nativeEvent.layout.width + 2);
                // setTextInputHeight(e.nativeEvent.layout.height);
            }}
        >
            {props.text}
        </Text>
    );
}

AutoGrowView.displayName = 'AutoGrowView';
AutoGrowView.propTypes = {
    text: PropTypes.string.isRequired,
    inputStyle: PropTypes.arrayOf(PropTypes.shape({})),
};
AutoGrowView.defaultProps = {
    inputStyle: [],
};

export default AutoGrowView;
