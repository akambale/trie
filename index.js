// Variables and methods to modify user feedback as
// trie is being populated

window.highestTrieDepth = 0;
window.wordCount = 0;
window.nodeCount = 0;

const updateTrieDepth = () => {
  document.getElementById('total__depth').innerHTML = window.highestTrieDepth;
};

const updateWordCount = () => {
  window.wordCount++;
  document.getElementById('total__words').innerHTML = window.wordCount;
};

const updateNodeCount = () => {
  window.nodeCount++;
  document.getElementById('total__nodes').innerHTML = window.nodeCount;
};

// puts dictionary arr into trie
const populateTree = () => {
  document.getElementById('btn').disabled = 'true';

  window.trie = new TrieNode('the');
  // the much faster way to populate the trie
  // window.dictionary.forEach(word => trie.addChild(word));

  // slowing down trie population for dramatic effect in UX
  let word = '';
  interval = setInterval(() => {
    if (window.wordCount >= window.dictionary.length - 1) {
      clearInterval(interval);
    }

    word = dictionary[window.wordCount];
    trie.addChild(word);
  }, 0.000001);
};

// input box search method
const search = () => {
  clearSearch();

  const searchBox = document.getElementById('search-box');
  const val = document.getElementById('input').value;

  if (val.length === 0) {
    clearSearch();
  } else {
    const words = findTenValidChildWords(val, window.trie);

    words.forEach(word => {
      const node = createLiTextNode(word);
      searchBox.appendChild(node);
    });
  }
};

// helper function for search method
const createLiTextNode = str => {
  const node = document.createElement('LI');
  const textNode = document.createTextNode(str);
  node.appendChild(textNode);
  attachOnClick(node);
  return node;
};

// clear search results for previous user input
const clearSearch = () => {
  const searchBox = document.getElementById('search-box');
  while (searchBox.firstChild) {
    searchBox.removeChild(searchBox.firstChild);
  }
};

// adds an onclick method to each search list item
const attachOnClick = node => {
  const str = node.innerText;
  node.onclick = () => {
    const input = document.getElementById('input');
    input.value = str;
    input.oninput();
  };
};

document.getElementById('form').addEventListener(
  'submit',
  function(e) {
    search(document.getElementById('input'));
    e.preventDefault();
  },
  false,
);

console.log(`
If you want to try adding words manually, initialize a new tree by entering the following in the console:

window.trie = new TrieNode('');

Then, add additional words with the following code:

window.trie.addChild('YOUR_WORD_HERE');
`);
