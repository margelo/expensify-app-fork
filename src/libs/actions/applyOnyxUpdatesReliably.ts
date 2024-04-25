import type {OnyxUpdatesFromServer} from '@src/types/onyx';
import {handleOnyxUpdateGap} from './OnyxUpdateManager';
import * as OnyxUpdates from './OnyxUpdates';

let delayedUpdatesCount = 0;
const NUMBER_OF_DELAYED_OR_MISSING_UPDATES = 100;
const MIN_DELAY = 1000;
const MAX_DELAY = 10000 - MIN_DELAY;

/**
 * Checks for and handles gaps of onyx updates between the client and the given server updates before applying them
 *
 * This is in it's own lib to fix a dependency cycle from OnyxUpdateManager
 *
 * @param updates
 * @param shouldRunSync
 * @returns
 */
export default function applyOnyxUpdatesReliably(updates: OnyxUpdatesFromServer, shouldRunSync = false, clientLastUpdateID = 0) {
    const previousUpdateID = Number(updates.previousUpdateID) || 0;

    const applyUpdate = () => {
        if (!OnyxUpdates.doesClientNeedToBeUpdated(previousUpdateID, clientLastUpdateID)) {
            OnyxUpdates.apply(updates);
            return;
        }

        if (shouldRunSync) {
            handleOnyxUpdateGap(updates, clientLastUpdateID);
        } else {
            OnyxUpdates.saveUpdateInformation(updates);
        }
    };

    const previousDelayedUpdatesCount = delayedUpdatesCount;
    if (delayedUpdatesCount === NUMBER_OF_DELAYED_OR_MISSING_UPDATES) {
        delayedUpdatesCount = 0;
    } else {
        delayedUpdatesCount++;
    }

    // Send delayed updates and sometimes don't send them at all
    if (previousDelayedUpdatesCount > 0 && previousDelayedUpdatesCount < NUMBER_OF_DELAYED_OR_MISSING_UPDATES) {
        const shouldOmitUpdate = !(previousDelayedUpdatesCount % 3) || !(previousDelayedUpdatesCount % 4);
        if (!shouldOmitUpdate) {
            setTimeout(() => {
                applyUpdate();
            }, Math.random() * MAX_DELAY + MIN_DELAY);
        }

        return;
    }

    applyUpdate();
}
