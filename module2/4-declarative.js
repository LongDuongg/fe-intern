// write a function (or series of functions) that takes in an array of numbers and returns the sum of all the even numbers
// const sumOfEvens = (arr) => {
//   return arr.filter((num) => num % 2 === 0).reduce((acc, num) => acc + num, 0);
// };

// const sumOfEvens = (arr) => {
//   return arr.reduce((acc, num) => (num % 2 === 0 ? acc + num : acc), 0);
// };

const sumOfEvens = (arr) => {
  return arr.reduce((acc, num) => acc + (num % 2 === 0 ? num : 0), 0);
};

// console.log(sumOfEvens([2, 5, 7, 8, 10]));
// console.log(sumOfEvens([9, 11, 13, 15, 17, 2, 4]));

// write a function (or series of functions) that takes in an array of strings and returns an array with the number of letters in each string
const countLetters = (arr) => {
  return arr.map((str) => str.length);
};

// console.log(countLetters(["apple", "banana", "cherry", "date", "elderberry"]));
// console.log(countLetters(["hey", "hi", "hello"]));
// console.log(countLetters(["this", "is", "a", "longer", "array"]));

// write a function (or series of functions) that takes in an array of both words and numbers and returns the sum of all the even numbers
const sumOfEvens2 = (arr) => {
  return arr
    .filter((num) => typeof num === "number" && num % 2 === 0)
    .reduce((acc, num) => acc + num, 0);
};

// console.log(sumOfEvens2(["hey", 2, "hi", 4, "hello"]));
// console.log(sumOfEvens2(["this", 5, "is", 7, "a", "longer", 10, "array"]));
// console.log(sumOfEvens2([9, "cya", 5, "goodbye", "later", 10, 20]));

// write a function (or series of functions) that takes in an array of both strings and numbers and returns the sum of the total number of letters in all of the words combined
const sumOfLetters = (arr) => {
  return arr
    .filter((str) => typeof str === "string")
    .reduce((acc, str) => acc + str.length, 0);
};

// console.log(sumOfLetters(["hey", 2, "hi", 4, "hello"]));
// console.log(sumOfLetters(["this", 5, "is", 7, "a", "longer", 10, "array"]));
// console.log(sumOfLetters([9, "cya", 5, "goodbye", "later", 10, 20]));

// write a function (or series of functions) that takes in an array of strings and returns an object with the vowel count of all of the strings combined
const countVowels = (arr) => {
  const vowels = ["u", "e", "o", "a", "i", "h"];

  const countMap = vowels.reduce((acc, letter) => {
    acc[letter] = 0;
    return acc;
  }, {});

  // console.log(countMap);

  return arr
    .join("") // Combine all strings
    .toLowerCase() // Make it case-insensitive
    .split("") // Split into characters
    .reduce((acc, char) => {
      if (vowels.includes(char)) {
        acc[char] = acc[char] + 1;
      }
      return acc;
    }, countMap); // Start with all vowels at 0
};

// console.log(countVowels(["hey", "hi", "hello"]));
// console.log(countVowels(["this", "is", "a", "longer", "array"]));
// console.log(countVowels(["Apple", "bAnAnA", "CHERRY", "date", "elderberry"]));

// write a function (or series of functions) that takes in a string of word and returns an an array of only the unique num.
// Check again
const unique = (arr) => {
  // Use a Set to store unique numbers and convert it back to an array
  return [...new Set(arr)];
};

// console.log(unique([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// console.log(unique([1, 1, 2, 3, 4, 5, 6, 3]));
// console.log(unique([3, 3, 3, 4, 4, 4, 5, 6, 7, 7, 7]));

// write a function (or series of functions) that takes in an array of numbers and capitalizes the last letter of every word, removes any word that has an even amount of letters, and returns a string.
const isEven = (number) => number % 2 === 0;

const capitalizeLastLetter = (word) => {
  return word.slice(0, word.length - 1) + word[word.length - 1].toUpperCase();
};

// const trimAll = (phrase) => {
//   return phrase.replace(/\s+/g, " ").trim();
// };

const capitalizeLastLetterInWords = (string) => {
  return string
    .split(" ")
    .filter((word) => !isEven(word.length))
    .map((word) => capitalizeLastLetter(word))
    .join(" ");
};

// console.log(capitalizeLastLetterInWords("hey how do you feel today"));
// console.log(capitalizeLastLetterInWords("this is a longer array of words"));

// write a function (or series of functions) that takes in an array of numbers, squares every number, removes all numbers that's square is even, converts every number to a string, and returns an array.
const squareAndRemoveEven = (arr) => {
  return arr
    .map((num) => num * num)
    .filter((num) => num % 2 !== 0)
    .map((num) => num.toString());
};

// console.log(squareAndRemoveEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// console.log(squareAndRemoveEven([10, 11]));

//write a function (or series of functions) that takes in an array of strings, removes duplicate strings, removes all of the strings with an even number of letters, and multiplies the remaining letter counts together to return a product.
const { pipe } = require("./3-composition");

const removeDuplicates = (arr) => {
  return arr.filter((str, index) => arr.indexOf(str) === index);
};

const removeEvenLength = (arr) => {
  return arr.filter((str) => str.length % 2 !== 0);
};

const multiplyLength = (arr) => {
  return arr.reduce((acc, str) => acc * str.length, 1);
};

// const productOfLetterCounts = pipe(
//   removeDuplicates,
//   removeEvenLength,
//   multiplyLength
// );

const productOfLetterCounts = (arr) => {
  return arr
    .filter((str, index) => {
      return arr.indexOf(str) === index && str.length % 2 !== 0;
    })
    .reduce((acc, str) => acc * str.length, 1);
};

// console.log(
//   productOfLetterCounts(["bird", "cat", "snake", "cat", "dog", "frog", "cat"])
// );

// console.log(productOfLetterCounts(["this", "is", "a", "test", "test"]));
