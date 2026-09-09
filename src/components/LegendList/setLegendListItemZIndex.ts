import type {LegendListRef} from './types';

type NativeListItem = {
    setNativeProps?: (props: {style: {zIndex: number}}) => void;
};

/** Applies z-index to LegendList's native item container rather than to the rendered item inside it. */
function setLegendListItemZIndex(list: LegendListRef | null, index: number, zIndex: number): boolean {
    const itemContainer = list?.getState().elementAtIndex(index) as NativeListItem | undefined;
    if (typeof itemContainer?.setNativeProps !== 'function') {
        return false;
    }

    itemContainer.setNativeProps({style: {zIndex}});
    return true;
}

export default setLegendListItemZIndex;
