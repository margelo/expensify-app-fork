import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

type NativeLogsCallback = (type: string, message: string, error: Error) => void;

type Spec = {
    registerLogCallback: (callback: NativeLogsCallback) => void;
    unregisterLogCallback: () => void;
} & TurboModule;

export default TurboModuleRegistry.getEnforcing<Spec>('RTNNativeLogs');

export type {Spec};
