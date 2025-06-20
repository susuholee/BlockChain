"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlcokTarget = void 0;
const constant_1 = require("../constant");
const createBlcokTarget = (difficulty) => {
    return BigInt(constant_1.MAX_TARGET) / BigInt(difficulty);
};
exports.createBlcokTarget = createBlcokTarget;
