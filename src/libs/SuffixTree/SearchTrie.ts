import type {SearchOption} from '@libs/OptionsListUtils';
import type * as ReportUtils from '@libs/ReportUtils';
import type {PersonalDetails} from '@src/types/onyx';
import SuffixTree from './SuffixTree2';

const replaceAllSpecialChars = /[^a-zA-Z0-9_\u0080-\uFFFF]/g;
class SearchTrie {
    private suffixTrie = new SuffixTree();

    private personalDetails: Array<SearchOption<PersonalDetails>> = [];

    addPersonalDetail(personalDetail: SearchOption<PersonalDetails>) {
        const searchableString = this.getPersonalDetailSearchTerms(personalDetail);
        if (searchableString.length <= 1) {
            return;
        }

        for (let i = 0; i < searchableString.length + 1; ++i) {
            this.personalDetails.push(personalDetail);
        }
        this.suffixTrie.addString(searchableString);
    }

    getPersonalDetailSearchTerms(item: Partial<ReportUtils.OptionData>): string {
        const login = item.login ?? '';
        const res: string[] = [];
        const cleanedLogin = login.replace(replaceAllSpecialChars, '').toLowerCase();
        if (cleanedLogin) {
            res.push(cleanedLogin);
        }
        const displayName = item.participantsList?.[0]?.displayName ?? '';
        if (displayName) {
            const cleanedDisplayName = displayName.replace(replaceAllSpecialChars, '').toLowerCase();
            // Hm, this makes the insertion more intense (includes), but keeps the trie smaller
            // Note: the length compare is dangerous as it would match "christian" == "chr@ma.de"
            if (cleanedDisplayName.length === cleanedLogin.length || cleanedLogin.includes(cleanedDisplayName)) {
                // console.log('This case worked!');
            } else {
                res.push(cleanedDisplayName);
            }
        }

        if (res.length === 0) {
            return '';
        }
        return `${res.join('')}$`;
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

    // getLength(): number {
    //     return this.suffixTrie.text.length;
    // }

    toString(): string {
        return this.suffixTrie.text;
    }
}

export default new SearchTrie();
