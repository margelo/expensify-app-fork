/* eslint-disable es/no-optional-chaining, rulesdir/prefer-underscore-method */
import CustomRenderers from './CustomRenderers';

function createNativeComponentsTree(tnode, isNestedText) {
    const hasCustomRenderer = Boolean(CustomRenderers[tnode.tagName]);
    switch (tnode.type) {
        case 'document':
            return createNativeComponentsTree(tnode.children[0], false);
        case 'text':
        case 'phrasing': {
            const props = {...tnode.getReactNativeProps()?.text, ...tnode.getNativeStyles()};
            const defaultType = isNestedText ? 'Text' : 'Paragraph';
            const type = hasCustomRenderer ? tnode.tagName : defaultType;

            if (tnode.type === 'phrasing') {
                return {
                    type,
                    props,
                    children: tnode.children.map((c) => createNativeComponentsTree(c, true)),
                };
            }

            const children = tnode.tagName === 'br' ? '\n' : tnode.data;
            return {
                type,
                props,
                children,
            };
        }
        case 'block':
        default: {
            const props = {...tnode.getReactNativeProps()?.view, ...tnode.getNativeStyles()};
            const type = hasCustomRenderer ? tnode.tagName : 'View';

            return {
                type,
                props,
                children: tnode.children.map((c) => createNativeComponentsTree(c, false)),
            };
        }
    }
}

export default function parseHtml(renderEngine, html) {
    return createNativeComponentsTree(renderEngine.buildTTree(html), false);
}
