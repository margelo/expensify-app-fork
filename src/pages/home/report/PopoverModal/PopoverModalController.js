import React from 'react';

const popoverModalRef = React.createRef();

/**
 * Show the modal popover.
 *
 * @param {string} type - the context menu type to display [EMAIL, LINK, REPORT_ACTION]
 * @param {Object} [event] - A press event.
 * @param {String} [selection] - Copied content.
 * @param {Element} popoverModalAnchor - popoverAnchor
 * @param {String} reportID - Active Report Id
 * @param {Object} reportAction - ReportAction for ContextMenu
 * @param {String} draftMessage - ReportAction Draftmessage
 * @param {Function} [onShow=() => {}] - Run a callback when Menu is shown
 * @param {Function} [onHide=() => {}] - Run a callback when Menu is hidden
 * @param {Boolean} isArchivedRoom - Whether the provided report is an archived room
 * @param {Boolean} isChronosReport - Flag to check if the chat participant is Chronos
 * @param {Array} users - array of users id
 * @param {String} emojiName - the emoji codes to display near the bubble.
 * @param {String} emojiCodes - the emoji codes to display in the bubble.
 * @param {Boolean} hasUserReacted - show if user has reacted
 */
function showPopoverModal({
    popupContentType,
    type,
    event,
    selection,
    popoverModalAnchor,
    reportID = '0',
    reportAction = {},
    draftMessage = '',
    onShow = () => {},
    onHide = () => {},
    isArchivedRoom = false,
    isChronosReport = false,
    users,
    emojiName,
    emojiCodes,
    emojiCount,
    hasUserReacted,
    reactionListAnchor,
}) {
    if (!popoverModalRef.current) {
        return;
    }
    popoverModalRef.current.showPopoverModal({
        popupContentType,
        type,
        event,
        selection,
        popoverModalAnchor,
        reportID,
        reportAction,
        draftMessage,
        onShow,
        onHide,
        isArchivedRoom,
        isChronosReport,
        users,
        emojiName,
        emojiCodes,
        emojiCount,
        hasUserReacted,
        reactionListAnchor,
    });
}

/**
 * Hide the modal popover.
 * Hides the popover menu with an optional delay
 * @param {Boolean} shouldDelay - whether the menu should close after a delay
 * @param {Function} [onHideCallback=() => {}] - Callback to be called after Context Menu is completely hidden
 */
function hidePopoverModal(shouldDelay, onHideCallback = () => {}) {
    if (!popoverModalRef.current) {
        return;
    }
    if (!shouldDelay) {
        popoverModalRef.current.hidePopoverModal(onHideCallback);

        return;
    }

    // Save the active instanceID for which hide action was called.
    // If menu is being closed with a delay, check that whether the same instance exists or a new was created.
    // If instance is not same, cancel the hide action
    const instanceID = popoverModalRef.current.instanceID;
    setTimeout(() => {
        if (popoverModalRef.current.instanceID !== instanceID) {
            return;
        }

        popoverModalRef.current.hidePopoverModal(onHideCallback);
    }, 800);
}

function hideDeleteModal() {
    if (!popoverModalRef.current) {
        return;
    }
    popoverModalRef.current.hideDeleteModal();
}

/**
 * Opens the Confirm delete action modal
 * @param {String} reportID
 * @param {Object} reportAction
 * @param {Boolean} [shouldSetModalVisibility]
 * @param {Function} [onConfirm]
 * @param {Function} [onCancel]
 */
function showDeleteModal(reportID, reportAction, shouldSetModalVisibility, onConfirm, onCancel) {
    if (!popoverModalRef.current) {
        return;
    }
    popoverModalRef.current.showDeleteModal(reportID, reportAction, shouldSetModalVisibility, onConfirm, onCancel);
}

/**
 * Whether Context Menu is active for the Report Action.
 *
 * @param {Number|String} actionID
 * @return {Boolean}
 */
function isActiveReportAction(actionID) {
    if (!popoverModalRef.current) {
        return;
    }
    return popoverModalRef.current.isActiveReportAction(actionID);
}

export {
    popoverModalRef,
    showPopoverModal,
    hidePopoverModal,
    isActiveReportAction,
    showDeleteModal,
    hideDeleteModal,
};
