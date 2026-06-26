import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import Redis from "ioredis";

export const prisma = new PrismaClient({
	log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

export const redis = new Redis(
	process.env.REDIS_URL || "redis://localhost:6379",
	{
		lazyConnect: true,
		maxRetriesPerRequest: 1,
		enableOfflineQueue: false,
		connectTimeout: 3000,
	},
);

redis.on("error", () => {}); // suppress connection errors — redis is optional
