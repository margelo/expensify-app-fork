/* eslint-disable rulesdir/prefer-underscore-method */
import {View} from 'react-native';
import {createTemplateComponent, renderTemplate} from 'react-native-wishlist';
import CustomRenderers from './CustomRenderers';

const HTMLRenderer = createTemplateComponent(View, {
    addProps: (item, props, inflatorId, pool, rootValue) => {
        'worklet';

        const createShadowTree = (node) => {
            if (CustomRenderers[node.type]) {
                return renderTemplate(node.type, node, rootValue, inflatorId, pool);
            }

            const sn = pool.createNode(node.type);
            if (!sn) {
                throw new Error(`Could not create node of type ${node.type}`);
            }

            if (node.props) {
                sn.addProps(node.props);
            }
            if (typeof node.children === 'string') {
                sn.RawText.addProps({text: node.children});
            } else {
                sn.setChildren(node.children.map(createShadowTree));
            }
            return sn;
        };

        const s = createShadowTree(props.html);
        item.setChildren([s]);
    },
});

export default HTMLRenderer;
