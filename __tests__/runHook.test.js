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
const runHook_1 = __importDefault(require("../runHook"));
const serverMock_1 = __importDefault(require("../mocks/serverMock"));
const types_1 = require("../types");
(0, bun_test_1.describe)("runHook", () => {
    (0, bun_test_1.beforeAll)(() => {
        serverMock_1.default.listen();
    });
    (0, bun_test_1.afterEach)(() => {
        serverMock_1.default.resetHandlers();
    });
    (0, bun_test_1.afterAll)(() => {
        serverMock_1.default.close();
    });
    (0, bun_test_1.test)("should execute a hook", () => __awaiter(void 0, void 0, void 0, function* () {
        const metadata = yield (0, runHook_1.default)(types_1.TriggerTypes.addMetadataToNFT, "org_123", { userId: '1234', walletAddress: '0xABCD' });
        (0, bun_test_1.expect)(metadata.output).toMatchObject({ tonsCO2: 123000, walletAddress: '0xABCD' });
    }));
});
