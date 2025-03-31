const {
  mergeStrings,
  kebabToCamel,
  camelToKebab,
  isUpperCase,
  upperLower,
  capitalize,
  trim,
  trimAll,
} = require("./1-string");

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
console.log(trimAll(" a nice  day "));
