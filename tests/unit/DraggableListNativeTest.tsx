import {act, fireEvent, render, screen, waitFor} from '@testing-library/react-native';

import DraggableList from '@components/DraggableList/index.native';

import {LegendList as LibraryLegendList} from '@legendapp/list/react-native';
import type {LegendListRef} from '@legendapp/list/react-native';
import {View} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {fireGestureHandler, getByGestureTestId} from 'react-native-gesture-handler/jest-utils';

const DATA = ['first', 'second', 'third'];

function renderDraggableList(onDragEnd = jest.fn()) {
    render(
        <DraggableList
            data={DATA}
            keyExtractor={(item) => item}
            onDragEnd={onDragEnd}
            renderItem={({isActive, item}) => <View testID={`${item}-${isActive ? 'active' : 'inactive'}`} />}
        />,
    );
    for (const [index] of DATA.entries()) {
        fireEvent(screen.getByTestId(`draggable-list-row-layout-${index}`), 'layout', {
            nativeEvent: {layout: {height: 40, width: 200, x: 0, y: 0}},
        });
    }
}

function getInternalListRef(): LegendListRef {
    const ref = jest.mocked(LibraryLegendList).mock.lastCall?.[0].ref;
    if (!ref || typeof ref === 'function' || !('current' in ref) || !ref.current) {
        throw new Error('Expected DraggableList to forward an object ref to LegendList');
    }
    return ref.current;
}

describe('DraggableList on native platforms', () => {
    it('reorders rows using measured sizes when cell-local y positions are all zero', async () => {
        const onDragEnd = jest.fn();
        renderDraggableList(onDragEnd);

        fireGestureHandler(getByGestureTestId('draggable-list-row-0'), [
            {state: State.BEGAN, translationY: 0},
            {state: State.ACTIVE, translationY: 0},
            {translationY: 85},
            {state: State.END, translationY: 85},
        ]);

        await waitFor(() => expect(onDragEnd).toHaveBeenCalledWith({data: ['second', 'third', 'first']}));
    });

    it('clears active state when the native gesture is cancelled', async () => {
        const onDragEnd = jest.fn();
        renderDraggableList(onDragEnd);

        fireGestureHandler(getByGestureTestId('draggable-list-row-1'), [
            {state: State.BEGAN, translationY: 0},
            {state: State.ACTIVE, translationY: 0},
            {state: State.CANCELLED, translationY: 30},
        ]);

        expect(await screen.findByTestId('second-inactive')).toBeOnTheScreen();
        expect(onDragEnd).not.toHaveBeenCalled();
    });

    it('continues autoscrolling while a dragged row remains at the viewport edge', () => {
        jest.useFakeTimers();
        renderDraggableList();
        fireEvent.scroll(screen.getByTestId('draggable-list'), {
            nativeEvent: {
                contentOffset: {x: 0, y: 0},
                contentSize: {height: 300, width: 200},
                layoutMeasurement: {height: 100, width: 200},
            },
        });
        const listRef = getInternalListRef();

        fireGestureHandler(getByGestureTestId('draggable-list-row-2'), [
            {state: State.BEGAN, translationY: 0},
            {state: State.ACTIVE, translationY: 0},
            {translationY: 10},
        ]);
        act(() => jest.advanceTimersByTime(64));

        expect(listRef.scrollToOffset).toHaveBeenCalledTimes(2);

        fireGestureHandler(getByGestureTestId('draggable-list-row-2'), [{state: State.CANCELLED, translationY: 10}]);
        jest.useRealTimers();
    });
});
