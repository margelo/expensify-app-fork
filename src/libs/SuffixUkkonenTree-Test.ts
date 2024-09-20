import {makeTree} from './SuffixUkkonenTree';
import {pd, rr} from './SuffixUkkonenTree-Data';

const tree = makeTree([
    {
        data: pd,
        transform: (option) => {
            // TODO: there are probably more fields we'd like to add to the search string
            return (option.login ?? '') + (option.login !== option.displayName ? option.displayName ?? '' : '');
        },
    },
    {
        data: rr,
        transform: (option) => {
            let searchStringForTree = (option.login ?? '') + (option.login !== option.displayName ? option.displayName ?? '' : '');
            searchStringForTree += option.reportID ?? '';
            searchStringForTree += option.name ?? '';

            return searchStringForTree;
        },
    },
]);
tree.build();
console.log(tree.findSubstring('taras'));
