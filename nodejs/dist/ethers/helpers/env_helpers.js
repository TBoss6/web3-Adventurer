"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.INIT_VECTOR = exports.SECRET_INIT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
const SECRET_INIT = env.SECRET_INIT;
exports.SECRET_INIT = SECRET_INIT;
const INIT_VECTOR = env.INIT_VECTOR;
exports.INIT_VECTOR = INIT_VECTOR;
const log = console.log;
exports.log = log;
