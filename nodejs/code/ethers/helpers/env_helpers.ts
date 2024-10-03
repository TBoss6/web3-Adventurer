import dotenv from "dotenv";
dotenv.config();

const env = process.env;

const SECRET_INIT = env.SECRET_INIT;
const INIT_VECTOR = env.INIT_VECTOR;
const log = console.log;

export { SECRET_INIT, INIT_VECTOR, log };
