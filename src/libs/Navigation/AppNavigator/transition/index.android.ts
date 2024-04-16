import type {StackAnimationTypes} from 'react-native-screens';

// `slide_from_right` is resolved to `default` transition on iOS, but this transition causes issues on iOS
const transition: StackAnimationTypes = 'slide_from_right';

export default transition;
