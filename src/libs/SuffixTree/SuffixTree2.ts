/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
class SuffixTrieNode {
    transition: Record<string, [SuffixTrieNode, number, number]> = {};

    suffixLink: SuffixTrieNode | null = null;

    addTransition(node: SuffixTrieNode, start: number, end: number, symbol: string): void {
        this.transition[symbol] = [node, start, end];
    }

    isLeaf(): boolean {
        return Object.keys(this.transition).length === 0;
    }
}

class SuffixTrie {
    private text = '';

    private root: SuffixTrieNode;

    private bottom: SuffixTrieNode;

    private s: SuffixTrieNode;

    private k: number;

    private i: number;

    constructor() {
        this.root = new SuffixTrieNode();
        this.bottom = new SuffixTrieNode();
        this.root.suffixLink = this.bottom;

        this.s = this.root;
        this.k = 0;
        this.i = -1;
    }

    addString(str: string): this {
        const temp = this.text.length;
        this.text += temp ? `⚇${str}` : str;

        let [s, k, i] = [this.s, this.k, this.i];

        for (let j = temp; j < this.text.length; j++) {
            this.bottom.addTransition(this.root, j, j, this.text[j]);
        }

        while (this.text[i + 1]) {
            i++;
            [s, k] = this.update(s, k, i);
            [s, k] = this.canonize(s, k, i);
        }

        [this.s, this.k, this.i] = [s, k, i];
        return this;
    }

    private update(s: SuffixTrieNode, k: number, i: number): [SuffixTrieNode, number] {
        let oldr = this.root;
        let [endPoint, r] = this.testAndSplit(s, k, i - 1, this.text[i]);

        while (!endPoint) {
            const newNode = new SuffixTrieNode();
            r.addTransition(newNode, i, Infinity, this.text[i]);

            if (oldr !== this.root) {
                oldr.suffixLink = r;
            }

            oldr = r;
            [s, k] = this.canonize(s.suffixLink!, k, i - 1);
            [endPoint, r] = this.testAndSplit(s, k, i - 1, this.text[i]);
        }

        if (oldr !== this.root) {
            oldr.suffixLink = s;
        }

        return [s, k];
    }

    private testAndSplit(s: SuffixTrieNode, k: number, p: number, t: string): [boolean, SuffixTrieNode] {
        if (k <= p) {
            const [s2, k2, p2] = s.transition[this.text[k]];
            if (t === this.text[k2 + p - k + 1]) {
                return [true, s];
            }
            const r = new SuffixTrieNode();
            s.addTransition(r, k2, k2 + p - k, this.text[k2]);
            r.addTransition(s2, k2 + p - k + 1, p2, this.text[k2 + p - k + 1]);
            return [false, r];
        }
        if (!s.transition[t]) {
            return [false, s];
        }
        return [true, s];
    }

    private canonize(s: SuffixTrieNode, k: number, p: number): [SuffixTrieNode, number] {
        if (p < k) {
            return [s, k];
        }
        let [s2, k2, p2] = s.transition[this.text[k]];
        while (p2 - k2 <= p - k) {
            k = k + p2 - k2 + 1;
            s = s2;
            if (k <= p) {
                const [nextS2, nextK2, nextP2] = s.transition[this.text[k]];
                [s2, k2, p2] = [nextS2, nextK2, nextP2];
            }
        }
        return [s, k];
    }

    private transitionLength(node: SuffixTrieNode, symbol: string): number {
        const [, start, end] = node.transition[symbol];
        return end - start + 1;
    }

    toString(): string {
        const traverse = (node: SuffixTrieNode, offset = ''): string => {
            let ret = '';
            for (const t in node.transition) {
                const [s, start, end] = node.transition[t];
                ret += `${offset}["${t}", ${start}, ${end === Infinity ? 'Infinity' : end}, ${s === this.root ? 'root' : 'node'}]\n`;
                ret += traverse(s, `${offset}\t`);
            }
            return ret;
        };
        return traverse(this.root);
    }

    print(): void {
        console.log(this.toString());
    }

    findAllOccurrences(searchString: string): number[] {
        const occurrences: number[] = [];
        const root = this.root;

        const findString = (node: SuffixTrieNode, stringIndex: number, depth: number) => {
            if (stringIndex >= searchString.length) {
                // We've found the entire string, now collect all leaf nodes
                this.collectLeafDepths(node, depth, occurrences);
                return;
            }

            const currentChar = searchString[stringIndex];
            if (node.transition[currentChar]) {
                let [nextNode, start, end] = node.transition[currentChar];
                if (end === Infinity) {
                    end = this.text.length - 1;
                }
                const transitionLength = end - start + 1;

                for (let i = 0; i < transitionLength && stringIndex < searchString.length; i++) {
                    if (searchString[stringIndex] !== this.text[start + i]) {
                        return; // Mismatch found
                    }
                    stringIndex++;
                }

                findString(nextNode, stringIndex, depth + transitionLength);
            }
        };

        findString(root, 0, 0);
        return occurrences;
    }

    private collectLeafDepths(node: SuffixTrieNode, depth: number, occurrences: number[]): void {
        if (node.isLeaf()) {
            occurrences.push(this.text.length - depth);
            return;
        }

        for (const t in node.transition) {
            let [nextNode, start, end] = node.transition[t];
            if (end === Infinity) {
                end = this.text.length - 1;
            }
            const transitionLength = end - start + 1;
            this.collectLeafDepths(nextNode, depth + transitionLength, occurrences);
        }
    }
}

// Usage example
// const suffixTrie = new SuffixTrie();
// suffixTrie.addString('banana$');
// suffixTrie.addString('Hanno$');
// suffixTrie.print();
// const occurrences = suffixTrie.findAllOccurrences('an');
// console.log(occurrences); // [1, 3]

export default SuffixTrie;
