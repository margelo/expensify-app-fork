import type {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type PlatformStackNavigator from './types';

function createPlatformStackNavigator<TStackParams extends ParamListBase>(): PlatformStackNavigator<TStackParams> {
    return createNativeStackNavigator();
}

export default createPlatformStackNavigator;
