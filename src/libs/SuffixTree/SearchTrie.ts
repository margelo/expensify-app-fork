import type {SearchOption} from '@libs/OptionsListUtils';
import type * as ReportUtils from '@libs/ReportUtils';
import CONST from '@src/CONST';
import type {PersonalDetails} from '@src/types/onyx';
import SuffixTree from '.';

class SearchTrie {
    private suffixTrie = new SuffixTree();

    private personalDetails: Array<SearchOption<PersonalDetails>> = [];

    addPersonalDetail(personalDetail: SearchOption<PersonalDetails>) {
        const searchableString = this.getPersonalDetailSearchTerms(personalDetail);
        for (let i = 0; i < searchableString.length + 1; ++i) {
            this.personalDetails.push(personalDetail);
        }
        this.suffixTrie.addString(searchableString);
    }

    getPersonalDetailSearchTerms(item: Partial<ReportUtils.OptionData>): string {
        return `${[item.participantsList?.[0]?.displayName ?? '', item.login ?? '', item.login?.replace(CONST.EMAIL_SEARCH_REGEX, '') ?? ''].join('')}$`;
    }

    search(search: string): Array<SearchOption<PersonalDetails>> {
        const matches = this.suffixTrie.findAllOccurrences(search);
        const weakSet = new WeakSet<SearchOption<PersonalDetails>>();
        const results: Array<SearchOption<PersonalDetails>> = [];
        matches.forEach((match) => {
            if (weakSet.has(this.personalDetails[match])) {
                return;
            }
            results.push(this.personalDetails[match]);
            weakSet.add(this.personalDetails[match]);
        });
        return results;
    }

    getLength(): number {
        return this.suffixTrie.text.length;
    }
}

export default new SearchTrie();
