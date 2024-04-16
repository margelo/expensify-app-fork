import type {ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import type PlatformStackNavigator from './types';

function createPlatformStackNavigator<TStackParams extends ParamListBase>(): PlatformStackNavigator<TStackParams> {
    return createStackNavigator();
}

export default createPlatformStackNavigator;
