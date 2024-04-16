import type {StackNavigationOptions} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

const subRouteOptions: StackNavigationOptions = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default subRouteOptions;
