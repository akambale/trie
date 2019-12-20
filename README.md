# Trie Demo

tl;dr - I briefly looked up what a trie was, and upon a reading one sentence, I decided to implement one without referencing any documentation or reading best practices. I hope to demonstrate my ability to handle ambiguously in software engineering challenges.

See a live implementation of this trie search linked [here](www.google.com).

## Some companies are bad at front-end interviewing

Specifically, companies who decide to quiz their candidates on CSS and JavaScript trivia on an onsite interview (at least in my opinion; if you are a company considering interviewing me and you do these types of interviews, don't take my criticism personally haha. I'll still do your interview).

I understand the purpose of this, it's a good way to gauge a candidates front-end experience and the speed in which they can build UIs. If you are an agency like Triplebyte where you need to initially screen candidates by skill, that makes perfect sense. But if you are a company following the regular interview process, you can accomplish this by just reading a resume and asking them questions about their previous work during a phone screen. Furthermore, it doesn't account for the fact that every candidate has developed different competencies based on the problems they've had to solve in their work.

A few months ago, in an interview, I was asked the following question:

**Interviewer:** "Imagine you are building Google's search page. How do you update search results when the user changes their input?"
**Me:** "Make another request with the new search string"
**Interviewer:** "But that's pretty slow, how do we show the user feedback right away?"
**Me:** _shrugs_
**Interviewer:** "Well, we can save an extra amount of potential search data from the first query. For example, if the user input start with the letter a, we can send all search phrases to the client that start with the letter a."
**Me:** "Oh that makes sense, then as they update the search input, we can further filter from our previously fetched search phrases"

I was annoyed by the question. My first and second engineering jobs were at data companies where the most critical thing was manipulating and displaying data. I never needed to build a search functionality where performance was critical to the UX. Besides, if I had built Google's search page, I wouldn't be here interviewing at your company, I’d be drinking moon juice with President Jonathan Taylor Thomas.

![mulaney](https://i.pinimg.com/474x/37/43/bb/3743bbc726d51a170c03e89cf0ac7f11.jpg)

## What the heck is a trie?

I was reading over a guide to preparing for coding interviews and the author mentioned a "trie." I thought this person was rather bad at spelling, but just to be sure, I web-searched the phrase and found the following definition:

_A trie is a tree-like data structure whose nodes store the letters of an alphabet. By structuring the nodes in a particular way, words and strings can be retrieved from the structure by traversing down a branch path of the tree._

A light bulb went off; this is the answer my previous interviewer was fishing for! Of course I would have said to use a trie if I had known about this data structure. If the companies I interview with continue to interview me in the form of pop-quiz, I'll be doomed in my job search.

After lamenting this frustration to an engineer with more interviewing experience, he reminded me that there is an impossible number of things you can try to study up on for interviews. When you don't know an answer during an interview, the best thing to do is talk about how you would handle this situation on a job.

Inspired by this, I figured I'd try to build a trie demo from scratch. To add some additional ambiguity and challenge, I thought to try this without knowing any more about tries aside from the one web-search I had done above.

## Tackling The Challenge

I was a bit surprised that it took me a few hours to get the trie class working. I had the basic structure outlined quickly. See below:

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

Writing the constructor function and addChild function proved to be tricker than expected. I am good at thinking recursively, but the number of child nodes a trie generates is gratuitous. Once I solved for that, and handled the edge case of initializing the original parent node with an empty value, the code was good to go! See it in `trie.js`. Here is an example of the trie with a few simple inputs:

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

To truly demo the trie, I needed to create a search suggestion function; a method that would take your partial search string and suggest possible words you may be trying to type out. I arrived at a simple recursive one `oldSearchMethod` as seen in`trie.js`. It returns 10 search results before terminating. It picks those 10 results by going down all the child branches of the corresponding search string node. If there are more than 10 results, it chooses 10 from the first child branch that was created; i.e., it depends on which child key comes in order first. If _car_ was inserted into the trie before _cat_, then **r** will appear in order before **t** as a child branch and therefore, searching the string "ca" will return results for "car, care, career, careers".

But since we are implementing a dictionary search, random search results won't cut it. Because the trie only has a maximum depth of 19 nodes, I was confident that the recursive search method would terminate quickly, even if we found 10,000 search results. I then sorted the results first by length, and then by alphabetical order. Now, searching "ca" will return results like "can, cap, car, cat, cant, cart, cast." See this method `findTenValidChildWords` in `trie.js`.

Check out a live implementation of this trie search linked [here](www.google.com). You can load the 10K most common words in the english language according to google [(shamelessly stolen from this repo)](https://github.com/first20hours/google-10000-english) into a trie and try searching it. Or, create your own trie in the console!
