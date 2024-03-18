"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bun_test_1 = require("bun:test");
const math_1 = __importDefault(require("../math"));
(0, bun_test_1.describe)("math action", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, bun_test_1.test)("adds two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, math_1.default)({ numberInput: { a: 1 } }, { input: 'numberInput.a', value: 1, operation: 'add' });
        (0, bun_test_1.expect)(result).toEqual(2);
    }));
    (0, bun_test_1.test)("subtracts two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, math_1.default)({ numberInput: { a: 1 } }, { input: 'numberInput.a', value: 1, operation: 'subtract' });
        (0, bun_test_1.expect)(result).toEqual(0);
    }));
    (0, bun_test_1.test)("multiplies two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, math_1.default)({ numberInput: { a: 2 } }, { input: 'numberInput.a', value: 2, operation: 'multiply' });
        (0, bun_test_1.expect)(result).toEqual(4);
    }));
    (0, bun_test_1.test)("divides two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, math_1.default)({ numberInput: { a: 4 } }, { input: 'numberInput.a', value: 2, operation: 'divide' });
        (0, bun_test_1.expect)(result).toEqual(2);
    }));
}));
