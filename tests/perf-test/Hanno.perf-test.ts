/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as NativeNavigation from '@react-navigation/native';
import Onyx from 'react-native-onyx';
import {measureFunction} from 'reassure';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import PersonalDetailsTrie from '@libs/PersonalDetailsTrie';
import SubstringTrie from '@libs/SubstringTrie';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {PersonalDetails} from '@src/types/onyx';
import waitForBatchedUpdates from '../utils/waitForBatchedUpdates';
import Actions from './actions.json';
import PersonalDetailsMap from './personaldetails.json';
import ReportsList from './reports.json';
import { SearchPersonalDetails } from '@src/types/onyx/SearchResults';
import GeneralizedSuffixTree from '@libs/GeneralizedSuffixTree';
import SuffixTree from '@libs/SuffixTree';
import SearchTrie from '@libs/SuffixTree/SearchTrie';

// Run with NODE_OPTIONS=--experimental-vm-modules npx reassure --testMatch "tests/perf-test/Hanno.perf-test.ts" --baseline

const SEARCH_VALUE = 'sasha';

const mockedBetas = Object.values(CONST.BETAS);

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual<typeof NativeNavigation>('@react-navigation/native');
    return {
        ...actualNav,
        createNavigationContainerRef: () => ({
            getState: () => jest.fn(),
        }),
    };
});

const reportActionsMap = {};
const reportsMap = ReportsList.reduce((acc, report) => {
    acc[`${ONYXKEYS.COLLECTION.REPORT}${report.reportID}`] = report;

    // // adding the actions isn't really working...
    // const random20Start = Math.floor(Math.random() * (Actions.length - 20));
    // const random20Actions = Actions.slice(random20Start, random20Start + 20);
    // reportActionsMap[`${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${report.reportID}`] = random20Actions.reduce((reportActions, action) => {
    //     reportActions[action.reportActionID] = action;
    //     return reportActions;
    // }, {});

    return acc;
}, {});

const options = OptionsListUtils.createOptionList(PersonalDetailsMap, reportsMap);
console.log('All reports length:', ReportsList.length);
console.log('PD Options length:', options.personalDetails.length);
console.log('Report Options length:', options.reports.length);

/* GetOption is the private function and is never called directly, we are testing the functions which call getOption with different params */
describe('OptionsListUtils', () => {
    beforeAll(() => {
        Onyx.init({
            keys: ONYXKEYS,
        });

        return Onyx.multiSet({
            ...reportsMap,
            [ONYXKEYS.PERSONAL_DETAILS_LIST]: PersonalDetailsMap,
            ...reportActionsMap,
        });
    });

    afterAll(() => {
        return Onyx.clear();
    });

    function generateSearchableString(personalDetails: PersonalDetails): string {
        const parts = [
            personalDetails.displayName ?? '',
            personalDetails.login ?? '',
            personalDetails.firstName ?? '',
            personalDetails.lastName ?? '',
            // TODO: other things such as abbreviations and replaced emails
        ];
        return parts.join('').toLowerCase();
    }

    function roughSizeOfObject(object: any) {
        const objectList = new Set<any>();
        const stack: any[] = [object];
        let bytes = 0;

        while (stack.length) {
            const value = stack.pop();

            if (value === null || value === undefined) {
                bytes += 4;
            } else if (typeof value === 'boolean') {
                bytes += 4;
            } else if (typeof value === 'string') {
                bytes += value.length * 2;
            } else if (typeof value === 'number') {
                bytes += 8;
            } else if (typeof value === 'object' && !objectList.has(value)) {
                objectList.add(value);
                bytes += 4; // Reference to the object

                if (Array.isArray(value)) {
                    stack.push(...value);
                } else if (value instanceof Set) {
                    bytes += 4; // Additional overhead for Set
                    stack.push(...Array.from(value.values()));
                } else if (value instanceof Map) {
                    bytes += 4; // Additional overhead for Map
                    value.forEach((mapValue, mapKey) => {
                        stack.push(mapKey);
                        stack.push(mapValue);
                    });
                } else {
                    // If it's a class instance, get its prototype properties too
                    let proto = Object.getPrototypeOf(value);
                    while (proto && proto !== Object.prototype) {
                        stack.push(...Object.getOwnPropertyNames(proto).map((key) => value[key]));
                        proto = Object.getPrototypeOf(proto);
                    }

                    // Push own properties
                    stack.push(...Object.values(value));
                }
            } else if (typeof value === 'function') {
                bytes += 8; // Rough estimate for function reference
            }
        }
        return bytes;
    }

    test('[OptionsListUtils] filterOptions with search value', async () => {
        await waitForBatchedUpdates();
        // const searchOptions = OptionsListUtils.getSearchOptions(options, '', mockedBetas);
        // console.log('PD search options', searchOptions.personalDetails.length);
        // console.log('Report search options', searchOptions.recentReports.length);
        // await measureFunction(() => OptionsListUtils.filterOptions(searchOptions, SEARCH_VALUE, {sortByReportTypeInSearch: true, betas: mockedBetas, preferChatroomsOverThreads: true}));
        // const start = performance.now();
        // options.personalDetails.forEach((pd) => {
        //     PersonalDetailsTrie.addPersonalDetail(pd.item);
        // });
        // const end = performance.now();
        // console.log('Time to add all personal details to trie:', end - start, 'ms');

        // Build substring trie
        // const trie = new SubstringTrie<OptionsListUtils.SearchOption<PersonalDetails>>();
        // const start2 = performance.now();
        // options.personalDetails.forEach((pd) => {
        //     trie.insert(generateSearchableString(pd.item), pd);
        // });
        // const end2 = performance.now();
        // console.log('Time to add all personal details to substring trie:', end2 - start2, 'ms');
        // const size = roughSizeOfObject(trie);
        // console.log('Size of substring trie:', size, 'bytes');
        // const resultTrie = trie.search(SEARCH_VALUE);
        // console.log('Substring trie search result:', resultTrie);

        // const gst = new GeneralizedSuffixTree<OptionsListUtils.SearchOption<PersonalDetails>>();
        // const start3 = performance.now();
        // options.personalDetails.forEach((pd) => {
        //     gst.insert(pd, [pd.item.displayName ?? '', pd.item.login ?? '', pd.item.firstName ?? '', pd.item.lastName ?? '']);
        // });
        // const end3 = performance.now();
        // console.log('Time to add all personal details to generalized suffix tree:', end3 - start3, 'ms');
        // const size3 = roughSizeOfObject(gst);
        // console.log('Size of generalized suffix tree:', size3, 'bytes');
        // const resultGST = gst.search(SEARCH_VALUE);
        // console.log('Generalized suffix tree search result:', resultGST);

        // await measureFunction(() => gst.search(SEARCH_VALUE));

        // const suffixTree = new SuffixTree();
        // suffixTree.addString("bananahanno$");
        // suffixTree.addString("hanno123$");
        // suffixTree.print();
        // const occurrences = suffixTree.findAllOccurrences("an");
        // console.log(occurrences);

        // Suffix test
        const start4 = performance.now();
        options.personalDetails.forEach((pd) => {
            SearchTrie.addPersonalDetail(pd);
        });
        const end4 = performance.now();
        console.log('Time to add all personal details to suffix tree:', end4 - start4, 'ms');
        // const size4 = roughSizeOfObject(SearchTrie);
        // console.log('Size of suffix tree:', size4, 'bytes');
        const result = SearchTrie.search(SEARCH_VALUE);
        console.log('Suffix tree search result:', result);
        console.log("Length", SearchTrie.getLength());

        await measureFunction(() => SearchTrie.search(SEARCH_VALUE));
    });
});
