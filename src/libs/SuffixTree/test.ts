/* eslint-disable max-classes-per-file */
//  The only information contained in a node is the
//  suffix link. Each suffix in the tree that ends
//  at a particular node can find the next smaller suffix
//  by following the suffix_node link to a new node.  Nodes
//  are stored in a simple array.
let nodeCount = 0;
class TNode {
    suffixNode: number;

    constructor() {
        this.suffixNode = -1;
    }
}

class Edge {
    firstCharIndex: number;

    lastCharIndex: number;

    endNode: number;

    startNode: number;

    // The default ctor for Edge just sets start_node
    // to the invalid value.  This is done to guarantee
    // that the hash table is initially filled with unused
    // edges.
    constructor();

    // I create new edges in the program while walking up
    // the set of suffixes from the active point to the
    // endpoint.  Each time I create a new edge, I also
    // add a new node for its end point.  The node entry
    // is already present in the Nodes[] array, and its
    // suffix node is set to -1 by the default Node() ctor,
    // so I don't have to do anything with it at this point.
    constructor(info?: {initFirst: number; initLast: number; parentNode: number}) {
        if (info) {
            this.firstCharIndex = info.initFirst;
            this.lastCharIndex = info.initLast;
            this.startNode = info.parentNode;
            this.endNode = nodeCount++;
        } else {
            this.startNode = -1;
        }
    }
}

// When a new tree is added to the table, we step
// through all the currently defined suffixes from
// the active point to the end point.  This structure
// defines a Suffix by its final character.
// In the canonical representation, we define that last
// character by starting at a node in the tree, and
// following a string of characters, represented by
// first_char_index and last_char_index.  The two indices
// point into the input string.  Note that if a suffix
// ends at a node, there are no additional characters
// needed to characterize its last character position.
// When this is the case, we say the node is Explicit,
// and set first_char_index > last_char_index to flag
// that.
class Suffix {
    originalNode: number;

    firstCharIndex: number;

    lastCharIndex: number;

    constructor(node: number, start: number, end: number) {
        this.originalNode = node;
        this.firstCharIndex = start;
        this.lastCharIndex = end;
    }

    // TODO: does that change? we could construct this info in the constructor and save it
    explicit(): boolean {
        return this.firstCharIndex > this.lastCharIndex;
    }

    implicit(): boolean {
        return this.firstCharIndex <= this.lastCharIndex;
    }

    canonize(): void {
        if (!this.explicit()) {
        }
    }
}
