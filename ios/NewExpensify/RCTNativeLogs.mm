// CalendarModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeLogsModule, NSObject)

RCT_EXPORT_METHOD(registerLogCallback:(RCTResponseSenderBlock)callback)
RCT_EXPORT_METHOD(unregisterLogCallback)

@end
