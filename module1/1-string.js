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
