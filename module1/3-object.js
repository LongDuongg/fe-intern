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
    {
      name: "1C",
      pupils: [
        {
          name: "Long",
        },
        {
          name: "Luan",
        },
      ],
    },
  ],
};

// 1.Add pupil named Jack to class 1A.
// school.classes[0].pupils.push({ name: "Jack" });

// 2.Add class named 1B having pupil named Mary to school.
// school.classes.push({
//   name: "1B",
//   pupils: [{ name: "Mary" }],
// });

// 3.Move Jane to class 1B.
// use findIndex() method to locate the index of Jane in class 1A
// const janeIndex = school.classes[0].pupils.findIndex(
//   (pupil) => pupil.name === "Jane"
// );

// if (janeIndex !== -1) {
//   // after finding the index, use splice() to remove Jane from class 1A and then push her to class 1B
//   const jane = school.classes[0].pupils.splice(janeIndex, 1)[0];
//   school.classes[1].pupils.push(jane);
// }

// 4.Do the above 3 tasks without mutating the object school. Create a new object for each task.
// let schoolClone = JSON.parse(JSON.stringify(school)); // deep clone the school object

// let schoolClone = {
//   ...school,
//   classes: school.classes.map((cls) => ({
//     ...cls,
//     pupils: cls.pupils.map((pupil) => ({ ...pupil })),
//   })),
// }; // deep clone the school object

// let schoolClone = {
//   name: school.name,
//   classes: school.classes.map((cls) => ({
//     name: cls.name,
//     pupils: cls.pupils.map((pupil) => ({ name: pupil.name })),
//   })),
// }; // deep clone the school object

// schoolClone.classes[0].pupils.push({ name: "Jack" });

// schoolClone.classes.push({
//   name: "1B",
//   pupils: [{ name: "Mary" }],
// });

// const janeIndex = schoolClone.classes[0].pupils.findIndex(
//   (pupil) => pupil.name === "Jane"
// );

// if (janeIndex !== -1) {
//   // after finding the index, use splice() to remove Jane from class 1A and then push her to class 1B
//   const jane = schoolClone.classes[0].pupils.splice(janeIndex, 1)[0];
//   schoolClone.classes[1].pupils.push(jane);
// }

// console.log("schoolClone:");
// console.log(util.inspect(schoolClone, false, null, true /* enable colors */));

// Do with another way : update and clone accordingly
const school1 = {
  ...school,
  classes: [
    ...school.classes.map((cla) =>
      cla.name === "1A"
        ? { ...cla, pupils: [...cla.pupils, { name: "Jack" }] }
        : cla
    ),
  ],
};

// console.log("school1:");
// console.log(JSON.stringify(school1, null, 2));

const school2 = {
  ...school,
  classes: [
    ...school.classes,
    {
      name: "1B",
      pupils: [{ name: "Mary" }],
    },
  ],
};

// console.log("school2:");
// console.log(JSON.stringify(school2, null, 2));

const school3 = {
  ...school,
  classes: [
    ...school.classes.map(
      (cla) =>
        cla.name === "1A"
          ? {
              ...cla,
              pupils: cla.pupils.filter((pupil) => pupil.name !== "Jane"),
            }
          : cla // Remain the same pointer to old class
    ),
    {
      name: "2A",
      pupils: [school.classes[0].pupils.find((pupil) => pupil.name === "Jane")],
    },
  ],
};

// console.log("school3:");
// console.log(JSON.stringify(school3, null, 2));

console.log("====================================");
console.log("school:");
console.log(JSON.stringify(school, null, 2));
