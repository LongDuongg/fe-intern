const {
  mergeStrings,
  kebabToCamel,
  camelToKebab,
  isUpperCase,
  upperLower,
  capitalize,
  trim,
  trimAll,
  formatNumber,
  abba,
  table,
} = require("./1-string");

const people = [
  { name: "Cuong", status: "Married", age: 18 },
  { name: "Son Pham", status: "Married", age: 18 },
  { name: "Son Mai", status: "Married", age: 37 },
  { name: "Luan", status: "Unmarried", age: 18 },
  { name: "Tuan Anh", status: "Unmarried", age: 40 },
  { name: "Ha", status: "Unmarried", age: 60 },
];

// console.log(mergeStrings("abc", "123456"));

// console.log(kebabToCamel("da-nang"));
// console.log(kebabToCamel("ho-chi-minh-city"));

// console.log(camelToKebab("daNang"));
// console.log(camelToKebab("hoChiMinhCity"));

// console.log(isUpperCase("A"));
// console.log(isUpperCase("a"));

// console.log(upperLower(" a NiCE  dAY "));

// console.log(capitalize(" a NiCE  dAY "));

// console.log(trim(" a nice  day "));

// console.log(trimAll(" a nice  day "));

// console.log(formatNumber(100000000));

// console.log(abba("ab", "cde"));
// console.log(abba("Hi", " John "));

// console.log(table(people));
