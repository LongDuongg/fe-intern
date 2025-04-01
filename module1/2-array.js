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
// get an array of names
const getNames = (characters) =>
  characters.map((character) => character.name[0]);

// get an array of heights
const getHeights = (characters) =>
  characters.map((character) => character.height);

// get an array of names and heights
const getNamesAndHeights = (characters) =>
  characters.map((character) => {
    return {
      name: character.name,
      height: character.height,
    };
  });

// get an array of first name
const getFirstNames = (characters) =>
  characters.map((character) => character.name.split(" ")[0]);

const getFirstNames2 = (characters) =>
  characters.map((character) =>
    character.name.substring(0, character.name.indexOf(" "))
  );

console.log(getFirstNames2(characters));

// ==================================================================================
