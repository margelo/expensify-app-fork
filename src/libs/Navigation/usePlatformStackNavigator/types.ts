// type WebNavigatorComponent<TStackParams extends ParamListBase> = ReturnType<typeof createNativeStackNavigator<TStackParams>>['Navigator'];
import type {ParamListBase} from '@react-navigation/native';
import type {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {createStackNavigator} from '@react-navigation/stack';

type CreateStackNavigatorResult<TStackParams extends ParamListBase> = ReturnType<typeof createStackNavigator<TStackParams>>;

type CreateNativeStackNavigatorResult<TStackParams extends ParamListBase> = ReturnType<typeof createNativeStackNavigator<TStackParams>>;

type PlatformStackNavigator<TStackParams extends ParamListBase> = {
    Navigator: CreateStackNavigatorResult<TStackParams>['Navigator'] | CreateNativeStackNavigatorResult<TStackParams>['Navigator'];
    Screen: CreateStackNavigatorResult<TStackParams>['Screen'] | CreateNativeStackNavigatorResult<TStackParams>['Screen'];
    Group: CreateStackNavigatorResult<TStackParams>['Group'] | CreateNativeStackNavigatorResult<TStackParams>['Group'];
};

export default PlatformStackNavigator;
