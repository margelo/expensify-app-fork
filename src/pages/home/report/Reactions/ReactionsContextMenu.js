import React from 'react';

const contextMenuRef = React.createRef();

function showContextMenu(reactions) {
    if (!contextMenuRef.current) {
        return;
    }
    contextMenuRef.current.showContextMenu(reactions);
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
