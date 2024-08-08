/* eslint-disable max-classes-per-file */
/* jshint esnext: true, -W097  */
/* globals console */

class Node {
    constructor() {
        this.transition = {};
        this.suffixLink = null;
    }

    addTransition(node: Node, [start, end], t) {
        this.transition[t] = [node, start, end];
    }

    isLeaf() {
        return Object.keys(this.transition).length === 0;
    }
}

class SuffixTree {
    constructor() {
        this.text = '';

        this.root = new Node();
        this.bottom = new Node();
        this.root.suffixLink = this.bottom;

        this.s = this.root;
        this.k = 0;
        this.i = -1;
    }

    addString = (str) => {
        const temp = this.text.length;
        this.text += temp ? `⚇${str}` : str;

        let [s, k, i] = [this.s, this.k, this.i];

        for (let j = temp; j < this.text.length; j++) {
            this.bottom.addTransition(this.root, [j, j], this.text[j]);
        }

        while (this.text[i + 1]) {
            i++;
            [s, k] = this.update(s, [k, i]);
            [s, k] = this.canonize(s, [k, i]);
        }

        [this.s, this.k, this.i] = [s, k, i];
        return this;
    };

    update = (s, [k, i]) => {
        let oldr = this.root;
        let [endPoint, r] = this.testAndSplit(s, [k, i - 1], this.text[i]);

        while (!endPoint) {
            r.addTransition(new Node(), [i, Infinity], this.text[i]);

            if (oldr != this.root) {
                oldr.suffixLink = r;
            }

            oldr = r;
            [s, k] = this.canonize(s.suffixLink, [k, i - 1]);
            [endPoint, r] = this.testAndSplit(s, [k, i - 1], this.text[i]);
        }

        if (oldr != this.root) {
            oldr.suffixLink = s;
        }

        return [s, k];
    };

    testAndSplit = (s, [k, p], t) => {
        if (k <= p) {
            const [s2, k2, p2] = s.transition[this.text[k]];

            if (t == this.text[k2 + p - k + 1]) {
                return [true, s];
            }
            const r = new Node();
            s.addTransition(r, [k2, k2 + p - k], this.text[k2]);
            r.addTransition(s2, [k2 + p - k + 1, p2], this.text[k2 + p - k + 1]);
            return [false, r];
        }
        if (!s.transition[t]) {
            return [false, s];
        }
        return [true, s];
    };

    canonize = (s, [k, p]) => {
        if (p < k) {
            return [s, k];
        }

        let [s2, k2, p2] = s.transition[this.text[k]];

        while (p2 - k2 <= p - k) {
            k = k + p2 - k2 + 1;
            s = s2;

            if (k <= p) {
                [s2, k2, p2] = s.transition[this.text[k]];
            }
        }

        return [s, k];
    };

    findLongestRepeatedSubstrings = (n = 3) => {
        const [text, root] = [this.text, this.root];
        const longestSubstrings = [];

        (function traverse(node, curStr = '') {
            if (node.isLeaf()) {
                return;
            }

            for (const t in node.transition) {
                const [s, a, b] = node.transition[t];
                if (!s.isLeaf()) {
                    let curCurStr = curStr;
                    const curSubStr = text.substring(a, b + 1);
                    curCurStr = node === root ? curSubStr : curCurStr + curSubStr;

                    longestSubstrings.push(curCurStr);
                    traverse(s, curCurStr);
                }
            }
        })(root);

        return longestSubstrings.sort((a, b) => b.length - a.length).slice(0, n);
    };

    toString = () => {
        const text = this.text;

        function traverse(node, offset = '', ret = '') {
            for (const t in node.transition) {
                const [s, a, b] = node.transition[t];
                ret += `${offset}["${text.substring(a, b + 1)}", ${a}, ${b}]` + `\r\n`;
                ret += traverse(s, `${offset}\t`);
            }
            return ret;
        }
        const res = traverse(this.root);
        return res;
    };

    print = () => {
        console.log(this.toString());
    };

    findAllOccurrences = (searchString) => {
        const occurrences = [];
        const root = this.root;

        const findString = (node, stringIndex, depth) => {
            // console.log(
            //     'find string - ',
            //     'stringIndex',
            //     stringIndex,
            //     'depth',
            //     depth,
            //     'transitions:',
            //     Object.keys(node.transition),
            //     Object.keys(node.transition).map((key) => [node.transition[key][1], node.transition[key][2]]),
            // );
            if (stringIndex >= searchString.length) {
                // We've found the entire string, now collect all leaf nodes
                this.collectLeafDepths(node, depth, occurrences);
            }

            const currentChar = searchString[stringIndex];
            if (node.transition[currentChar]) {
                let [nextNode, start, end] = node.transition[currentChar];
                if (end === Infinity) {
                    end = this.text.length;
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
    };

    collectLeafDepths = (node, depth, occurrences) => {
        if (node.isLeaf()) {
            occurrences.push(this.text.length - depth + 1);
            // console.log({
            //     textlength: this.text.length,
            //     depth,
            // });
            return;
        }

        for (const t in node.transition) {
            let [nextNode, start, end] = node.transition[t];
            if (end === Infinity) {
                end = this.text.length;
            }
            const transitionLength = end - start + 1;
            this.collectLeafDepths(nextNode, depth + transitionLength, occurrences);
        }
    };
}

export default SuffixTree;
