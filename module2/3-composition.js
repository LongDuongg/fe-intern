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

const formatUser2 = (user) => pipe(getFullName, toUpperCase, addTitle)(user);

// console.log(formatUser({ firstName: "John", lastName: "Doe" }));
// console.log(formatUser({ firstName: "Jane" })); //
// console.log(formatUser({}));

// console.log(formatUser({ firstName: "John", lastName: "Doe" }));
// console.log(formatUser({ firstName: "Jane" })); //
// console.log(formatUser({}));

// =========================================================================

// Sanitize User Input
const trim = (str) => str.trim();

const toLowerCase = (str) => str.toLowerCase();

const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9 ]/g, "");

const limitLength = (max) => (str) =>
  str.length > max ? "exceed max limit" : `"${str}"`;

// composition of the above functions
const sanitizeInput = (str) =>
  limitLength(10)(removeSpecialChars(toLowerCase(trim(str))));

const sanitizeInput2 = (str) =>
  pipe(trim, toLowerCase, removeSpecialChars, limitLength(100))(str);

console.log(sanitizeInput("   Hello@WORLD!!! Welcome to JavaScript.  "));
console.log(sanitizeInput2("   Hello@WORLD!!! Welcome to JavaScript.  "));

// Display Prices

// Transform API Response

// Generate SEO-Friendly URLs

//
