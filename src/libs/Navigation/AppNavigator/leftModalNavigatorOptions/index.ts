import type {StackNavigationOptions} from '@react-navigation/stack';

const leftModalNavigatorOptions: StackNavigationOptions = {
    presentation: 'transparentModal',
    gestureDirection: 'horizontal-inverted',
    animation: 'slide_from_left',
    customAnimationOnGesture: true,
};

export default leftModalNavigatorOptions;
