import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import hideKeyboardOnSwipe from '@libs/Navigation/AppNavigator/hideKeyboardOnSwipe';
import subRouteOptions from '@libs/Navigation/AppNavigator/ModalStackNavigators/subRouteOptions/nativeSubRouteOptions';
import type {ThemeStyles} from '@src/styles';

function useNativeModalScreenOptions(getScreenOptions?: (styles: ThemeStyles) => NativeStackNavigationOptions) {
    const styles = useThemeStyles();

    const defaultSubRouteOptions = useMemo(
        (): NativeStackNavigationOptions => ({
            ...subRouteOptions,
            ...hideKeyboardOnSwipe,
        }),
        [],
    );

    return getScreenOptions?.(styles) ?? defaultSubRouteOptions;
}

export default useNativeModalScreenOptions;
