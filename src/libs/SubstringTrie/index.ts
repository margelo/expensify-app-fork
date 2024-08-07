import SubstringRadixNode from './SubstringTrieNode';

const maxSubstringLength = 10;

class SubstringRadixTree<T> {
    private root = new SubstringRadixNode<T>();

    insert(word: string, item: T) {
        for (let i = 0; i < word.length; i++) {
            this.insertSubstring(word.slice(i), item);
        }
    }

    private insertSubstring(substring: string, item: T) {
        let node = this.root;
        let current = substring;

        while (current.length > 0) {
            if (current.length > maxSubstringLength) {
                current = current.slice(0, maxSubstringLength);
            }

            let matchingPrefix = '';
            let childKey: string | undefined;

            // Use Array.from() to iterate over Map entries
            Array.from(node.children.entries()).some(([key, child]) => {
                matchingPrefix = this.findMatchingPrefix(current, key);
                if (matchingPrefix) {
                    childKey = key;
                    return true;
                }
                return false;
            });

            if (matchingPrefix) {
                if (matchingPrefix === childKey) {
                    // Move to the child node
                    node = node.children.get(childKey)!;
                    current = current.slice(matchingPrefix.length);
                } else {
                    // Split the existing node
                    const childNode = node.children.get(childKey!)!;
                    const newNode = new SubstringRadixNode<T>();
                    newNode.prefix = matchingPrefix;

                    node.children.delete(childKey!);
                    node.children.set(matchingPrefix, newNode);

                    childNode.prefix = childKey!.slice(matchingPrefix.length);
                    newNode.children.set(childNode.prefix, childNode);

                    node = newNode;
                    current = current.slice(matchingPrefix.length);
                }
            } else {
                // Create a new node
                const newNode = new SubstringRadixNode<T>();
                newNode.prefix = current;
                node.children.set(current, newNode);
                node = newNode;
                current = '';
            }

            node.items.add(item);
        }
    }

    private findMatchingPrefix(str1: string, str2: string): string {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return str1.slice(0, i);
    }

    search(word: string): T[] {
        let node = this.root;
        let current = word;

        while (current.length > 0) {
            let matchFound = false;
            // Use Array.from() to iterate over Map entries
            Array.from(node.children.entries()).some(([prefix, child]) => {
                if (current.startsWith(prefix)) {
                    node = child;
                    current = current.slice(prefix.length);
                    matchFound = true;
                    return true;
                }
                return false;
            });
            if (!matchFound) {
                return [];
            }
        }

        return Array.from(node.items);
    }
}

export default SubstringRadixTree;
