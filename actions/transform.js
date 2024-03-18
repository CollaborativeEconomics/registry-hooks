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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
// Transform
function transform(context, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, lodash_1.reduce)(parameters, (result, newPath, originalPath) => {
            if (typeof newPath !== 'string' || typeof originalPath !== 'string') {
                throw new Error(`Invalid transform input of type ${typeof newPath}/${typeof originalPath}`);
            }
            const value = (0, lodash_1.get)(context, originalPath);
            (0, lodash_1.set)(result, newPath, value);
            return result;
        }, {});
    });
}
exports.default = transform;
