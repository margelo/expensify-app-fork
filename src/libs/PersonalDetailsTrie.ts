import type {PersonalDetails} from '@src/types/onyx';
import Trie from './Trie';

class PersonalDetailsTrie extends Trie<PersonalDetails> {
    private static generateSearchableString(personalDetails: PersonalDetails): string {
        const parts = [
            personalDetails.displayName ?? '',
            personalDetails.login ?? '',
            personalDetails.firstName ?? '',
            personalDetails.lastName ?? '',
            // TODO: other things such as abbreviations and replaced emails
        ];
        return parts.join('').toLowerCase();
    }

    addPersonalDetail(personalDetails: PersonalDetails): void {
        const searchableString = PersonalDetailsTrie.generateSearchableString(personalDetails);
        if (!searchableString) {
            return;
        }
        super.add(searchableString, personalDetails);
    }

    searchPersonalDetails(query: string): PersonalDetails[] {
        const matches = this.getAllMatchingWords(query.toLowerCase());
        return matches.map((match) => match.metaData as PersonalDetails);
    }
}

export default new PersonalDetailsTrie();
