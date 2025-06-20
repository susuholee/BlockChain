import { MAX_TARGET } from "../constant"

export const createBlcokTarget = (difficulty : number) : bigint => {
    return BigInt(MAX_TARGET) / BigInt(difficulty);
}