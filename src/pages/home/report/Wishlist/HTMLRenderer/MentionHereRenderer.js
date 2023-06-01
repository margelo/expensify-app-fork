import React from 'react';
import {useTemplateValue} from 'react-native-wishlist';
import * as StyleUtils from '../../../../../styles/StyleUtils';
import Text from '../Text';

// Have to extract individual functions since they are used in a worklet.
const {getMentionStyle, getMentionTextColor} = StyleUtils;

const MentionHereRenderer = () => {
    const text = useTemplateValue((item) => item.children);

    const style = useTemplateValue((item) => ({
        ...item.props,
        ...getMentionStyle(true),
        color: getMentionTextColor(true),
    }));

    return <Text style={style}>{text}</Text>;
};

MentionHereRenderer.displayName = 'MentionHereRenderer';

export default MentionHereRenderer;
