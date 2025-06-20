import merkle from "merkle";
import { BlockBody } from "../interface/block_body";

export const createMarkleRoot = ( {data} : BlockBody) : string => {
    // if(data.length === 0) throw new Error("트랜잭션의 길이 에러"); // throw new Error() : 에러를 발생하고 그 이후 코드 중단
    if(data.length === 0) return "트랜잭션의 길이 에러";
    const merkleTree = merkle("sha256").sync(data);
    return merkleTree.root();
}