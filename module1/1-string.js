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

const uppercase = () => "abc";
const uppercase2 = () => "abc2";

exports.uppercase = uppercase2;
