# `@legendapp/list` patches

### [@legendapp+list+3.3.5+001+scroll-view-component.patch](@legendapp+list+3.3.5+001+scroll-view-component.patch)

- Reason:

    `KeyboardAwareLegendList` uses `KeyboardChatScrollView`, which supports replacing its underlying Reanimated scroll view through `ScrollViewComponent`. However, `KeyboardAwareLegendList` omits that prop from its public type and does not forward it explicitly. Exposing and forwarding the prop allows consumers to customize the underlying scroll view without replacing the keyboard-aware scroll renderer.

- Upstream PR/issue: -
- E/App issue: -
- PR introducing patch: -

### [@legendapp+list+3.3.5+002+ios-native-content-inset.patch](@legendapp+list+3.3.5+002+ios-native-content-inset.patch)

- Reason:

    On iOS, `KeyboardChatScrollView` applies the keyboard inset directly to the native scroll view, and the native scroll event already reports `contentInset` together with `contentOffset`. Forwarding the asynchronous `onContentInsetChange` callback to `LegendList.reportContentInset()` creates a second, persistent inset source that can arrive after a newer native scroll event. During interactive keyboard dismissal this can make LegendList virtualize against a stale inset/offset pair, causing visible content to disappear or jump. Android still needs the callback because its synthetic keyboard inset is not included in the native scroll event.

- Upstream PR/issue: -
- E/App issue: -
- PR introducing patch: -
