class SubstringTrieNode<T> {
    children = new Map<string, SubstringTrieNode<T>>();

    items = new Set<T>();
}

export default SubstringTrieNode;
