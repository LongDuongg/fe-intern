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

// console.log(setData(school, "Luan"));
// 1.Add pupil named Jack to class 1A.
// 2.Add class named 1B having pupil named Mary to school.
// 3.Move Jane to class 1B.
// 4.Do the above 3 tasks without mutating the object school. Create a new object for each task.
