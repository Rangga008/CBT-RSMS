import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export const prisma = new PrismaClient();

// Redis is optional — server works without it (no caching/blacklist)
export const redis = new Redis(
	process.env.REDIS_URL || "redis://localhost:6379",
	{
		lazyConnect: true,
		maxRetriesPerRequest: 0,
		enableOfflineQueue: false,
		retryStrategy: () => null, // disable auto-retry
	},
);
redis.on("error", () => {}); // suppress noise, handled in app.js
