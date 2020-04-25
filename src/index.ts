import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;
  
  // static : class 로 instance 생성하지 않고도 호출 가능
  static calculateBlockChain = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string => 
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  constructor(  
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
    ){
      this.index =  index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
    }
}

Block.calculateBlockChain

const genesisBlock: Block = new Block(0, "23456", "", "hello", 12345);

let blockChain : [Block] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length -1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockChain(newIndex, previousBlock.hash, newTimeStamp, data);
  
  const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
  return newBlock;
}

console.log(createNewBlock("hello"));

export {};
