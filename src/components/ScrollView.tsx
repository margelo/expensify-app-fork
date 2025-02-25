import React, {useEffect} from 'react';
import type {ForwardedRef} from 'react';
// eslint-disable-next-line no-restricted-imports
import {ScrollView as RNScrollView} from 'react-native';
import type {ScrollViewProps as RNScrollViewProps} from 'react-native';
import useBottomSafeSafeAreaPaddingStyle from '@hooks/useBottomSafeSafeAreaPaddingStyle';
import useDetectOverflow from '@hooks/useDetectOverflow';

type ScrollViewProps = RNScrollViewProps & {
    /**
     * If enabled, the content will have a bottom padding equal to account for the safe bottom area inset.
     */
    addBottomSafeAreaPadding?: boolean;

    /**
     * Optional callback that will be called with a boolean indicating if content is overflowing
     */
    onOverflowChange?: (isOverflowing: boolean) => void;
};

function ScrollView(
    {children, scrollIndicatorInsets, contentContainerStyle: contentContainerStyleProp, addBottomSafeAreaPadding = false, onScroll, onOverflowChange, ...props}: ScrollViewProps,
    ref: ForwardedRef<RNScrollView>,
) {
    const contentContainerStyle = useBottomSafeSafeAreaPaddingStyle({addBottomSafeAreaPadding, style: contentContainerStyleProp});
    const {isOverflowing, handleScroll, setOriginalOnScroll} = useDetectOverflow();

    // Set the original onScroll handler
    useEffect(() => {
        setOriginalOnScroll(onScroll ?? null);
    }, [onScroll, setOriginalOnScroll]);

    // Call onOverflowChange when isOverflowing changes
    useEffect(() => {
        onOverflowChange?.(isOverflowing);
    }, [isOverflowing, onOverflowChange]);

    return (
        <RNScrollView
            ref={ref}
            // on iOS, navigation animation sometimes cause the scrollbar to appear
            // on middle/left side of scrollview. scrollIndicatorInsets with right
            // to closest value to 0 fixes this issue, 0 (default) doesn't work
            // See: https://github.com/Expensify/App/issues/31441
            contentContainerStyle={contentContainerStyle}
            scrollIndicatorInsets={scrollIndicatorInsets ?? {right: Number.MIN_VALUE}}
            onScroll={handleScroll}
            // We need to detect overflow on the first render, so we need at least
            // one scroll event even if the user hasn't scrolled
            scrollEventThrottle={16}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {children}
        </RNScrollView>
    );
}

ScrollView.displayName = 'ScrollView';

export type {ScrollViewProps};

export default React.forwardRef(ScrollView);
