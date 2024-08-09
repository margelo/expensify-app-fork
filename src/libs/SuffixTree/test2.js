const MAX_CHAR = 256;

class SuffixTreeNode {
    constructor() {
        this.children = new Array(MAX_CHAR).fill(null);
        this.suffixLink = null;
        this.start = 0;
        this.end = null;
        this.suffixIndex = -1;
    }
}

let text = "";
let root = null;
let lastNewNode = null;
let activeNode = null;
let count = 0;

let activeEdge = -1;
let activeLength = 0;

let remainingSuffixCount = 0;
let leafEnd = -1;
let rootEnd = null;
let splitEnd = null;
let size = -1;

// Function to create a new node in the suffix tree
const newNode = (start, end) => {
    count++;
    const node = new SuffixTreeNode();
    for (let i = 0; i < MAX_CHAR; i++)
        {node.children[i] = null;}

    node.suffixLink = root;
    node.start = start;
    node.end = end;
    node.suffixIndex = -1;
    return node;
};

// Function to calculate the length of an edge
const edgeLength = (n) => {
    return n.end - n.start + 1;
};

// Function to perform walk down in the tree
const walkDown = (currNode) => {
    if (activeLength >= edgeLength(currNode)) {
        activeEdge = text.charCodeAt(activeEdge + edgeLength(currNode)) - ' '.charCodeAt();
        activeLength -= edgeLength(currNode);
        activeNode = currNode;
        return true;
    }
    return false;
};

// Function to extend the suffix tree
const extendSuffixTree = (pos) => {
    leafEnd = pos;
    remainingSuffixCount++;
    lastNewNode = null;

    while (remainingSuffixCount > 0) {

        if (activeLength === 0) {
            activeEdge = text.charCodeAt(pos) - ' '.charCodeAt();
        }

        if (activeNode.children[activeEdge] === null) {
            activeNode.children[activeEdge] = newNode(pos, leafEnd);

            if (lastNewNode !== null) {
                lastNewNode.suffixLink = activeNode;
                lastNewNode = null;
            }
        } else {
            const next = activeNode.children[activeEdge];
            if (walkDown(next)) {
                continue;
            }

            if (text[next.start + activeLength] === text[pos]) {
                if (lastNewNode !== null && activeNode !== root) {
                    lastNewNode.suffixLink = activeNode;
                    lastNewNode = null;
                }

                activeLength++;
                break;
            }

            splitEnd = next.start + activeLength - 1;
            const split = newNode(next.start, splitEnd);
            activeNode.children[activeEdge] = split;

            split.children[text.charCodeAt(pos) - ' '.charCodeAt()] = newNode(pos, leafEnd);
            next.start += activeLength;
            split.children[activeEdge] = next;

            if (lastNewNode !== null) {
                lastNewNode.suffixLink = split;
            }

            lastNewNode = split;
        }

        remainingSuffixCount--;
        if (activeNode === root && activeLength > 0) {
            activeLength--;
            activeEdge = text.charCodeAt(pos - remainingSuffixCount + 1) - ' '.charCodeAt();
        } else if (activeNode !== root) {
            activeNode = activeNode.suffixLink;
        }
    }
};

// Function to print characters from index i to j
const print = (i, j) => {
    for (let k = i; k <= j; k++) {
        process.stdout.write(text[k]);
    }
};

// Function to set suffix index by DFS traversal
const setSuffixIndexByDFS = (n, labelHeight) => {
    if (n === null) {return;}

    if (n.start !== -1) {
        print(n.start, n.end);
    }
    let leaf = 1;
    for (let i = 0; i < MAX_CHAR; i++) {
        if (n.children[i] !== null) {
            if (leaf === 1 && n.start !== -1) {
                console.log(` [${n.suffixIndex}]`);
            }

            leaf = 0;
            setSuffixIndexByDFS(n.children[i], labelHeight + edgeLength(n.children[i]));
        }
    }
    if (leaf === 1) {
        n.suffixIndex = size - labelHeight;
        console.log(` [${n.suffixIndex}]`);
    }
};

// Function to free memory in post-order traversal
const freeSuffixTreeByPostOrder = (n) => {
    if (n === null) {return;}

    for (let i = 0; i < MAX_CHAR; i++) {
        if (n.children[i] !== null) {
            freeSuffixTreeByPostOrder(n.children[i]);
        }
    }
    if (n.suffixIndex === -1) {
        delete n.end;
    }
    delete n;
};

// Function to build the suffix tree
const buildSuffixTree = () => {
    size = text.length;
    rootEnd = -1;

    root = newNode(-1, rootEnd);

    activeNode = root;
    for (let i = 0; i < size; i++) {
        extendSuffixTree(i);
    }
    const labelHeight = 0;
    setSuffixIndexByDFS(root, labelHeight);

    freeSuffixTreeByPostOrder(root);
};

// Main function
const main = () => {
    const personalDetails = require("../../../tests/perf-test/personaldetails.json");

    Object.values(personalDetails).forEach((pd) => {
        let newText = ""
        newText += pd.displayName ?? '';
        newText += pd.login ?? '';
        newText += pd.firstName ?? '';
        newText += pd.lastName ?? '';
        if (newText){
        newText += "$"
        text += newText;
        }
    });

    console.log(`Text is ${text}`);

    buildSuffixTree();
    console.log(`Number of nodes in suffix tree are ${count}`);
};

main();