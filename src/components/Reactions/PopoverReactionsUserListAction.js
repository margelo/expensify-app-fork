import React from 'react';

const reactionsUserListRef = React.createRef();

const showReactionsUserList = (anchorElement, users, emoji) => {
    if (!reactionsUserListRef.current) {
        return;
    }

    reactionsUserListRef.current.show(anchorElement, users, emoji);
};

export {
    reactionsUserListRef,
    showReactionsUserList,
};
