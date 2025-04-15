// write a function (or series of functions) that takes in an array of numbers and returns the sum of all the even numbers
const sumOfEvens = (arr) => {
  return arr.filter((num) => num % 2 === 0).reduce((acc, num) => acc + num, 0);
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
    .filter((num) => typeof num === "number")
    .filter((num) => num % 2 === 0)
    .reduce((acc, num) => acc + num, 0);
};

// console.log(sumOfEvens2(["hey", 2, "hi", 4, "hello"]));
// console.log(sumOfEvens2(["this", 5, "is", 7, "a", "longer", 10, "array"]));
// console.log(sumOfEvens2([9, "cya", 5, "goodbye", "later", 10, 20]));

// write a function (or series of functions) that takes in an array of both strings and numbers and returns the sum of the total number of letters in all of the words combined
const sumOfLetters = (arr) => {
  return arr
    .filter((str) => typeof str === "string")
    .map((str) => str.length)
    .reduce((acc, num) => acc + num, 0);
};

// console.log(sumOfLetters(["hey", 2, "hi", 4, "hello"]));
// console.log(sumOfLetters(["this", 5, "is", 7, "a", "longer", 10, "array"]));
// console.log(sumOfLetters([9, "cya", 5, "goodbye", "later", 10, 20]));

// write a function (or series of functions) that takes in an array of strings and returns an object with the vowel count of all of the strings combined
const countVowels = (arr) => {
  const vowels = ["u", "e", "o", "a", "i"];

  return arr
    .join("") // Combine all strings
    .toLowerCase() // Make it case-insensitive
    .split("") // Split into characters
    .reduce(
      (acc, char) => {
        if (vowels.includes(char)) {
          acc[char] = acc[char] + 1;
        }
        return acc;
      },
      { a: 0, e: 0, i: 0, o: 0, u: 0 }
    ); // Start with all vowels at 0
};

// console.log(countVowels(["hey", "hi", "hello"]));
// console.log(countVowels(["this", "is", "a", "longer", "array"]));
// console.log(countVowels(["Apple", "bAnAnA", "CHERRY", "date", "elderberry"]));

// write a function (or series of functions) that takes in an array of numbers and returns an an array of only the unique num
