const characters = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    eyeColor: "blue",
    gender: "male",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    eyeColor: "yellow",
    gender: "male",
  },
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    eyeColor: "brown",
    gender: "female",
  },
  {
    name: "Anakin Skywalker",
    height: "188",
    mass: "84",
    eyeColor: "blue",
    gender: "male",
  },
];

// Map
const getNames = (characters) => characters.map((character) => character.name);
// console.log(getNames(characters));

const getHeights = (characters) =>
  characters.map((character) => character.height);
// console.log(getHeights(characters));

const getNamesAndHeights = (characters) =>
  characters.map((character) => {
    return {
      name: character.name,
      height: character.height,
    };
  });
// console.log(getNamesAndHeights(characters));

const getFirstNames = (characters) =>
  characters.map((character) => character.name.split(" ")[0]);

const getFirstNames2 = (characters) =>
  characters.map((character) =>
    character.name.substring(0, character.name.indexOf(" "))
  );

// console.log(getFirstNames2(characters));

// ==================================================================================

// Filter
const getCharWithMassOver100 = (characters) =>
  characters.filter((character) => character.mass > 100);
// console.log(getCharWithMassOver100(characters));

const getCharWithHeightUnder200 = (characters) =>
  characters.filter((character) => character.height < 200);
// console.log(getCharWithHeightUnder200(characters));

const getMaleCharacters = (characters) =>
  characters.filter((character) => character.gender === "male");
// console.log(getMaleCharacters(characters));

const getFemaleCharacters = (characters) =>
  characters.filter((character) => character.gender === "female");
// console.log(getFemaleCharacters(characters));

// ==================================================================================

// Reduce
const getTotalMass = (characters) =>
  characters.reduce((acc, character) => acc + Number(character.mass), 0);
// console.log(getTotalMass(characters));

const getTotalHeight = (characters) =>
  characters.reduce((acc, character) => acc + Number(character.height), 0);
// console.log(getTotalHeight(characters));

const getTotalCharactersInNames = (characters) =>
  characters.reduce((acc, character) => acc + character.name.length, 0);
// console.log(getTotalCharactersInNames(characters));

const getTotalEyeColor = (characters) =>
  characters
    .map((character) => character.eyeColor)
    .reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});
// console.log(getTotalEyeColor(characters));

// ==================================================================================

// Sort
const sortString = (str) => str.split("").sort().join("");

const sortByName = (characters) =>
  characters.sort((a, b) => a.name.localeCompare(b.name));
// console.log(sortByName(characters));

const sortByMass = (characters) => characters.sort((a, b) => a.mass - b.mass);
// console.log(sortByMass(characters));

const sortByHeight = (characters) =>
  characters.sort((a, b) => a.height - b.height);
// console.log(sortByHeight(characters));

const sortByGender = (characters) =>
  characters.sort((a, b) => a.gender - b.gender);
// console.log(sortByGender(characters));

// ==================================================================================

// Every
const allCharactersHaveBlueEyes = (characters) =>
  characters.every((character) => character.eyeColor === "blue");
// console.log(allCharactersHaveBlueEyes(characters));

const allCharacterHaveMassOver40 = (characters) =>
  characters.every((character) => character.mass > 40);
// console.log(allCharacterHaveMassOver40(characters));

const allCharactersHaveHeightUnder200 = (characters) =>
  characters.every((character) => character.height < 200);
// console.log(allCharactersHaveHeightUnder200(characters));

const allCharactersAreMale = (characters) =>
  characters.every((character) => character.gender === "male");
// console.log(allCharactersAreMale(characters));
