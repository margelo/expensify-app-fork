import type {ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useMemo} from 'react';
import useWebModalScreenOptions from '@libs/Navigation/AppNavigator/ModalStackNavigators/modalScreenOptions/useWebModalScreenOptions';
import type PlatformStackNavigator from './types';

function usePlatformStackNavigator<TStackParams extends ParamListBase>(): PlatformStackNavigator<TStackParams> {
    const WebStackNavigator = createStackNavigator<TStackParams>();
    const modalScreenOptions = useWebModalScreenOptions();

    const Navigator = useMemo<(typeof WebStackNavigator)['Navigator']>(
        () =>
            ({children, screenOptions, ...props}) =>
                (
                    <WebStackNavigator.Navigator
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...props}
                        screenOptions={{...modalScreenOptions, ...screenOptions}}
                    >
                        {children}
                    </WebStackNavigator.Navigator>
                ),
        [WebStackNavigator, modalScreenOptions],
    );

    return {
        ...WebStackNavigator,
        Navigator,
    };
}

export default usePlatformStackNavigator;
