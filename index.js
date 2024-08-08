/**
 * @format
 */
import React, {useEffect} from 'react';
import {AppRegistry, Button, Text, View} from 'react-native';
import App from './src/App';
import Config from './src/CONFIG';
import CONST from './src/CONST';
import BootSplash from './src/libs/BootSplash';
import GeneralizedSuffixTree from './src/libs/GeneralizedSuffixTree';
import * as OptionsListUtils from './src/libs/OptionsListUtils';
import SubstringTrie from './src/libs/SubstringTrie';
import ONYXKEYS from './src/ONYXKEYS';
import additionalAppSetup from './src/setup';
import PersonalDetailsMap from './tests/perf-test/personaldetails.json';
import ReportsList from './tests/perf-test/reports.json';

const SEARCH_VALUE = 'sasha';
const reportActionsMap = {};
const mockedBetas = Object.values(CONST.BETAS);
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
const searchOptions = OptionsListUtils.getSearchOptions(options, '', mockedBetas);
console.log('PD search options', searchOptions.personalDetails.length);
console.log('Report search options', searchOptions.recentReports.length);

function generateSearchableString(personalDetails) {
    const parts = [
        personalDetails.displayName ?? '',
        personalDetails.login ?? '',
        personalDetails.firstName ?? '',
        personalDetails.lastName ?? '',
        // TODO: other things such as abbreviations and replaced emails
    ];
    return parts.join('').toLowerCase();
}

// build search trie
const trie = new GeneralizedSuffixTree();
const start2 = performance.now();
console.log({trie});
options.personalDetails.forEach((pd) => {
    trie.insert(pd, [
        pd.item.displayName ?? '',
        pd.item.login ?? '',
        pd.item.firstName ?? '',
        pd.item.lastName ?? '',
        // TODO: other things such as abbreviations and replaced emails
    ]);
});
const end2 = performance.now();
console.log('Time to add all personal details to substring trie:', end2 - start2, 'ms');

function MyPerformanceTest() {
    useEffect(() => {
        BootSplash.hide();
    }, []);

    const [result, setResult] = React.useState(null);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Mean: {result?.mean}</Text>
            <Text>StdDev: {result?.stdDev}</Text>
            <Button
                title="Test"
                onPress={() => {
                    const iterations = 10;
                    const durations = [];
                    for (let i = 0; i < iterations; i++) {
                        const start = performance.now();
                        // OptionsListUtils.filterOptions(searchOptions, SEARCH_VALUE, {sortByReportTypeInSearch: true, betas: mockedBetas, preferChatroomsOverThreads: true});
                        // for (const pD of searchOptions.personalDetails) {
                        //     OptionsListUtils.getPersonalDetailSearchTerms(pD);
                        // }

                        const res = trie.search(SEARCH_VALUE);
                        console.log('Search results:', res.length);

                        const end = performance.now();
                        durations.push(end - start);
                    }
                    const mean = durations.reduce((a, b) => a + b) / iterations;
                    const stdDev = Math.sqrt(durations.reduce((a, b) => a + (b - mean) ** 2) / iterations);
                    setResult({mean, stdDev});
                }}
            />
        </View>
    );
}

AppRegistry.registerComponent(Config.APP_NAME, () => MyPerformanceTest);
additionalAppSetup();
