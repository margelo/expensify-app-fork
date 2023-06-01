### Setup

Currently you must have access to the [react-native-wishlist](https://github.com/margelo/react-native-wishlist) repo and clone it in the same directory as Expensify-App. Also make sure to run `npm install` and `pod install`.

### Implementation

The Wishlist implementation of ReportActionsList is located in `src/pages/home/report/Wishlist`. The main file is `ReportActionsList.js`. Data is processed in `mapReportAction` and then passed to the template component for the different message types. Message types are implemented as different `Wishlist.Template` components. If the message type is not currently implemented it will be rendered as `ReportActionItemUnimplemented`.

### TODO

- Implement more message types
- Fix some layout inconsistencies in html renderer
- Web implementation
- Sync implementation with latest main
