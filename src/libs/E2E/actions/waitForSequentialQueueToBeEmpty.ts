import {DeviceEventEmitter} from 'react-native';
import * as PersistedRequests from '@userActions/PersistedRequests';

/**
 * Assures the `SequentialQueue` is empty. **Highly desirable** to call this function before closing the app.
 * If some requests are persisted - they will be executed on the next app start. And it can lead to a situation
 * where we can have `N * M` requests (where `N` is the number of app run per test and `M` is the number of test suites)
 * and such big amount of requests can lead to a situation, where first app run (in test suite to cache network requests)
 * may be blocked by spinners and lead to unbelievable big time execution, which eventually will be bigger than timeout and
 * will lead to a test failure.
 */
export default function waitForSequentialQueueToBeEmpty(): Promise<void> {
    console.debug('Waiting for sequential queue to be empty...', PersistedRequests.getAll());

    if (PersistedRequests.getAll().length === 0) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const subscription = DeviceEventEmitter.addListener('sequentialQueueEmpty', () => {
            subscription.remove();
            resolve();
        });
    });
}
