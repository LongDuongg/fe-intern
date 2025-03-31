// First way
const mergeStrings = (...string) => {
  const theLongestString = Math.max(...string.map((str) => str.length));
  let ret = [];
  for (let i = 0; i < theLongestString; i++) {
    string.forEach((str) => {
      if (str[i]) {
        ret.push(str[i]);
      }
    });
  }
  return ret.join("");
};

// Second way
const mergeStrings2 = (...string) => {
  let result = [];
  let i = 0;
  let discoverCharacters = true; // init flag to determine whether there are still characters left to process in any of the input strings

  while (discoverCharacters) {
    discoverCharacters = false; // Assume no more characters to process
    string.forEach((str) => {
      if (str[i]) {
        result.push(str[i]);
        discoverCharacters = true; // Set flag to true since we found a character
      }
    });
    i++; // Move to the next character index
  }

  return result.join("");
};

exports.mergeStrings = mergeStrings2;

// first way
const kebabToCamel = (string) => {
  let newStr = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "-") {
      newStr += string[i + 1].toUpperCase();
      i++;
    } else {
      newStr += string[i];
    }
  }
  return newStr;
};

// second way
const kebabToCamel2 = (string) =>
  string
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

exports.kebabToCamel = kebabToCamel2;

// first way
const camelToKebab = (string) => {
  let newStr = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i].toUpperCase()) {
      newStr += "-" + string[i].toLowerCase();
    } else {
      newStr += string[i];
    }
  }
  return newStr;
};

// second way
const camelToKebab2 = (string) =>
  string.replace(
    // /[A-Z]+(?![a-z])|[A-Z]/g,
    /[A-Z]+/g,
    ($, ofs) => {
      console.log(`Match: '${$}', Offset: ${ofs}`);
      return (ofs ? "-" : "") + $.toLowerCase();
    }
    // $ represents the matched text from the regular expression
    // ofs is the offset of the match in the string
  );
// [A-Z]+ matches one or more uppercase letters that are not followed by lowercase letters (?![a-z])
// |[A-Z] Matches a single uppercase letter if not caught by the first pattern.
exports.camelToKebab = camelToKebab2;

// first way
const isUpperCase = (letter) => letter === letter.toUpperCase();

// second way
const isUpperCase2 = (letter) => letter >= "A" && letter <= "Z";

// third way
const isUpperCase3 = (letter) => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upperCaseLetters.includes(letter);
};

// fourth way
const isUpperCase4 = (letter) => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upperCaseLetters.indexOf(letter) !== -1;
};

// fifth way
const isUpperCase5 = (letter) => letter.match(/[A-Z]/) !== null;

exports.isUpperCase = isUpperCase5;

const upperLower = (string) => {
  let newStr = "";
  for (let i = 0; i < string.length; i++) {
    if (isUpperCase(string[i])) {
      newStr += string[i].toLowerCase();
    } else {
      newStr += string[i].toUpperCase();
    }
  }
  return newStr;
};

exports.upperLower = upperLower;

const capitalize = (string) => {
  const capitalizeWord = (word) =>
    word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : "";

  let newStr = "";
  const words = string.split(" ");
  for (const word of words) {
    newStr += capitalizeWord(word) + " ";
  }
  return newStr;
};

exports.capitalize = capitalize;

// first way
const trim = (string) => string.trim();

// second way
const trim2 = (string) => string.replace(/^\s+|\s+$/g, "");
// ^\s+ matches one or more whitespace characters at the beginning of the string
// \s+$ matches one or more whitespace characters at the end of the string

// third way
const trim3 = (string) => {
  let newStr = "";
  const words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[0] === " " || words[words.length - 1] === " ") {
      continue;
    } else {
      newStr += words[i] + " ";
    }
  }
  return newStr;
};

exports.trim = trim3;

// first way
const trimAll = (string) => string.trim().replace(/\s+/g, " ");

// second way
const trimAll2 = (string) => {
  let newStr = "";
  const words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      newStr += words[i] + " ";
    }
  }
  return newStr;
};

// third way
const trimAll3 = (string) =>
  string
    .split(" ")
    .filter((word) => word)
    .join(" ");

exports.trimAll = trimAll3;

// first way
const formatNumber = (number) => {
  let string = number.toString();
  for (let i = string.length - 3; i > 0; i -= 3) {
    string = string.substring(0, i) + "," + string.substring(i);
  }
  return string;
};

// second way
const formatNumber2 = (number) => {
  const string = number.toString();
  return string.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // \d matches a digit
  // (?=(\d{3})+(?!\d)) is a positive lookahead that checks if there are groups of three digits ahead, but not followed by another digit
  // $1 is the first capturing group, which is the digit matched by \d
};

// third way
const formatNumber3 = (number) => number.toLocaleString();

// fourth way
const formatNumber4 = (number) => {
  const str = number.toString().split("").reverse();
  let formatted = [];

  for (let i = 0; i < str.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formatted.push(",");
    }
    formatted.push(str[i]);
  }

  return formatted.reverse().join("");
};

exports.formatNumber = formatNumber4;

// first way
const reverseString = (str) => {
  const charArr = str.split("");
  let newStr = "";
  for (let i = charArr.length - 1; i >= 0; i--) {
    // newStr += charArr[i];
    // or
    newStr += str.substring(i, i + 1);
  }
  return newStr;
};

// second way
const reverseString2 = (str) => str.split("").reverse().join("");

const abba = (str1, str2) => `${str1}${str2}${reverseString(str1)}`;

exports.abba = abba;
