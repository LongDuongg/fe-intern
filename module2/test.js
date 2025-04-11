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
  deepEqual,
} = require("./1-array-object.js");

const ha = { name: "Ha" };
const luan = { name: "Luan" };
const a = {
  name: "Ha",
  jobs: ["developer", "teacher"],
  address: { city: "Ha Giang" },
};
const a2 = {
  name: "Ha",
  jobs: ["developer", "teacher"],
  address: { city: "Ha Giang" },
};

// console.log(deepEqual(ha, luan));
// console.log(deepEqual(a, a2));
// console.log(deepEqual(null, undefined));

// ======================================================================================================

const array = [
  ha,
  { name: "Quan" },
  { name: "Son" },
  { name: "Cuong" },
  { name: "Hung" },
];

// console.log(filter(array, (item) => item.name.indexOf("u") > -1));
// console.log(filter(array, (item) => item.name.indexOf("a") > -1));
// console.log(array.filter2((item) => item.name.indexOf("x") > -1));
// console.log(array.filter2((item) => item.name.length > 4));

// console.log("array after remove");
// console.log(remove(ha, array));
// console.log(array.remove2({ name: "Son" }));

// console.log(without(array, (item) => item.name === "Quan"));
// console.log(array.without2((item) => item.name === "Cuong"));

// console.log("=========================");
// console.log("original array :");
// console.log(array);

// ======================================================================================================

// console.log(merge({ name: "Quan" }, { age: 20 }));
// console.log(
//   merge({ name: "Quan", age: 23 }, { age: null }, { birthday: "26/02/2000" })
// );

// ======================================================================================================

const listMap = {
  "Hoa": ["Le Thi Hoa", "Mai Hoa"],
  "Tham": ["Hong Tham", "Xuan Tham"],
};

// console.log(addToListMap("Hoa", "Nguyen Thi Hoa", listMap));
// console.log(addToListMap("Son", "Anh Son", listMap));

// console.log("=========================");

// console.log("original object :");
// console.log(listMap);

// ======================================================================================================

const numbArr = [3, 7, 23, 1, 5];

const people = [
  { name: "Quan", age: 35 },
  { name: "Luan", age: 24 },
  { name: "Hoa", age: 28 },
];

// console.log(sortByDistance(numbArr, 5));

// console.log(sort(people, (person) => person.name));
// console.log(sort(people, (person) => person.age));

// ======================================================================================================

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

// const hieu = clone(person);

// hieu.name = "Hieu";
// hieu.age = 25;
// hieu.address.street = "Ba Trieu";

// console.log("Hieu :");
// console.log(hieu);

// ======================================================================================================

// console.log(getData(person, ["name"]));
// console.log(getData(person, ["age"]));
// console.log(getData(person, ["address", "city"]));
// console.log(getData(person, ["address", "street"]));
// console.log(getData(person, ["jobs", 0, "salary"]));

// ======================================================================================================

// console.log(setData(person, ["name"], "Nguyen Trai"));
// console.log(setData(person, ["age"], 20));
// console.log(setData(person, ["address", "city"], "Ha Giang"));
// const newPerson = setData(person, ["jobs", 0, "title"], "senior developer");
// console.log(newPerson);
// console.log(setData(person, ["address", "street"], "Ta Hien"));
// console.log(setData(person, ["hobbies", 0], "gaming"));
// console.log(setData(person, ["jobs", 0, "title"], "senior developer"));
// console.log(setData(person, ["gender"], "male"));

// console.log("=========================");
// console.log("original object :");
// console.log(person);
