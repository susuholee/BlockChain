"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkleRoot = void 0;
const merkle_1 = __importDefault(require("merkle"));
const createMarkleRoot = ({ data }) => {
    // if(data.length === 0) throw new Error("트랜잭션의 길이 에러"); // throw new Error() : 에러를 발생하고 그 이후 코드 중단
    if (data.length === 0)
        return "트랜잭션의 길이 에러";
    const merkleTree = (0, merkle_1.default)("sha256").sync(data);
    return merkleTree.root();
};
exports.createMarkleRoot = createMarkleRoot;
