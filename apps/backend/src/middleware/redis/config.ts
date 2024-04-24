import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new redis({
  host: process.env.REDIS_URL as string,
  password: process.env.REDIS_PASSWORD as string,
});
export default redisClient;
