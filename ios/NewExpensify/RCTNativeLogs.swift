@objc(NativeLogsModule)
class NativeLogsModule: NSObject, RCTBridgeModule {

  // Required method to indicate this is a RCTBridgeModule
  static func moduleName() -> String! {
    return "NativeLogsModule"
  }

  // Callback to be provided by JS
  private var logCallback: RCTResponseSenderBlock?

  // Method to register the callback from JS
  @objc func registerLogCallback(_ callback: @escaping RCTResponseSenderBlock) {
    logCallback = callback
  }

    // Method to register the callback from JS
  @objc func ungisterLogCallback() {
    logCallback = null
  }

  // Method to log a message
  @objc func logMessage(_ message: String) {
    // Log message on the native side
    NSLog(message)

    // Call the callback with the log message
    logCallback?(["someLogName", message, "someError"])
  }

  // Required method to indicate to React Native that this module requires the main queue setup
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
