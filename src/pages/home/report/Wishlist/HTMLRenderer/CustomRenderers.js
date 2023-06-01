import MentionHereRenderer from './MentionHereRenderer';
import MentionUserRenderer from './MentionUserRenderer';
import CodeRenderer from './CodeRenderer';

const CustomRenderers = {
    code: () => CodeRenderer,
    'mention-user': () => MentionUserRenderer,
    'mention-here': () => MentionHereRenderer,
};

export default CustomRenderers;
