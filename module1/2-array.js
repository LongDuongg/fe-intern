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

console.log(getFirstNames2(characters));

// ==================================================================================
