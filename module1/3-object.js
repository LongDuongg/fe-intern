const util = require("util");

let school = {
  name: "ABC School",
  classes: [
    {
      name: "1A",
      pupils: [
        {
          name: "John",
        },
        {
          name: "Jane",
        },
      ],
    },
  ],
};

const getData = (obj, keys) => {
  // If there is no keys, return the object itself
  if (keys === undefined || keys === null || keys.length === 0) {
    return obj;
  }

  const [firstKey, ...restKeys] = keys;

  if (Array.isArray(obj)) {
    return obj
      .map((item) => getData(item[firstKey], restKeys))
      .reduce((acc, arr) => acc.concat(arr), []); // use reduce to flatten the array
  }

  return getData(obj[firstKey], restKeys);
};

// console.log(getData(school, ["classes", "pupils", "name"]));

const setData = (obj, keys, value) => {
  // If there is no keys, return the value itself
  if (!keys || keys.length === 0) {
    return value;
  }

  const [firstKey, ...restKeys] = keys;

  // If the key doesn't exist, initialize it as an array if next key is a number, otherwise as an object
  if (!(firstKey in obj)) {
    obj[firstKey] = isNaN(restKeys[0]) ? {} : [];
  }

  obj[firstKey] = setData(obj[firstKey], restKeys, value);
  return obj;
};

const clone = (input) => {
  if (input === null || typeof input !== "object") {
    return input; // Return the value if input is not an object
  }

  if (Array.isArray(input)) {
    return input.map((item) => clone(item)); // Recursively clone each item in the array
  }

  let ret = {}; // Create an object to hold the cloned values

  for (const key in input) {
    ret[key] = input[key]; // Recursively clone each property
  }
  return ret;
};

// 1.Add pupil named Jack to class 1A.
// console.dir(setData(school, ["classes", 0, "pupils", 2], { name: "Jack" }));

// 2.Add class named 1B having pupil named Mary to school.
// console.dir(
//   setData(school, ["classes", 1], {
//     name: "1B",
//     pupils: [
//       {
//         name: "Mary",
//       },
//     ],
//   })
// );

// 3.Move Jane to class 1B.
// console.dir(
//   setData(
//     school,
//     ["classes"],
//     [
//       {
//         name: "1A",
//         pupils: [
//           {
//             name: "John",
//           },
//         ],
//       },
//       {
//         name: "1B",
//         pupils: [
//           {
//             name: "Mary",
//           },
//           {
//             name: "Jane",
//           },
//         ],
//       },
//     ]
//   )
// );

// 4.Do the above 3 tasks without mutating the object school. Create a new object for each task.
let schoolClone = clone(school);
setData(schoolClone, ["classes", 0, "pupils", 2], { name: "Jack" });

// setData(school, ["classes", 1], {
//   name: "1B",
//   pupils: [
//     {
//       name: "Mary",
//     },
//   ],
// });

// setData(
//   school,
//   ["classes"],
//   [
//     {
//       name: "1A",
//       pupils: [
//         {
//           name: "John",
//         },
//       ],
//     },
//     {
//       name: "1B",
//       pupils: [
//         {
//           name: "Mary",
//         },
//         {
//           name: "Jane",
//         },
//       ],
//     },
//   ]
// );
console.log("schoolClone:");
console.log(util.inspect(schoolClone, false, null, true /* enable colors */));
// console.log(JSON.stringify(schoolClone, null, 2));
console.log("=========================");
console.log("school:");
console.log(util.inspect(school, false, null, true /* enable colors */));
