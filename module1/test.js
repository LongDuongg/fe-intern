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

// console.log(`(${capitalize("duong Phuoc Long")})`);

// console.log(trim(" a nice  day "));

// console.log(trimAll(" a nice  day "));

// console.log(formatNumber(10000000));

// console.log(abba("ab", "cde"));
// console.log(abba("Hi", " John "));

// console.log(table(people));

// const columns = Object.keys(people[0]);
// console.log(columns);

// const columnWidths = columns.map((column) => column.length);
// console.log(columnWidths);
// console.log("====================================================");

// people.forEach((person, index) => {
//   // console.log(`row: ${index}`);
//   columns.forEach((column, i) => {
//     columnWidths[i] = Math.max(
//       columnWidths[i],
//       person[column].toString().length
//     );
//     // console.log(
//     //   `column: ${column} - ${person[column]}, column width based on the longest entry: ${columnWidths[i]}`
//     // );
//     // console.log(`column width: ${columnWidths}`);
//   });
//   // console.log("====================================================");
// });

// console.log(`new column width: ${columnWidths}`);
// console.log("====================================================");

// const divider =
//   "#" + columnWidths.map((w) => "-".repeat(w + 2)).join("#") + "#";
// console.log(`divider: ${divider}`);
// console.log("====================================================");

// const header =
//   "# " +
//   columns.map((col, i) => col.padEnd(columnWidths[i])).join(" | ") +
//   " #";
// console.log(`header: ${header}`);
// console.log("====================================================");
// console.log("#".repeat(divider.length));
// console.log(header);
// console.log(divider);

// people.forEach((row, index) => {
//   if (index === 3 && people.length > 4) {
//     const rowStr =
//       "# " +
//       columns.map((_, index) => "...".padEnd(columnWidths[index])).join(" | ") +
//       " #";
//     console.log(rowStr);
//   } else if (index < 3 || index === people.length - 1) {
//     const rowStr =
//       "# " +
//       columns
//         .map((col, index) => row[col].toString().padEnd(columnWidths[index]))
//         .join(" | ") +
//       " #";
//     console.log(rowStr);
//   }
// });
// console.log("#".repeat(divider.length));
