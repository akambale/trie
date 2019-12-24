// Elements that are selected and used repeatedly

const depthEle = document.getElementById('total__depth');
const wordEle = document.getElementById('total__words');
const nodeEle = document.getElementById('total__nodes');
const searchBox = document.getElementById('search__results');
const searchList = document.getElementById('search__results__list');
const input = document.getElementById('input');
const svg = document.getElementsByTagName('svg')[0];
const btnContainer = document.getElementById('search__btn-container');
const info = document.getElementById('info');
const instructions = document.getElementById('instructions');
const about = document.getElementById('about');
const triangle = document.getElementById('triangle');
const metrics = document.getElementById('search__metrics');

// Variables and methods to modify user feedback as
// trie is being populated

window.highestTrieDepth = 0;
window.wordCount = 0;
window.nodeCount = 0;

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
  togglePopulateButtons();

  // the much faster way to populate the trie which takes about 1.6 seconds
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
  togglePopulateButtons();
};

// enable and disable populate trie buttons
const togglePopulateButtons = () => {
  const populateButtons = document.getElementsByClassName('btn-populate');
  const changeTo = !populateButtons[0].disabled;

  for (let i = 0; i < populateButtons.length; i++) {
    populateButtons[i].disabled = changeTo;
  }
};

// input box search method
const search = () => {
  clearSearch();

  const val = input.value.toLowerCase();

  if (val.length !== 0) {
    const t0 = performance.now();
    const words = trieLogSearch(val, window.trie);
    const t1 = performance.now();
    linearSearch(val, window.dictionary);
    const t2 = performance.now();

    // if there are any search results
    if (words.length > 0) {
      const tenWords = pullFirstTenVals(words);
      btnContainer.style.display = 'none';
      searchBox.style.display = '';

      tenWords.forEach(word => {
        const node = createLiTextNode(word, val);
        searchList.appendChild(node);
      });

      const logTime = Math.round((t1 - t0) * 100) / 100;
      const linTime = Math.round((t2 - t1) * 100) / 100;
      const multiplier = Math.round(((t2 - t1) / (t1 - t0)) * 100) / 100;
      metrics.innerHTML = `Trie Search: ${logTime}ms &nbsp; Linear Search: ${linTime}ms &nbsp; ${multiplier}x faster`;
    }
  }
};

// clear search results for previous user input
// hides and shows search box and btn container
const clearSearch = () => {
  while (searchList.firstChild) {
    searchList.removeChild(searchList.firstChild);
  }
  btnContainer.style.display = '';
  searchBox.style.display = 'none';
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

// adds an onclick method to each search list item
const attachOnClick = (node, word) => {
  node.onclick = () => {
    input.value = word;
    input.oninput();
  };
};

// shows and hides the info section at the top
// adjusts height to show the instructions or
// about content
const toggleInfo = () => {
  const infoIsVisible = info.style.display;
  info.style.height = '0px';
  if (infoIsVisible === 'flex') {
    setTimeout(() => (info.style.display = 'none'), 601);
  } else {
    info.style.display = 'flex';
    setTimeout(() => {
      let height;
      if (about.style.display === 'none') {
        height = '120px';
      } else {
        height = '222px';
      }
      info.style.height = height;
    }, 10);
  }
};

// displays instructions and open/closes info section
const toggleInstructions = () => {
  info.style.height = '120px';
  if (about.style.display !== 'flex' || info.style.display !== 'flex') {
    toggleInfo();
  }

  instructions.style.display = 'grid';
  triangle.style.transform = 'translate(98px, -11px)';
  about.style.display = 'none';
};

// displays instructions and open/closes about section
const toggleAbout = () => {
  info.style.height = '222px';
  if (instructions.style.display !== 'grid' || info.style.display !== 'flex') {
    toggleInfo();
  }

  triangle.style.transform = 'translate(19px, -11px)';
  about.style.display = 'flex';
  instructions.style.display = 'none';
};

document.getElementById('form').addEventListener(
  'submit',
  e => {
    search(input);
    e.preventDefault();
  },
  false,
);
