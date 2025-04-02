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

// console.log(getData(school, ["classes", "pupils", "name"]));

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
