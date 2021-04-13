import { Block } from "./Block";
import { Blockchain } from "./Blockchain";

const coin = new Blockchain();

console.log("Mining block 1:");
coin.addBlock(new Block(1, new Date(), { amount: 5 }));

console.log("Mining block 2:");
coin.addBlock(new Block(2, new Date(), { amount: 15 }));

console.log("Result = ", JSON.stringify(coin, null, 4));
console.log("Is blockchain valid? " + coin.isChainValid());

// try to temper changing data
coin.chain[1].data = { amount: 100 };
console.log("Is blockchain valid after temper 1? " + coin.isChainValid());

// try to temper recalculing hash
coin.chain[1].hash = coin.chain[1].calculateHash();
console.log("Is blockchain valid after temper 2? " + coin.isChainValid());
