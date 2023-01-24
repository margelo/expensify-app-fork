import React from 'react';

const contextMenuRef = React.createRef();

function showContextMenu() {
    if (!contextMenuRef.current) {
        return;
    }
    contextMenuRef.current.showContextMenu();
}

function hideContextMenu() {
    if (!contextMenuRef.current) {
        return;
    }
    contextMenuRef.current.hideContextMenu();
}

export {
    contextMenuRef,
    showContextMenu,
    hideContextMenu,
};
