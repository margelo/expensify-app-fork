import type * as NativeNavigation from '@react-navigation/native';
import Onyx from 'react-native-onyx';
import {measureFunction} from 'reassure';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import waitForBatchedUpdates from '../utils/waitForBatchedUpdates';
import Actions from './actions.json';
import PersonalDetailsMap from './personaldetails.json';
import ReportsList from './reports.json';

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

    // adding the actions isn't really working...
    const random20Start = Math.floor(Math.random() * (Actions.length - 20));
    const random20Actions = Actions.slice(random20Start, random20Start + 20);
    reportActionsMap[`${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${report.reportID}`] = random20Actions.reduce((reportActions, action) => {
        reportActions[action.reportActionID] = action;
        return reportActions;
    }, {});

    return acc;
}, {});

const options = OptionsListUtils.createOptionList(PersonalDetailsMap, reportsMap); // is this code needed?
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

    test('[OptionsListUtils] filterOptions with search value', async () => {
        await waitForBatchedUpdates();
        const searchOptions = OptionsListUtils.getSearchOptions(options, '', mockedBetas);
        console.log('PD search options', searchOptions.personalDetails.length);
        console.log('Report search options', searchOptions.recentReports.length);
        await measureFunction(() => OptionsListUtils.filterOptions(searchOptions, SEARCH_VALUE, {sortByReportTypeInSearch: true, betas: mockedBetas, preferChatroomsOverThreads: true}));
    });
});
