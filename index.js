/* eslint-disable @lwc/lwc/no-async-await */
/**
 * @format
 */

import 'react-native-gesture-handler';
import {SQLiteStorage, AsyncStorage} from 'react-native-onyx/lib/storage/NativeStorage';

/* mport App from './src/App';

import additionalAppSetup from './src/setup'; */
import {AppRegistry} from 'react-native';
import Config from './src/CONFIG';

// AppRegistry.registerComponent(Config.APP_NAME, () => App);

AppRegistry.registerComponent(Config.APP_NAME, () => () => (null));

// additionalAppSetup();

/* async function testStorage(Storage, name) {
  const before = performance.now();
  const allKeys = await Storage.getAllKeys();
  for (let key of allKeys) {
    const value = await Storage.getItem(key);
    await Storage.setItem(key, value);
  }
  const after = performance.now();
  const res = after - before;
  console.log('perfx the whole test for', name, 'took', res);
  return res;
}

async function prepareSQLiteStorage() {
  const getKeys = await AsyncStorage.getAllKeys();
  for (let key of getKeys) {
    const value = await AsyncStorage.getItem(key);
    await SQLiteStorage.setItem(key, value);
  }
}

async function test() {
   // await prepareSQLiteStorage();
    const asTime = await testStorage(AsyncStorage, 'AsyncStorage');
    const SQTime = await testStorage(SQLiteStorage, 'SQLiteStorage');

    console.log(`perfx sq:${SQTime} vs as:${asTime}`);
}

test(); */

const key = 'report_98817646';

/*async function test() {
    let asTime = 0;
    let SQTime = 0;

    let before = performance.now();
    const allKeys = await AsyncStorage.getAllKeys();
    let after = performance.now();
    asTime += after - before;

    before = performance.now();
    await SQLiteStorage.getAllKeys();
    after = performance.now();
    SQTime += after - before;

    console.log(`perfx getAllKeys sq:${SQTime} vs as:${asTime}`);

    for (const key of allKeys) {
        before = performance.now();
        const value = await AsyncStorage.getItem(key);
        after = performance.now();
        let asTemp = after - before;

        before = performance.now();
        await SQLiteStorage.getItem(key);
        after = performance.now();
        let sqTemp = after - before;

        console.log(`perfx get key:${key} sq:${sqTemp} vs as:${asTemp}`);
        asTime += asTemp;
        SQTime += sqTemp;

        before = performance.now();
        await AsyncStorage.setItem(key, value);
        after = performance.now();
        asTemp = after - before;

        before = performance.now();
        await SQLiteStorage.setItem(key, value);
        after = performance.now();
        sqTemp = after - before;

        console.log(`perfx set key:${key} sq:${sqTemp} vs as:${asTemp}`);

        asTime += asTemp;
        SQTime += sqTemp;
    }

    console.log(`perfx sq:${SQTime} vs as:${asTime}`);
}*/

async function test() {
  const keys = await SQLiteStorage.getAllKeys();
  const value = await AsyncStorage.getItem(key);
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
