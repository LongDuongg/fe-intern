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

console.log(`"${formatUSD(1000)}"`);
console.log(`"${formatEUR(1000)}"`);
console.log(`"${formatJPY(1000)}"`);

// 2 Logging Utility

// 3 Rate Limiter
