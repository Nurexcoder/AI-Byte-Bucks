import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

console.log( process.env.REDIS_PASSWORD as string)
const redisClient = new redis({
  host:  'redis-18649.c273.us-east-1-2.ec2.redns.redis-cloud.com'|| process.env.REDIS_URL as string,
  password: process.env.REDIS_PASSWORD as string,
  port: 18649,
  username: "default",
});


export default redisClient;
