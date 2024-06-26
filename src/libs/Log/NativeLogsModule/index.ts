type NativeLogsCallback = (name: string, message: string, error: Error) => void;

type NativeLogsModule = {
    registerLogCallback: (callback: NativeLogsCallback) => void;
    unregisterLogCallback: (callback: NativeLogsCallback) => void;
};

export default NativeLogsModule;

export type {NativeLogsCallback};
