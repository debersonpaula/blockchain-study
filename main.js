const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toUTCString(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const coin = new Blockchain();
coin.addBlock(new Block(1, new Date().toUTCString(), { amount: 5 }));
coin.addBlock(new Block(2, new Date().toUTCString(), { amount: 15 }));

console.log("Result = ", JSON.stringify(coin, null, 4));
console.log("Is blockchain valid? " + coin.isChainValid());

// try to temper changing data
coin.chain[1].data = { amount: 100 };
console.log("Is blockchain valid after temper 1? " + coin.isChainValid());

// try to temper recalculing hash
coin.chain[1].hash = coin.chain[1].calculateHash();
console.log("Is blockchain valid after temper 2? " + coin.isChainValid());
