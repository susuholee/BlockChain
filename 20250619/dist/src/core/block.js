"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const utill_1 = require("../utill");
const block_hash_1 = require("../utill/block_hash");
const block_target_1 = require("../utill/block_target");
class Block {
    constructor(headers, body) {
        this.version = headers.version;
        this.height = headers.timestamp;
        this.previousHash = headers.previousHash;
        this.timestamp = headers.timestamp;
        this.difficulty = headers.difficulty;
        this.data = body.data;
        this.nonce = 0;
        this.setMerkleRoot(body);
        this.setHash();
    }
    // private 외부에서 이 클래스로 만든 인스턴스에서 호출을 할수가 없다.
    setMerkleRoot(body) {
        // 머클루트의 기능 utill에 빼놓자.
        this.merkleRoot = (0, utill_1.createMarkleRoot)(body);
    }
    // 본인 인스턴스의 해시를 만들때
    // 마이닝
    setHash() {
        // 해시를 만드는 기능을 utill
        // 목표값 : 블록의 생성권한을 얻는 목표값
        // 목표값보다 작은 유효한 해시값을 구하는것
        const target = (0, block_target_1.createBlcokTarget)(this.difficulty);
        // 블록 생성
        const createHashDto = {
            version: this.version,
            heigth: this.height,
            timestamp: this.timestamp,
            previousHash: this.previousHash,
            difficulty: this.difficulty,
            merkleRoot: this.merkleRoot,
            nonce: this.nonce
        };
        while (true) {
            // 블록 해시 생성
            const currentHash = (0, block_hash_1.createBlcokHash)(createHashDto);
            this.nonce++;
            if (BigInt("0x " + currentHash) <= BigInt(target))
                break;
        }
    }
}
exports.Block = Block;
