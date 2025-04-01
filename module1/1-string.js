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

// /===================================================================================
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

const kebabToCamel2 = (string) =>
  string
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

exports.kebabToCamel = kebabToCamel2;

// /===================================================================================

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

const camelToKebab2 = (string) =>
  string.replace(
    /[A-Z]+/g,
    ($, ofs) => {
      console.log(`Match: '${$}', Offset: ${ofs}`);
      return (ofs ? "-" : "") + $.toLowerCase();
    }
    // $ represents the matched text from the regular expression
    // ofs is the offset of the match in the string
  );
// [A-Z]+ matches one or more uppercase letters

exports.camelToKebab = camelToKebab2;

// /===================================================================================

const isUpperCase = (letter) => letter === letter.toUpperCase();

const isUpperCase2 = (letter) => letter >= "A" && letter <= "Z";

const isUpperCase3 = (letter) => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // return upperCaseLetters.includes(letter);
  // or
  return upperCaseLetters.indexOf(letter) !== -1;
};

const isUpperCase4 = (letter) => letter.match(/[A-Z]/) !== null;

exports.isUpperCase = isUpperCase5;

// /===================================================================================

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

// /===================================================================================

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

// /===================================================================================

const trim = (string) => string.trim();

const trim2 = (string) => string.replace(/^\s+|\s+$/g, "");
// ^\s+ matches one or more whitespace characters at the beginning of the string
// \s+$ matches one or more whitespace characters at the end of the string

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

// /===================================================================================

const trimAll = (string) => string.trim().replace(/\s+/g, " ");

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

const trimAll3 = (string) =>
  string
    .split(" ")
    .filter((word) => word)
    .join(" ");

exports.trimAll = trimAll3;

// /===================================================================================

const formatNumber = (number) => {
  let string = number.toString();
  for (let i = string.length - 3; i > 0; i -= 3) {
    string = string.substring(0, i) + "," + string.substring(i);
  }
  return string;
};

const formatNumber2 = (number) => {
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

exports.formatNumber = formatNumber2;

const reverseString = (str) => {
  const charArr = str.split("");
  let newStr = "";
  for (let i = charArr.length - 1; i >= 0; i--) {
    newStr += charArr[i];
  }
  return newStr;
};

const reverseString2 = (str) => str.split("").reverse().join("");

const abba = (str1, str2) => `${str1}${str2}${reverseString(str1)}`;

exports.abba = abba;

// /===================================================================================

const table = (list) => {
  if (!Array.isArray(list) || list.length === 0) {
    console.log("No list available");
    return;
  }

  // Get column names dynamically
  const columns = Object.keys(list[0]);
  const colWidths = columns.map((col) => col.length);

  // Calculate column widths based on the longest entry
  list.forEach((row) => {
    columns.forEach((col, i) => {
      colWidths[i] = Math.max(
        colWidths[i],
        (row[col]?.toString() || "").length
      );
    });
  });

  // Create a row divider
  const divider = "#" + colWidths.map((w) => "-".repeat(w + 2)).join("#") + "#";

  // Print header
  const header =
    "# " + columns.map((col, i) => col.padEnd(colWidths[i])).join(" | ") + " #";
  console.log("#".repeat(divider.length));
  console.log(header);
  console.log(divider);

  // Print rows
  list.forEach((row, index) => {
    if (index === 3 && list.length > 4) {
      console.log(
        "# " +
          columns.map((_, i) => "...".padEnd(colWidths[i])).join(" | ") +
          " #"
      );
    } else if (index < 3 || index === list.length - 1) {
      const rowStr =
        "# " +
        columns
          .map((col, i) => {
            const a = row[col]?.toString() || "";
            return a.padEnd(colWidths[i]);
          })
          .join(" | ") +
        " #";
      console.log(rowStr);
    }
  });

  console.log("#".repeat(divider.length));
};

exports.table = table;
