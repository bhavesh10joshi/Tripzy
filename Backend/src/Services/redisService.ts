import { createClient } from "redis";

// Custom in-memory fallback cache when Redis is not running locally.
// This ensures that the application doesn't fail if Redis is unavailable.
const localCache = new Map<string, { value: string; expiry: number }>();

// Define key namespaces and TTL constants for clean cache organization.
// Standard TTL is set to 1 hour (3600 seconds) for itinerary results.
export const CACHE_PREFIX = "tripzy:itinerary:";
export const CACHE_TTL = 3600; 

let redisClient: any = null;
let isRedisConnected = false;

// Initialize the Redis client and establish event handlers.
// If Redis connection fails, we gracefully degrade to the local in-memory fallback.
const initRedis = async () => {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        console.log("No REDIS_URL provided. Gracefully defaulting to in-memory fallback.");
        isRedisConnected = false;
        return;
    }
    try {
        redisClient = createClient({
            url: redisUrl
        });

        redisClient.on("error", (err: any) => {
            // Log connection error without crashing the Node.js application process
            console.log("Redis Client Error, switching to in-memory fallback", err.message);
            isRedisConnected = false;
        });

        redisClient.on("connect", () => {
            console.log("Successfully connected to Redis server!");
            isRedisConnected = true;
        });

        await redisClient.connect();
    } catch (e: any) {
        console.log("Could not initiate Redis connection. Using in-memory fallback.", e.message);
        isRedisConnected = false;
    }
};

initRedis();

// Retrieve parsed JSON data from either the Redis cache or in-memory map.
export const getCache = async (key: string): Promise<any> => {
    const fullKey = CACHE_PREFIX + key;
    if (isRedisConnected && redisClient) {
        try {
            const data = await redisClient.get(fullKey);
            if (data) return JSON.parse(data);
        } catch (err) {
            console.log("Error reading from Redis cache:", err);
        }
    }

    // Fallback to local memory cache if Redis is down or key not found
    const cachedItem = localCache.get(fullKey);
    if (cachedItem) {
        if (Date.now() < cachedItem.expiry) {
            return JSON.parse(cachedItem.value);
        }
        // Evict expired item
        localCache.delete(fullKey);
    }
    return null;
};

// Store serialized JSON data in Redis or the in-memory map with an expiration limit.
export const setCache = async (key: string, data: any, ttl: number = CACHE_TTL): Promise<void> => {
    const fullKey = CACHE_PREFIX + key;
    const valueStr = JSON.stringify(data);

    if (isRedisConnected && redisClient) {
        try {
            await redisClient.setEx(fullKey, ttl, valueStr);
            return;
        } catch (err) {
            console.log("Error writing to Redis cache:", err);
        }
    }

    // Fallback storage in-memory mapping with expiry timestamp
    localCache.set(fullKey, {
        value: valueStr,
        expiry: Date.now() + (ttl * 1000)
    });
};

// Invalidate specific cache keys when modifications (editing, refinements, deletions) happen.
export const deleteCache = async (key: string): Promise<void> => {
    const fullKey = CACHE_PREFIX + key;
    if (isRedisConnected && redisClient) {
        try {
            await redisClient.del(fullKey);
        } catch (err) {
            console.log("Error deleting from Redis cache:", err);
        }
    }
    localCache.delete(fullKey);
};
