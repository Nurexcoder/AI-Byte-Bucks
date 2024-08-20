import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new redis(`rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`);


export default redisClient;
