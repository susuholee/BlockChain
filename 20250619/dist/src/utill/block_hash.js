"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlcokHash = void 0;
const crypto_js_1 = require("crypto-js");
const createBlcokHash = (BlockHashDto) => {
    let BlockHash = "";
    for (const key in BlockHashDto) {
        BlockHash += BlockHashDto[key];
    }
    return (0, crypto_js_1.SHA256)(BlockHash).toString();
};
exports.createBlcokHash = createBlcokHash;
