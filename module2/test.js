const {
  filter,
  remove,
  without,
  merge,
  addToListMap,
  sortByDistance,
  sort,
  setData,
  clone,
  getData,
} = require("./1-array-object.js");

const array = [
  { name: "Quan" },
  { name: "Son" },
  { name: "Cuong" },
  { name: "Hung" },
];

const listMap = {
  "Hoa": ["Le Thi Hoa", "Mai Hoa"],
  "Tham": ["Hong Tham", "Xuan Tham"],
};

const numbArr = [3, 7, 23, 1, 5];

const people = [
  { name: "Quan", age: 35 },
  { name: "Luan", age: 24 },
  { name: "Hoa", age: 28 },
];

const person = {
  name: "Tung",
  age: 12,
  address: {
    street: "Le Trong Tan",
    city: "Ha Noi",
  },
  hobbies: ["reading", "swimming"],
  jobs: [
    { title: "developer", salary: 1000 },
    { title: "designer", salary: 1200 },
  ],
};

// console.log(filter(array, (item) => item.name.indexOf("u") > -1));
// console.log(filter(array, (item) => item.name.indexOf("a") > -1));
// console.log(array.filter2((item) => item.name.indexOf("x") > -1));
// console.log(array.filter2((item) => item.name.length > 4));

// console.log("array after remove");
// console.log(remove({ name: "Cuong" }, array));
// console.log(array.remove2({ name: "Son" }));

// console.log(without(array, (item) => item.name === "Quan"));
// console.log(array.without2((item) => item.name === "Cuong"));

// console.log(merge({ name: "Quan" }, { age: 20 }));
// console.log(
//   merge({ name: "Quan", age: 23 }, { age: null }, { birthday: "26/02/2000" })
// );

// console.log(addToListMap("Hoa", "Nguyen Thi Hoa", listMap));

// console.log(sortByDistance(numbArr, 5));

// console.log(sort(people, (person) => person.name));
// console.log(sort(people, (person) => person.age));

// =========================================================================

const hieu = clone(person);

hieu.name = "Hieu";
hieu.age = 25;
hieu.address.street = "Ba Trieu";

console.log("Hieu :");
console.log(hieu);

console.log(getData(person, ["name"]));
console.log(getData(person, ["age"]));
console.log(getData(person, ["address", "city"]));
console.log(getData(person, ["address", "street"]));

// setData(person, ["name"], "Nguyen Trai");
// setData(person, ["age"], 20);
// setData(person, ["address", "city"], "Ha Giang");
// setData(person, ["address", "street"], "Ta Hien");
// setData(person, ["hobbies", 0], "gaming");
// setData(person, ["jobs", 0, "title"], "senior developer");
// setData(person, ["gender"], "male");

console.log("=========================");
// console.log("original array :");
// console.log(array);
// console.log(numbArr);
// console.log(people);

console.log("original object :");
// console.log(listMap);
console.log(person);
