/* eslint-disable max-classes-per-file */
declare class Node {
    transition: Record<string, [Node, number, number]>;

    suffixLink: Node | null;

    constructor();
    addTransition(node: Node, [start, end]: [number, number], t: string): void;
    isLeaf(): boolean;
}

declare class SuffixTree {
    private text: string;

    private root: Node;

    private bottom: Node;

    private s: Node;

    private k: number;

    private i: number;

    constructor();

    addString(str: string): this;

    private update(s: Node, [k, i]: [number, number]): [Node, number];

    private testAndSplit(s: Node, [k, p]: [number, number], t: string): [boolean, Node];

    private canonize(s: Node, [k, p]: [number, number]): [Node, number];

    findLongestRepeatedSubstrings(n?: number): string[];

    toString(): string;

    print(): void;

    findAllOccurrences(searchString: string): number[];
}

export default SuffixTree;
