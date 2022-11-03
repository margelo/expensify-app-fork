import AsyncStorage from './providers/AsyncStorage';

import SQLiteStorage from './providers/SQLiteStorage';

function wrap(obj, name) {
    const oldMethod = obj[name];

    const newMethod = (...args) => {
        const start = performance.now();
        return oldMethod(...args).then((res) => {
            const after = performance.now();
            const nn = name + ' ' + ((args[0] != null) ? JSON.stringify(args[0]) : '');
            console.log(`perfx ${nn} took`, after - start);
            return res;
        });
    };

    obj[name] = newMethod;
}

const methodsToWrap = ['getAllKeys', 'getItem', 'multiGet', 'multiSet', 'multiMerge', 'setItem'];

for (const name of methodsToWrap) {
    console.log('perfx wrapped', name);
   // wrap(AsyncStorage, name);
}

for (const name of methodsToWrap) {
  console.log('perfx wrapped', name);
  //wrap(SQLiteStorage, name);
}

export default AsyncStorage;

export { AsyncStorage, SQLiteStorage };
