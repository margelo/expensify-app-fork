import type {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import useNativeModalScreenOptions from '@libs/Navigation/AppNavigator/ModalStackNavigators/modalScreenOptions/useNativeModalScreenOptions';
import type PlatformStackNavigator from './types';

function usePlatformStackNavigator<TStackParams extends ParamListBase>(): PlatformStackNavigator<TStackParams> {
    const NativeStackNavigator = createNativeStackNavigator<TStackParams>();
    const modalScreenOptions = useNativeModalScreenOptions();

    const Navigator = useMemo<(typeof NativeStackNavigator)['Navigator']>(
        () =>
            ({children, screenOptions, ...props}) =>
                (
                    <NativeStackNavigator.Navigator
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...props}
                        screenOptions={{...modalScreenOptions, ...screenOptions}}
                    >
                        {children}
                    </NativeStackNavigator.Navigator>
                ),
        [NativeStackNavigator, modalScreenOptions],
    );

    return {
        ...NativeStackNavigator,
        Navigator,
    };
}

export default usePlatformStackNavigator;
