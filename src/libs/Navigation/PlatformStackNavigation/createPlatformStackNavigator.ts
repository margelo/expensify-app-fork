import {createNativeStackNavigator} from '@react-navigation/native-stack';

const createPlatformStackNavigator: typeof createStackNavigator = () => createNativeStackNavigator();

export default createPlatformStackNavigator;
