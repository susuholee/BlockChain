import { BlockBody } from "../interface/block_body";
import { createMarkleRoot } from "../utill";
import { createBlcokHash } from "../utill/block_hash";
import { createBlcokTarget } from "../utill/block_target";
import { BlockDto, BlockHashDto } from "./dto";
export class Block {
    version : string;
    height : number;
    timestamp : number;
    previousHash : string;
    merkleRoot : string;
    hash : string;
    nonce : number;
    difficulty : number;
    data : string[];
    constructor (headers : BlockDto, body : BlockBody) {
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
    private setMerkleRoot (body : BlockBody) {
        // 머클루트의 기능 utill에 빼놓자.
        this.merkleRoot = createMarkleRoot(body);
    }

    // 본인 인스턴스의 해시를 만들때
    // 마이닝

    private setHash () {
        // 해시를 만드는 기능을 utill
        // 목표값 : 블록의 생성권한을 얻는 목표값
        // 목표값보다 작은 유효한 해시값을 구하는것
        const target = createBlcokTarget(this.difficulty);
        // 블록 생성
        
        const createHashDto : BlockHashDto = {
            version : this.version,
            heigth : this.height,
            timestamp : this.timestamp,
            previousHash : this.previousHash,
            difficulty : this.difficulty,
            merkleRoot : this.merkleRoot,
            nonce : this.nonce
        }
        
        while(true) {
            // 블록 해시 생성
            const currentHash = createBlcokHash(createHashDto)
            this.nonce++;
            if(BigInt("0x " + currentHash) <= BigInt(target)) break;
        }
    }
}



