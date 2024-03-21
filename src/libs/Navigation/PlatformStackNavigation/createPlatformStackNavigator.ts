import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

const createPlatformStackNavigator: typeof createStackNavigator = () => createStackNavigator();

export default createPlatformStackNavigator;
