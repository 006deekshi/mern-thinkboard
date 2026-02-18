const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
require("dotenv").config();

// Create a Redis client using env vars
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a rate limiter that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

module.exports = ratelimit;