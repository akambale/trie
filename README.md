# Trie Demo

tl;dr - I briefly researched what a trie was, and decided to implement one without referencing any documentation or reading best practices. I intend to demonstrate my ability to handle ambiguity in software engineering challenges. I also created a UI and live demo for this project based on Google's homepage, hopefully demonstrating my ability to follow a wireframe.

See the project in action [here](https://akambale.github.io/trie/).

## Some companies are bad at front-end interviewing

Specifically, companies who decide to quiz their candidates with CSS and JavaScript trivia during an onsite interview. Disclaimer: this is my opinion; if you are a company considering interviewing me and you do these types of interviews, don't take my criticism personally 😉. I'll still do your interview.

I understand the purpose of this, it's a good way to gauge a candidate's front-end experience and the speed in which they can build UIs. If you are a blind recruiting agency like Triplebyte who only screens candidates by skill, that makes perfect sense for the initial interview. But if you are a company following the regular interview process, you can accomplish this by just reading a candidate's resume and asking them questions about their work during a phone screen. You'll probably learn more about their skills rather than if they know a dozen ways to center a div or if they've memorized the difference between `.call()` and `.apply()`. Furthermore, it doesn't account for the fact that every candidate has developed different competencies based on the problems they have solved in their work.

A few months ago during an onsite interview, I was asked the following question:

**Interviewer:** "Imagine you are building Google's search page. How do you update search results when the user changes their input?"

**Me:** "Make another request to the server with the new search string"

**Interviewer:** "But that's pretty slow, how do we show the user feedback right away?"

**Me:** _shrugs_

**Interviewer:** "Well, we can save an extra amount of potential search data from the first query. For example, if the user input starts with the letter a, we can send all search phrases to the client that start with the letter a."

**Me:** "Oh that makes sense, then as they update the search input, we can further filter from our previously fetched search phrases"

I was annoyed by the question. All my professional engineering work has been at companies where most tasks were around manipulating and displaying data. I never needed to build a search functionality where performance was critical to the UX. Besides, if I had built Google's search page, I wouldn't be here interviewing at your company, I’d be drinking moon juice with President Jonathan Taylor Thomas.

![mulaney](https://i.pinimg.com/474x/37/43/bb/3743bbc726d51a170c03e89cf0ac7f11.jpg)

## What the heck is a trie?

A week later, I was reading over a guide to preparing for coding interviews and the author mentioned a "trie." I figured this person is rather bad at spelling, but just to be sure, I web-searched the phrase and found the following definition:

_A trie is a tree-like data structure whose nodes store the letters of an alphabet. By structuring the nodes in a particular way, words and strings can be retrieved from the structure by traversing down a branch path of the tree._

A light bulb went off; this is the answer my previous interviewer was fishing for! Of course I would have said to use a trie if I had known about this data structure. If the companies I interview with continue to interview me in the form of pop-quiz, I'll be doomed in my job search.

After lamenting this frustration to an engineer with more interviewing experience, he reminded me that there is an impossible number of things you can try to study up on for interviews. When you don't know an answer during an interview, the best thing to do is talk about how you would handle this situation on a job.

Inspired by this, I figured I'd try to build a trie demo from scratch. To add some additional ambiguity and challenge, I thought to try this without knowing any more about tries aside from the one web-search I had done above.

## Constructing The Trie

This was pretty easy; especially in JavaScript where you can use regular objects as a simplified hash-table. I quickly came up with the following structure to represent each trie node.

```
TrieNode {
    this.value
    this.isWord
    this.addChild = function(){
      this[nextLetter] = new TrieNode()
    }

    this.a = TrieNode {}
    this.b = TrieNode {}
    this.c = TrieNode {}
    ...
}
```

Outlining this basic structure took about 30 minutes. The only challenge that remained was handling the edge case of creating the first node with an empty string value. That took about 3 hours . . . but regardless, it was done and now fully functional! See the full code in `trie.js`. Here is an example of the trie with a few simple inputs:

Input of "an"

```
{
  val: "",
  isWord: false,
  a: {
    val: "a",
    isWord: false,
    n: {
      val: "an",
      isWord: true
    }
  }
}
```

And the same tree after adding an input of "a" as well as "and"

```
{
  val: "",
  isWord: false,
  a: {
    val: "a",
    isWord: true,
    n: {
      val: "an",
      isWord: true
        d: {
          val: "and",
          isWord: true
        }
    }
  }
}
```

## Searching

To truly demo the trie, I needed to create a search suggestion function; a method that would take your partial search string and suggest possible words you may be trying to type out. I wrote the method `trieLogSearch` as seen in`search.js`. It finds the node in the trie which matches the search input and then recurses down all the child nodes finding valid words as search results.

To contrast, I also wrote `linearSearch` found in `search.js`. This method loops through the dictionary array and determines if the partial search strings match the first few characters of that word. If so, it adds it to the search results.

When the user searches, they'll receive search results from `trieLogSearch`. But both search methods are invoked sequentially and their performance is compared and displayed at the bottom of the results. Here, it is very easy to visualize the benefits of an algorithm with logarithmic time.

## The UI

Since this project was inspired by trying to imitate the live search on the Google home page, I thought I'd copy the style of the logo and search bar. But what was supposed to be a simple UI demo the project turned into a full Google homepage clone. If the scope of the project had always been as large, I would have opted to use SCSS and perhaps even React.

But since I started with Vanilla JS, CSS, and HTML, I stuck with and built the website like it was 2008! It was a fun exercise in raw DOM manipulation and a reminder of how the core APIs work. The cons of this method is that the code organization tends to get a bit messy. I did my best to follow BEM for CSS and try to name my JS methods intuitively. The project is just small enough that you can still follow the code.

Check out a live implementation of this trie search linked [here](https://akambale.github.io/trie/). You can load the 10K most common words in the English language according to google [(shamelessly stolen from this repo)](https://github.com/first20hours/google-10000-english) into a trie and try searching it. Or, add words to the trie yourself in the console.
