import SHA256 from "crypto-js/sha256";

class Block {
  hash: string;

  constructor(
    public index: number,
    public timestamp: Date,
    public data: any,
    public previousHash = ""
  ) {
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
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
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
coin.addBlock(new Block(1, new Date(), { amount: 5 }));
coin.addBlock(new Block(2, new Date(), { amount: 15 }));

console.log("Result = ", JSON.stringify(coin, null, 4));
console.log("Is blockchain valid? " + coin.isChainValid());

// try to temper changing data
coin.chain[1].data = { amount: 100 };
console.log("Is blockchain valid after temper 1? " + coin.isChainValid());

// try to temper recalculing hash
coin.chain[1].hash = coin.chain[1].calculateHash();
console.log("Is blockchain valid after temper 2? " + coin.isChainValid());
