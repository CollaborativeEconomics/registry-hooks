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
const init_1 = require("../../init");
const serverMock_1 = __importDefault(require("../../mocks/serverMock"));
(0, bun_test_1.describe)("fetchDataFromApi", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, bun_test_1.beforeAll)(() => serverMock_1.default.listen());
    (0, bun_test_1.afterEach)(() => serverMock_1.default.resetHandlers());
    (0, bun_test_1.afterAll)(() => serverMock_1.default.close());
    (0, bun_test_1.test)("fetches data from the API", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(`${(0, init_1.getRegistryBaseUrl)()}/test`);
        const data = yield response.json();
        (0, bun_test_1.expect)(data).toEqual({ message: "Hello test!" });
    }));
}));
