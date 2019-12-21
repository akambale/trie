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
const info = document.getElementById('info');
const instructions = document.getElementById('instructions');
const about = document.getElementById('about');
const triangle = document.getElementById('triangle');

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
  toggleStartButtons();

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
  toggleStartButtons();
};

const toggleStartButtons = () => {
  const startButtons = document.getElementsByClassName('btn-start');
  const changeTo = !startButtons[0].disabled;

  for (let i = 0; i < startButtons.length; i++) {
    startButtons[i].disabled = changeTo;
  }
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

      const div = document.createElement('DIV');
      div.classList.add('search-results__underline');
      searchBox.insertBefore(div, searchBox.firstChild);

      const newBtnContainer = btnContainer.cloneNode(['deep']);
      newBtnContainer.id = 'btn-container--new';
      newBtnContainer.style.display = 'flex';
      newBtnContainer.style['justify-content'] = 'center';
      searchBox.appendChild(newBtnContainer);
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

const toggleInstructions = () => {
  info.style.height = '120px';
  if (about.style.display !== 'flex' || info.style.display !== 'flex') {
    toggleInfo();
  }

  instructions.style.display = 'grid';
  triangle.style.transform = 'translate(98px, -11px)';
  about.style.display = 'none';
};

const toggleAbout = () => {
  info.style.height = '222px';
  if (instructions.style.display !== 'grid' || info.style.display !== 'flex') {
    toggleInfo();
  }

  triangle.style.transform = 'translate(19px, -11px)';
  about.style.display = 'flex';
  instructions.style.display = 'none';
};

console.log(
  'psst, check out the source code at https://github.com/akambale/trie',
);
