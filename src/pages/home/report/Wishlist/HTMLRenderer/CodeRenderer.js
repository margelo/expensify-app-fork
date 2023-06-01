import React from 'react';
import {useTemplateValue} from 'react-native-wishlist';
import * as StyleUtils from '../../../../../styles/StyleUtils';
import Text from '../Text';

const {getFontFamilyMonospace} = StyleUtils;

const CodeRenderer = () => {
    const text = useTemplateValue((item) => item.children);

    const style = useTemplateValue((item) => {
        // Get the correct fontFamily variant based in the fontStyle and fontWeight
        const font = getFontFamilyMonospace({
            fontStyle: item.props.fontStyle,
            fontWeight: item.props.fontWeight,
        });

        const textStyleOverride = {
            fontFamily: font,

            // We need to override this properties bellow that was defined in `textStyle`
            // Because by default the `react-native-render-html` add a style in the elements,
            // for example the <strong> tag has a fontWeight: "bold" and in the android it break the font
            fontWeight: null,
            fontStyle: null,
        };
        return {
            ...item.props,
            ...textStyleOverride,
        };
    });

    return <Text style={style}>{text}</Text>;
};

CodeRenderer.displayName = 'CodeRenderer';

export default CodeRenderer;
