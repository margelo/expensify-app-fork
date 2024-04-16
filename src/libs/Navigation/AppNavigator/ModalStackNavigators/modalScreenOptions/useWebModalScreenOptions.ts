import type {StackNavigationOptions} from '@react-navigation/stack';
import {useMemo} from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import hideKeyboardOnSwipe from '@libs/Navigation/AppNavigator/hideKeyboardOnSwipe';
import subRouteOptions from '@libs/Navigation/AppNavigator/ModalStackNavigators/subRouteOptions/webSubRouteOptions';
import type {ThemeStyles} from '@src/styles';

function useWebModalScreenOptions(getScreenOptions?: (styles: ThemeStyles) => StackNavigationOptions) {
    const styles = useThemeStyles();

    const defaultSubRouteOptions = useMemo(
        (): StackNavigationOptions => ({
            ...subRouteOptions,
            ...hideKeyboardOnSwipe,
            cardStyle: styles.navigationScreenCardStyle,
        }),
        [styles],
    );

    return getScreenOptions?.(styles) ?? defaultSubRouteOptions;
}

export default useWebModalScreenOptions;
