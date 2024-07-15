import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new redis({
  host:  'redis-15838.c8.us-east-1-2.ec2.redns.redis-cloud.com'|| process.env.REDIS_URL as string,
  password: process.env.REDIS_PASSWORD as string,
  port: 15838,
  username: "default",
});


export default redisClient;
