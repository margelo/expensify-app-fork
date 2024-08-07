import SubstringTrieNode from './SubstringTrieNode';

const maxSubstringLength = 10;
class SubstringTrie<T> {
    private root = new SubstringTrieNode<T>();

    insert(word: string, item: T) {
        for (let i = 0; i < word.length; i++) {
            let node = this.root;
            // Each substring of the word we add to the trie now:
            for (let j = i; j < Math.min(i + maxSubstringLength, word.length); j++) {
                const char = word[j];
                if (!node.children.has(char)) {
                    node.children.set(char, new SubstringTrieNode<T>());
                }

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                node = node.children.get(char)!;
                node.items.add(item);
            }
        }
    }

    search(word: string) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                return false;
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            node = node.children.get(char)!;
        }

        return Array.from(node.items);
    }
}

export default SubstringTrie;
