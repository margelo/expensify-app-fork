import type {ReactNode} from 'react';
import React, {useMemo} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import useStyledSafeAreaInsets from '@hooks/useStyledSafeAreaInsets';
import useThemeStyles from '@hooks/useThemeStyles';

type FixedFooterProps = {
    /** Children to wrap in FixedFooter. */
    children: ReactNode;

    /** Styles to be assigned to Container */
    style?: StyleProp<ViewStyle>;

    /**
     * If enabled, the content will have a bottom padding equal to account for the safe bottom area inset.
     */
    addBottomSafeAreaPadding?: boolean;

    /**
     * Whether the footer should stick to the bottom of the screen.
     */
    shouldStickToBottom?: boolean;

    /**
     * Whether the footer should use small paddings.
     */
    shouldUseSmallPadding?: boolean;
};

function FixedFooter({style, children, addBottomSafeAreaPadding = false, shouldStickToBottom = false, shouldUseSmallPadding = false}: FixedFooterProps) {
    const styles = useThemeStyles();
    const {paddingBottom} = useStyledSafeAreaInsets(true);

    const paddingStyles = useMemo(
        () => (shouldUseSmallPadding ? {pb: styles.pb3, pt: styles.pt3, ph: styles.ph3} : {pb: styles.pb5, pt: styles.pt5, ph: styles.ph5}),
        [shouldUseSmallPadding, styles.pb3, styles.pb5, styles.ph3, styles.ph5, styles.pt3, styles.pt5],
    );

    const footerStyle = useMemo<StyleProp<ViewStyle>>(() => {
        const totalPaddingBottom = paddingStyles.pb.paddingBottom + paddingBottom;

        if (shouldStickToBottom) {
            return {position: 'absolute', left: 0, right: 0, bottom: totalPaddingBottom};
        }

        if (addBottomSafeAreaPadding) {
            return {paddingBottom: totalPaddingBottom};
        }

        return paddingStyles.pb;
    }, [addBottomSafeAreaPadding, paddingBottom, paddingStyles.pb, shouldStickToBottom]);

    if (!children) {
        return null;
    }

    return <View style={[paddingStyles.ph, paddingStyles.pt, styles.flexShrink0, footerStyle, style]}>{children}</View>;
}

FixedFooter.displayName = 'FixedFooter';

export default FixedFooter;
