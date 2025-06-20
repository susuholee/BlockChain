"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
// 컨트롤 + . 프로퍼티 자동완성
const genesisHeader = {
    version: "1.0.0",
    height: 0,
    timestamp: 1231006505000,
    previousHash: "0".repeat(64),
    merkleRoot: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
    difficulty: 1,
    nonce: 2083236893
};
const genesisBody = {
    data: ["The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"]
};
// genesisBlock은 하드코딩
const genesisBlock = new core_1.Block(genesisHeader, genesisBody);
console.log(genesisBlock);
