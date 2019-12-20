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

// initialize trie
window.trie = new TrieNode('');
