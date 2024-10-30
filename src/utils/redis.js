const { createClient } = require("redis");

const redisClient = createClient();

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Could not connect to Redis:", error);
  }
})();

// Export redisClient if you need it in other files
module.exports = redisClient;
