import SHA256 from "crypto-js/sha256";

export class Block {
  hash: string;
  nonce: number = 0;

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
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }

  // for proof of work
  mineBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: ", this.hash);
  }
}
