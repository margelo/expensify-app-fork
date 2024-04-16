import type {StackNavigationOptions} from '@react-navigation/stack';

const hideKeyboardOnSwipe = {
    // temporary solution - better to hide a keyboard than see keyboard flickering
    // see https://github.com/software-mansion/react-native-screens/issues/2021 for more details
    keyboardHandlingEnabled: true,
} satisfies StackNavigationOptions;

export default hideKeyboardOnSwipe;
