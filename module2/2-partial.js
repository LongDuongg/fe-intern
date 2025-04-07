// 1 Currency formatter
const createCurrencyFormatter = (locale, currency) => {
  return function (amount) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  };
};

const formatUSD = createCurrencyFormatter("en-US", "USD");
const formatEUR = createCurrencyFormatter("de-DE", "EUR");
const formatJPY = createCurrencyFormatter("ja-JP", "JPY");

// console.log(`"${formatUSD(1000)}"`);
// console.log(`"${formatEUR(1000)}"`);
// console.log(`"${formatJPY(1000)}"`);

// 2 Logging Utility
const log = (level) => {
  return function (message) {
    let arr = [];
    for (const letter of level) {
      arr.push(letter.toUpperCase());
    }
    return `[${arr.join("")}] ${message}`;
  };
};

const info = log("info");
const warn = log("warn");
const error = log("error");

// console.log(info("Application started"));
// console.log(warn("Low disk space"));
// console.log(error("Server is down!"));

// 3 Rate Limiter
const createRateLimiter = (maxRequests, windowMs) => {
  // Store request timestamps per user
  const userRequests = {};

  return function (userId) {
    const now = Date.now();

    // Initialize if first time seeing user
    if (!userRequests[userId]) {
      userRequests[userId] = [];
    }

    // Remove requests older than the time window
    userRequests[userId] = userRequests[userId].filter(
      (timestamp) => now - timestamp < windowMs
    );

    // Check if user has exceeded request limit
    if (userRequests[userId].length >= maxRequests) {
      return "Rate limit exceeded";
    }

    // Allow request and record timestamp
    userRequests[userId].push(now);
    return "Request allowed";
  };
};

const apiLimiter = createRateLimiter(3, 10 * 1000); // Max 3 requests per 10 sec

console.log(apiLimiter("user123"));
console.log(apiLimiter("user123"));
console.log(apiLimiter("user123"));
console.log(apiLimiter("user123"));
