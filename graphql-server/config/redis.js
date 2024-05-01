const Redis = require("ioredis");

const redis = new Redis({
  port: 15489, // Redis port
  host: "redis-15489.c11.us-east-1-3.ec2.cloud.redislabs.com", // Redis host
  password: process.env.REDIS_PASSWORD,
});

module.exports = redis;
