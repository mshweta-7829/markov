/** Command-line tool to generate Markov text. */

const fsP = require('fs/promises');
const { MarkovMachine } = require('./markov.js');
const { default: Axios } = require('axios');

// class Contents {
//     constructor(type) {
//         this.type = type;
//     }
//     async getContents(path) {
//         try {
//             let contents;
//             if (this.type === "file") {
//                 contents = await fsP.readFile(path, "utf8");
//             } else if (this.type === "url") {
//                 contents = await Axios({ "url": path });
//             }
//             console.log("file contents", contents);
//             return contents;
//         } catch (err) {
//             console.error(`${path} not found: ${err}`);
//             process.exit(1); // Why is this 1? all the time?
//         }
//     }
// }

async function getContents(type, path) {
	try {
		let contents;
		if (type === "file") {
			contents = await fsP.readFile(path, "utf8");
		} else if (type === "url") {
			contents = await Axios({ "url": path });
		}
		console.log("file contents", contents);
		return contents;
	} catch (err) {
		console.error(`${path} not found: ${err}`);
		process.exit(1); // Why is this 1? all the time?
	}
}

async function generateText() {
	let mm = new MarkovMachine(getContents(process.argv[2], process.argv[3]));
	mm.getText();
}

generateText();