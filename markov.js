/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.wordsChain = this.makeChains(words)
  }

  /** set markov chains:
   *
   *  for text of "the cat hat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    // Consider moving out the last word if conditions or figure out the logic behind 
    let wordsChain = {};
    for (let i = 0; i < words.length; i++) {
      
      if (wordsChain[words[i]] === undefined) {
        wordsChain[words[i]] = [words[i + 1] || null]
      }
      else {
        wordsChain[words[i]].push(words[i + 1] || null)
      }
    }
    return wordsChain
  }


  /** return random text from chains 
   * 
   * { the: [ 'cat', 'hat' ], cat: [ 'in' ], in: [ 'the' ], hat: [ null ] }
  */

  getText(numWords = 100) {

    let markovText = "";
    let currWord = Object.keys(this.wordsChain)[0]

    while (numWords > 0) {
      markovText += currWord + " "
      let randomIndex = Math.floor(Math.random() * this.wordsChain[currWord].length)
      let nextWord = this.wordsChain[currWord][randomIndex]

      if (nextWord === null) {
        break;
      } else {
        currWord = nextWord
      }
      numWords--;
    }
    return markovText.trim()
  }
}

// write a function that will return a random item from an array.

module.exports = {
  MarkovMachine
}