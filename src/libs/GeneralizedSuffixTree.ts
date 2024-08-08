/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
class TrieNode<T> {
    children = new Map<string, TrieNode<T>>();

    items: T[] = [];

    isEnd = false;
}

class GeneralizedSuffixTree<T> {
    private root: TrieNode<T> = new TrieNode<T>();

    insert(item: T, strings: string[]): void {
        for (const str of strings) {
            for (let i = 0; i < str.length; i++) {
                this.insertSuffix(str.slice(i), item);
            }
        }
    }

    private insertSuffix(suffix: string, item: T): void {
        let node = this.root;
        for (const char of suffix) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode<T>());
            }
            node = node.children.get(char)!;
            node.items.push(item);
        }
        node.isEnd = true;
    }

    search(query: string): T[] {
        let node = this.root;
        for (const char of query) {
            if (!node.children.has(char)) {
                return [];
            }
            node = node.children.get(char)!;
        }
        return node.items;
    }
}
export default GeneralizedSuffixTree;

// Szymon-szymon@margelo.com-
// Hanno
// Hanno123

// Szymon/Hanno/Hanno123

// [0,0,0,0,0,-1,1,1,1,1,1,2,2,2,2,2,2,2]

// [{szymon},{szymon},{szymon},{szymon},{szymon}]
