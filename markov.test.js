const { MarkovMachine } = require("./markov");

describe("Tests the MarkovMachine class and its methods.", function () {
	let mm;

	beforeAll(function () {
		mm = new MarkovMachine("the cat in the hat");
	});

	test("Words chain is generated correctly.", function () {

		expect(mm.wordsChain)
			.toEqual({ "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null] });
	});

	test("Make sure the returned value from getText is a string.", function () {
		expect(mm.getText()).toEqual(expect.any(String));
	})

	test("Resulting text ends with hat no matter what.", function () {
		expect(mm.getText().endsWith("hat")).toEqual(true);
	});

	test("Each following word exists in the previous words value array of the chain.", function () {
		let markovChain = mm.wordsChain;
		let markovText = mm.getText();
		let markovWords = markovText.split(" ");
		for (let i = 1; i < markovWords.length; i++) {
			expect(markovChain[markovWords[i - 1]].includes(markovWords[i])).toEqual(true);
		}
	})
});

describe("Tests the wordsChain when the last word appears elsewhere in the string", function() {
	let mm = new MarkovMachine("the cat hat in the hat");

	test("Words chain is generated correctly.", function ()  {
		expect(mm.wordsChain)
			.toEqual({"the": ["cat", "hat"], "cat":["hat"], "hat":["in", null], "in":["the"]});
	})
})



//Check to make sure that the end word of the resulting string is hat.
// Check to make sure that each word in the resulting string is in its respective key in the wordsChain

