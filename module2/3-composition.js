// Pipe
const pipe = (...functions) => {
  return (arg) => {
    return functions.reduce((acc, fn) => {
      return fn(acc);
    }, arg);
  };
};

const pipe2 =
  (...functions) =>
  (arg) =>
    functions.reduce((acc, fn) => fn(acc), arg);

const plus1 = (x) => x + 1;

const double = (x) => x * 2;

const square = (x) => x * x;

const triple = (x) => x * 3;

// console.log(pipe(plus1, double, square, triple)(2));
// console.log(pipe2(plus1, double, square, triple)(2));

// =========================================================================

// Format and Display User Information
const getFullName = (user) => {
  const { firstName = "", lastName = "" } = user;
  return `${firstName} ${lastName}`;
};

const toUpperCase = (str) => str.toUpperCase();

const addTitle = (name) => {
  return name ? `Mr./Ms. ${name}` : "Unknown User";
};

// composition of the above functions
const formatUser = (user) => addTitle(toUpperCase(getFullName(user)));

const formatUser2 = pipe(getFullName, toUpperCase, addTitle);

// console.log(formatUser({ firstName: "John", lastName: "Doe" }));
// console.log(formatUser({ firstName: "Jane" })); //
// console.log(formatUser({}));

// console.log(formatUser2({ firstName: "John", lastName: "Doe" }));
// console.log(formatUser2({ firstName: "Jane" })); //
// console.log(formatUser2({}));

// =========================================================================

// Sanitize User Input
const trim = (str) => str.trim();

const toLowerCase = (str) => str.toLowerCase();

const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9 ]/g, "");

const limitLength = (max) => (str) => str.slice(0, max);

// composition of the above functions
const sanitizeInput = (str) =>
  limitLength(10)(removeSpecialChars(toLowerCase(trim(str))));

const sanitizeInput2 = (str) =>
  pipe(trim, toLowerCase, removeSpecialChars, limitLength(100))(str);

// console.log(sanitizeInput("   Hello@WORLD!!! Welcome to JavaScript.  "));
// console.log(sanitizeInput2("   Hello@WORLD!!! Welcome to JavaScript.  "));

// =========================================================================

// Display Prices
const toDollars = (priceInCents) =>
  priceInCents.map((priceInCent) => priceInCent / 100);

const applyDiscount = (discount) => (prices) =>
  prices.map((price) => price * discount);

const formatPrice = (prices) =>
  prices.map((price) => (price === 0 ? "Free" : `$${price.toFixed(2)}`));

// composition of the above functions
const processPrices = (prices, discount) =>
  formatPrice(applyDiscount(discount)(toDollars(prices)));

const processPrices2 = (prices, discount) =>
  pipe(toDollars, applyDiscount(discount), formatPrice)(prices);

const prices = [0, 500, 1500, 0, 20000]; // cents
// console.log(processPrices(prices, 0.1));
// console.log(processPrices2(prices, 0.1));

// =========================================================================

// Transform API Response
const extractData = (res) => res.data;

const filterActive = (users) => users.filter((user) => user.active);

const mapUserNames = (users) => users.map((user) => user.name);

const sortNames = (names) => names.sort();

// composition of the above functions
const processUsers = (res) =>
  sortNames(mapUserNames(filterActive(extractData(res))));

const processUsers2 = pipe(extractData, filterActive, mapUserNames, sortNames);

const apiResponse = {
  data: [
    { name: "Charlie", active: true },
    { name: "Alice", active: true },
    { name: "Bob", active: false },
  ],
};

// console.log(processUsers(apiResponse));
// console.log(processUsers2(apiResponse));

// =========================================================================

// Generate SEO-Friendly URLs
const removePunctuation = (str) => {
  const punctuations = [
    ".",
    ",",
    "!",
    "?",
    ":",
    ";",
    '"',
    "'",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "-",
    "_",
    "/",
    "\\",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "=",
    "+",
    "<",
    ">",
    "|",
    "`",
    "~",
  ];
  let cleanStr = "";

  for (let char of str) {
    if (!punctuations.includes(char)) {
      cleanStr += char;
    }
  }

  // Replace multiple spaces with a single space
  return cleanStr.replace(/\s+/g, " ").trim();
};

const toKebabCase = (str) => str.toLowerCase().split(" ").join("-");

const limitLengthSafely = (max) => (str) => {
  if (str.length <= max) {
    return str;
  }

  const words = str.split("-");
  let result = "";

  for (let word of words) {
    if ((result + word).length > max) {
      break;
    }
    result += (result ? "-" : "") + word;
  }

  return result;
};

const createSlugGenerator = ({ maxLength }) => {
  // composition of the above functions
  return (title) =>
    limitLengthSafely(maxLength)(toKebabCase(removePunctuation(title)));
};

const generateSlug = createSlugGenerator({ maxLength: 40 });

console.log(
  generateSlug(
    "10 Tips to Write Great JavaScript Code for Beginners and Experts!"
  )
);
