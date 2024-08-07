class SubstringRadixNode<T> {
    children = new Map<string, SubstringRadixNode<T>>();

    items = new Set<T>();

    prefix = '';
}

export default SubstringRadixNode;
