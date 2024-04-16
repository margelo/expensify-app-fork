import type {StackAnimationTypes} from 'react-native-screens';

// default transition is causing weird keyboard appearance: - https://github.com/Expensify/App/issues/37257
// so we are using `simple_push` which is similar to default and not causing keyboard transition issues
const transition: StackAnimationTypes = 'simple_push';

export default transition;
