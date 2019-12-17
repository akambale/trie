class TrieNode {
  constructor(word, val, depth) {
    word = word.toLowerCase();

    // on trie init
    if (!val) {
      this.val = '';
      this.depth = 1;
    } else {
      this.val = val;
      this.depth = depth;
    }

    if (this.val === '') {
      // case for when first initalizing the tree
      this.isWord = false;
    } else if (this.val === word && !this.isWord) {
      this.isWord = true;
      updateWordCount();
    } else {
      this.isWord = false;
      this.addChild(word);
    }

    // this code is just for the UI, it's not relevant
    // to the function or structure of the tree
    updateNodeCount();
    if (this.depth > window.highestTrieDepth) {
      window.highestTrieDepth = this.depth;
      updateTrieDepth();
    }
  }

  addChild(word) {
    // ensure all inputs are lowercase
    word = word.toLowerCase();
    let parentVal = this.val;
    const [nextLetter, nextVal] = extract(word, parentVal);
    if (!nextLetter && !this.isWord) {
      this.isWord = true;
      updateWordCount();
    } else if (!nextLetter) {
      this.isWord = true;
    } else if (this[nextLetter]) {
      this[nextLetter].addChild(word);
    } else {
      const nextDepth = this.depth + 1;
      this[nextLetter] = new TrieNode(word, nextVal, nextDepth);
    }
  }
}

// helper function for trie
const extract = (word, parentVal) => {
  let nextLetter, nextVal;
  if (parentVal === '') {
    nextLetter = word[0];
    nextVal = nextLetter;
  } else {
    const wordSecondHalf = word.slice(parentVal.length);
    nextLetter = wordSecondHalf[0];
    nextVal = word.slice(0, parentVal.length + 1);
  }

  return [nextLetter, nextVal];
};

// method to search trie for valid children words
// based on user input
const findTenValidChildWords = (str, trie) => {
  let storage = [];

  const findValidChildren = (str, trie) => {
    if (str.length > 0) {
      if (!trie[str[0]]) {
        return;
      }
      findValidChildren(str.slice(1), trie[str[0]]);
      return;
    }

    // we only want to provide 10 search result suggestions
    // once we have reached that point, we stop our recursive
    // search
    if (storage.length >= 10) {
      return;
    }

    if (trie.isWord === true) {
      storage.push(trie.val);
    }

    for (let key in trie) {
      // ignoring object properties like isWord, val
      if (key.length === 1) {
        findValidChildren(str, trie[key]);
      }
    }
  };

  findValidChildren(str, trie);

  // search time is O(log n), very quick
  // so we don't have to worry about async
  const copy = storage.slice();
  storage = [];
  return copy;
};

// initialize trie
window.trie = new TrieNode('');
