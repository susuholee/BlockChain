import { SHA256 } from "crypto-js";
import { BlockHashDto } from "../core/dto";

export const createBlcokHash = (BlockHashDto : BlockHashDto)  => {
    let BlockHash = "";
    for (const key in BlockHashDto) {
        BlockHash += BlockHashDto[key]
    }
    

    return SHA256(BlockHash).toString()
} 