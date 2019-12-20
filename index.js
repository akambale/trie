// Variables and methods to modify user feedback as
// trie is being populated

window.highestTrieDepth = 0;
window.wordCount = 0;
window.nodeCount = 0;

const depthEle = document.getElementById('total__depth');
const wordEle = document.getElementById('total__words');
const nodeEle = document.getElementById('total__nodes');
const searchBox = document.getElementById('search-box');
const input = document.getElementById('input');
const svg = document.getElementsByTagName('svg')[0];
const btnContainer = document.getElementById('btn-container');

const startButtons = document.getElementsByClassName('btn-start');

const updateTrieDepth = () => {
  depthEle.innerHTML = window.highestTrieDepth;
};

const updateWordCount = () => {
  window.wordCount++;
  wordEle.innerHTML = window.wordCount;
};

const updateNodeCount = () => {
  window.nodeCount++;
  nodeEle.innerHTML = window.nodeCount;
};

// puts dictionary arr into trie
const populateTrie = () => {
  startButtons[0].disabled = true;
  startButtons[1].disabled = true;

  // the much faster way to populate the trie
  // window.dictionary.forEach(word => trie.addChild(word));

  // slowing down trie population for dramatic effect in UX
  let word = '';
  window.interval = setInterval(() => {
    if (window.wordCount >= window.dictionary.length - 1) {
      clearInterval(window.interval);
    }

    word = dictionary[window.wordCount];
    trie.addChild(word);
  }, 0.000001);
};

const resetTrie = () => {
  clearInterval(window.interval);
  depthEle.innerHTML = wordEle.innerHTML = nodeEle.innerHTML = '0';
  window.highestTrieDepth = window.wordCount = window.nodeCount = 0;
  window.trie = new TrieNode('');
  startButtons[0].disabled = false;
  startButtons[1].disabled = false;
};

// input box search method
const search = () => {
  clearSearch();

  const val = input.value.toLowerCase();

  if (val.length === 0) {
    clearSearch();
    btnContainer.style.display = '';
  } else {
    const words = findTenValidChildWords(val, window.trie);

    words.forEach(word => {
      const node = createLiTextNode(word, val);
      searchBox.appendChild(node);
    });
    if (words.length > 0) {
      btnContainer.style.display = 'none';
    } else {
      btnContainer.style.display = '';
    }
  }
};

// helper function for search method
const createLiTextNode = (word, searchStr) => {
  const firstHalf = word.slice(searchStr.length);

  const node = document.createElement('LI');
  const svgClone = svg.cloneNode(true);
  node.appendChild(svgClone);
  const textNode = document.createTextNode(searchStr);
  node.appendChild(textNode);
  const boldTextNode = createBTextNode(firstHalf);
  node.appendChild(boldTextNode);
  attachOnClick(node, word);
  return node;
};

const createBTextNode = str => {
  const node = document.createElement('B');
  const textNode = document.createTextNode(str);
  node.appendChild(textNode);
  return node;
};

const splitWord = (searchStr, fullWord) => {
  const first = fullWord.slice(searchStr.length);
  const second = searchStr;
  return [first, second];
};

// clear search results for previous user input
const clearSearch = () => {
  while (searchBox.firstChild) {
    searchBox.removeChild(searchBox.firstChild);
  }
};

// adds an onclick method to each search list item
const attachOnClick = (node, word) => {
  node.onclick = () => {
    input.value = word;
    input.oninput();
  };
};

document.getElementById('form').addEventListener(
  'submit',
  e => {
    search(input);
    e.preventDefault();
  },
  false,
);

console.log(
  'psst, check out the source code at https://github.com/akambale/trie',
);
