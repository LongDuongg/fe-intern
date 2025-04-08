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

console.log(pipe(plus1, double, square, triple)(2));
console.log(pipe2(plus1, double, square, triple)(2));

// Format and Display User Information

// Sanitize User Input

// Display Prices

// Transform API Response

// Generate SEO-Friendly URLs
