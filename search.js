// original search method which returned
// search results randomly
const oldSearchMethod = (str, trie) => {
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

    if (trie.isWord === true) {
      storage.push({ val: trie.val, depth: trie.depth });
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
  storage.sort(alphaSearch);
  const valArr = [];
  if (storage.length > 0) {
    const loopLength = storage.length < 10 ? storage.length : 10;
    for (let i = 0; i < loopLength; i++) {
      valArr.push(storage[i].val);
    }
  }
  storage = [];
  return valArr;
};

// alpha search first sorts by length
// and then if lengths are the same,
// it then sorts alphabetically
const alphaSearch = (a, b) => {
  if (a.depth < b.depth) {
    return -1;
  } else if (a.depth === b.depth) {
    if (a.val < b.val) {
      return -1;
    } else {
      return 1;
    }
  } else {
    return 1;
  }
};
