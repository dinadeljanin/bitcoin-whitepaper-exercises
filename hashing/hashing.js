"use strict";

const CryptoJS = require("crypto-js");

const poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

let Blockchain = {
	blocks: [],
};

// Genesis Block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.",
	timestamp: Date.now(),
});

const createBlock = (data) => {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length-1].hash,
		data: data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block)
	return block
}

const blockHash = (block) => {
	return CryptoJS.SHA256(JSON.stringify(block)).toString(CryptoJS.enc.hex)
}

const verifyBlock = (block) => {
	switch(true) {
		case block.data === null:
		case block.prevHash === null:
		case typeof block.index === "number" && block.index < 0:
		case Blockchain.blocks[0].hash !== "000000":
		case block.index !== 0 && block.hash !== blockHash(block): return false
		default: return true
	}
}

const verifyChain = (blockchain) => {
	let prevHash
	for (let block of blockchain.blocks) {
		if (prevHash && prevHash !== block.prevHash) return false
		prevHash = block.hash
		return verifyBlock(block)
	}
}

for (let line of poem) {
	Blockchain.blocks.push(createBlock(line))
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);
