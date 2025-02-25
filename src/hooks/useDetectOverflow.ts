import {useCallback, useRef, useState} from 'react';
import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

/**
 * Hook that helps detect if content is overflowing a scrollable container without using onLayout.
 * It uses the scroll event to determine if the content is larger than the container.
 *
 * @returns Object containing:
 *  - isOverflowing: boolean indicating if content overflows container
 *  - handleScroll: function to be passed to the onScroll prop of ScrollView/SectionList
 *  - hasScrolled: boolean indicating if the component has scrolled at least once
 */
function useDetectOverflow() {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const originalOnScrollRef = useRef<((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | null>(null);

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            // Extract relevant measurements from scroll event
            const {contentSize, layoutMeasurement} = event.nativeEvent;

            // Determine if content height exceeds container height
            const contentOverflows = contentSize.height > layoutMeasurement.height;

            // Always update the hasScrolled state
            if (!hasScrolled) {
                setHasScrolled(true);
            }

            // Always update the overflow state on first scroll
            if (!hasScrolled || contentOverflows !== isOverflowing) {
                setIsOverflowing(contentOverflows);
            }

            // Call the original onScroll handler if one was provided
            if (originalOnScrollRef.current) {
                originalOnScrollRef.current(event);
            }
        },
        [isOverflowing, hasScrolled],
    );

    /**
     * Set the original onScroll handler that was provided to the component
     * @param onScroll Original onScroll handler
     */
    const setOriginalOnScroll = useCallback((onScroll: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | null) => {
        originalOnScrollRef.current = onScroll;
    }, []);

    return {
        isOverflowing,
        hasScrolled,
        handleScroll,
        setOriginalOnScroll,
    };
}

export default useDetectOverflow;
