/* eslint-disable @lwc/lwc/no-async-await */
/**
 * @format
 */

import 'react-native-gesture-handler';
import {SQLiteStorage, AsyncStorage} from 'react-native-onyx/lib/storage/NativeStorage';

import {AppRegistry} from 'react-native';
import Config from './src/CONFIG';

AppRegistry.registerComponent(Config.APP_NAME, () => () => (null));

async function test() {
    // make sure modules are initialized
    await AsyncStorage.getAllKeys();
    await SQLiteStorage.getAllKeys();

    const key = 'report_98817646';
    const value = {
        chatType: '',
        hasDraft: false,
        isOwnPolicyExpenseChat: false,
        isPinned: false,
        lastActorEmail: 'applausetester+perf2@applause.expensifail.com',
        lastMessageHtml: "Hello this is a performance rest please work. No why don't you",
        lastMessageText: "Hello this is a performance rest please work. No why don't you",
        lastMessageTimestamp: 1666185515,
        lastReadSequenceNumber: 1756,
        lastVisitedTimestamp: 1666259872298,
        maxSequenceNumber: 1756,
        notificationPreference: 'always',
        oldPolicyName: '',
        ownerEmail: '__fake__',
        participants: ['applausetester+perf2@applause.expensifail.com'],
        policyID: '_FAKE_',
        reportID: '98817646',
        reportName: 'Chat Report',
        stateNum: 0,
        statusNum: 0,
        visibility: null,
    };
    const before = performance.now();
    await SQLiteStorage.setItem(key, value);
    const after = performance.now();
    console.log('perfx it took', after - before);

    {
        const before = performance.now();
        await AsyncStorage.setItem(key, value);
        const after = performance.now();
        console.log('perfx async it took', after - before);
    }
}

test();
