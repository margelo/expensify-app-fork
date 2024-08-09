#include <cstring>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <chrono>
#include <functional>
#include <stack>

using namespace std;

const int N=500000,    // maximum possible number of nodes in suffix tree
	INF=1000000000; // infinity constant
string a;       // input string for which the suffix tree is being built
int t[N][28],   // array of transitions (state, letter)
	l[N],   // left...
	r[N],   // ...and right boundaries of the substring of a which correspond to incoming edge
	p[N],   // parent of the node
	s[N],   // suffix link
	tv,     // the node of the current suffix (if we're mid-edge, the lower node of the edge)
	tp,     // position in the string which corresponds to the position on the edge (between l[tv] and r[tv], inclusive)
	ts,     // the number of nodes
	la;     // the current character in the string
 
void ukkadd(int c) { // add character s to the tree
	suff:;      // we'll return here after each transition to the suffix (and will add character again)
	if (r[tv]<tp) { // check whether we're still within the boundaries of the current edge
		// if we're not, find the next edge. If it doesn't exist, create a leaf and add it to the tree
		if (t[tv][c]==-1) {t[tv][c]=ts;l[ts]=la;p[ts++]=tv;tv=s[tv];tp=r[tv]+1;goto suff;}
		tv=t[tv][c];tp=l[tv];
	} // otherwise just proceed to the next edge
	if (tp==-1 || c==a[tp]-'a')
		tp++; // if the letter on the edge equal c, go down that edge
	else { 
		// otherwise split the edge in two with middle in node ts
		l[ts]=l[tv];r[ts]=tp-1;p[ts]=p[tv];t[ts][a[tp]-'a']=tv;
		// add leaf ts+1. It corresponds to transition through c.
		t[ts][c]=ts+1;l[ts+1]=la;p[ts+1]=ts;
		// update info for the current node - remember to mark ts as parent of tv
		l[tv]=tp;p[tv]=ts;t[p[ts]][a[l[ts]]-'a']=ts;ts+=2;
		// prepare for descent
		// tp will mark where are we in the current suffix
		tv=s[p[ts-2]];tp=l[ts-2];
		// while the current suffix is not over, descend
		while (tp<=r[ts-2]) {tv=t[tv][a[tp]-'a'];tp+=r[tv]-l[tv]+1;}
		// if we're in a node, add a suffix link to it, otherwise add the link to ts
		// (we'll create ts on next iteration).
		if (tp==r[ts-2]+1) s[ts-2]=tv; else s[ts-2]=ts; 
		// add tp to the new edge and return to add letter to suffix
		tp=r[tv]-(tp-r[ts-2])+2;goto suff;
	}
}
 
void build() {
	ts=2;
	tv=0;
	tp=0;
	fill(r,r+N,(int)a.size()-1);
	// initialize data for the root of the tree
	s[0]=1;
	l[0]=-1;
	r[0]=-1;
	l[1]=-1;
	r[1]=-1;
	memset (t, -1, sizeof t);
	fill(t[1],t[1]+28,0);
	// add the text to the tree, letter by letter
	for (la=0; la<(int)a.size(); ++la)
		ukkadd (a[la]-'a');
}

vector<int> findSubstring(string s) {
    vector<int> occurrences;
    stack<tuple<int, int>> st;
    st.push({0, 0});

    while (!st.empty()) {
        auto [node, depth] = st.top();
        st.pop();

        bool isLeaf = true;
        int leftRange = l[node];
        int rightRange = r[node];
        int rangeLen = node == 0 ? 0 : rightRange - leftRange + 1;

        // Check if the current node matches the substring
        bool matches = true;
        for (int i = depth; i < (depth + rangeLen) && i < s.size(); ++i) {
            if (s[i] != a[i - depth + leftRange]) {
                matches = false;
                break;
            }
        }

        if (!matches) continue;

        // Push child nodes onto the stack
        for (int i = 27; i >= 0; --i) {
            if (t[node][i] != -1) {
                isLeaf = false;
                int nextDepth = depth + rangeLen;
                st.push({t[node][i], nextDepth});
            }
        }

        // If it's a leaf node and we've matched the full substring
        if (isLeaf && ((depth + rangeLen) >= s.size())) {
            //cout << "Found at " << a.size() - (depth + rangeLen) << "depth: " << depth << "range: " << rangeLen << endl;
            occurrences.push_back(a.size() - (depth + rangeLen));
        }
    }

    return occurrences;
}

vector<int> findSubstringRecursive(string s) {
    int leafNodes = 0;
    vector<int> occurances;

    function<void(int,int, char)> dfs = [&](int node, int depth, char onEdge) {
        bool isLeaf = true;
        int leftRange = l[node];
        int rightRange = r[node];
        int rangeLen = node == 0 ? 0 : rightRange - leftRange + 1;

        // cout << "Node " << node << " l:" << leftRange << " r:" << rightRange << " len:" << rangeLen << " realDepth:" << depth << " onEdge:" << onEdge << "  -> ";  
       /* if (onEdge != '#' && s[depth - 1] != onEdge) {
            cout << endl;
            return;
        }*/
        for (int i = depth; i < depth + rangeLen; ++i) {
            if (i >= s.size()) break;
            if (s[i] != a[i - depth + leftRange]) {
                // cout << endl;
                return;
            }
        }

        // for (int i = depth; i < depth + rangeLen; ++i) {
        //     if (i < s.size() && s[i] != a[i - depth + leftRange]) {
        //         // cout << a[i - depth + leftRange];
        //     }
        // }

        // cout << endl;

        for (int i = 0; i < 28; i++) {
            if (t[node][i] != -1) {
                isLeaf = false;
                int poz = rightRange;
                int nextDepth = depth + rangeLen;
                dfs(t[node][i], nextDepth, 'a' + i);
            }
        }
        
        if (isLeaf && depth >= s.size()) {
            int len = depth + rangeLen;
            occurances.push_back(a.size() - len);
            leafNodes++;
        }
    };

    dfs(0, 0, '#');
    return occurances;
}

void printTree(int node = 0, int depth = 0) {
    // Print the current node
    for (int i = 0; i < depth; i++) cout << "  "; // Indentation
    cout << "Node " << node << " (";
    if (l[node] == -1 && r[node] == -1) {
        cout << "root";
    } else {
        cout << "'" << a.substr(l[node], r[node] - l[node] + 1) << "'";
    }
    cout << ") [" << l[node] << ", " << r[node] << "]";
    
    if (s[node] != -1) {
        cout << " Suffix link -> " << s[node];
    }
    cout << endl;

    // Print transitions
    for (int i = 0; i < 28; i++) {
        if (t[node][i] != -1) {
            for (int j = 0; j < depth + 1; j++) cout << "  ";
            cout << "-> " << (char)('a' + i) << " -> Node " << t[node][i] << endl;
            printTree(t[node][i], depth + 1);
        }
    }
}

void printTreeStats() {
    int totalNodes = 0;
    int maxDepth = 0;
    int leafNodes = 0;

    function<void(int,int)> dfs = [&](int node, int depth) {
        totalNodes++;
        maxDepth = max(maxDepth, depth);
        bool isLeaf = true;
        
        for (int i = 0; i < 28; i++) {
            if (t[node][i] != -1) {
                isLeaf = false;
                dfs(t[node][i], depth + 1);
            }
        }
        
        if (isLeaf) leafNodes++;
    };

    dfs(0, 0);

    cout << "Tree Statistics:" << endl;
    cout << "Total Nodes: " << totalNodes << endl;
    cout << "Leaf Nodes: " << leafNodes << endl;
    cout << "Max Depth: " << maxDepth << endl;
}

int main() {
    // Read content of file "test.txt" to a:
    freopen("test.txt", "r", stdin);
    string line;
    while (getline(cin, line)) {
        a += line;
    }

    // make everything in a lowercase
    transform(a.begin(), a.end(), a.begin(), ::tolower);

    auto startTime = chrono::high_resolution_clock::now();
    build();
    auto endTime = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(endTime - startTime).count();
    cout << "Time: " << duration << "ms" << endl;

    printTreeStats();  // Print statistics about the tree
    cout << "\nTree Structure:\n";
    // printTree();  // Print the detailed tree structure

    auto startTiemSearch = chrono::high_resolution_clock::now();
    auto res = findSubstring("an");
    auto endTimeSearch = chrono::high_resolution_clock::now();
    cout << "Time to search " << chrono::duration_cast<chrono::milliseconds>(endTimeSearch - startTiemSearch).count() << "ms" << endl;

    auto startTimeRecursive = chrono::high_resolution_clock::now();
    auto res2 = findSubstringRecursive("a");
    auto endTimeRecursive = chrono::high_resolution_clock::now();
    cout << "Time to search recursively " << chrono::duration_cast<chrono::milliseconds>(endTimeRecursive - startTimeRecursive).count() << "ms" << endl;

    // cout << "\iterative: ";
    // for (int i : res) {
    //     cout << i << " " << a.substr(i, 5) << " ";
    // }
    // cout << endl;

    // cout << "\nrecursive: ";
    // for (int i : res2) {
    //     cout << i << " " << a.substr(i, 5) << " ";
    // }
    // cout << endl;

    return 0;
}

// int main() {
//     a = "banana{hanno|";
//     build();

//     cout << a << endl;

//     auto res = findSubstring("an");
//     cout << "\nIndexes of 'an' in the string: ";
//     for (int i : res) cout << i << " ";
//     cout << endl;

//     return 0;
// }