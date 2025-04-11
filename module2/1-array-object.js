const filter = (array, callback) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

exports.filter = filter;

// Array.prototype.filter2 = function (callback) {
//   let result = [];
//   for (let i = 0; i < this.length; i++) {
//     if (callback(this[i])) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

// =========================================================================

const remove = (element, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == element) {
      array.splice(i, 1);
    }
  }
  return array;
};

exports.remove = remove;

// Array.prototype.remove2 = function (element) {
//   for (let i = 0; i < this.length; i++) {
//     if (deepEqual(this[i], element)) {
//       this.splice(i, 1);
//     }
//   }
//   return this;
// };

// =========================================================================

const without = (array, callback) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

exports.without = without;

// Array.prototype.without2 = function (callback) {
//   let result = [];
//   for (let i = 0; i < this.length; i++) {
//     if (!callback(this[i])) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

// =========================================================================

const merge = (obj1, obj2) => {
  let result = {};
  for (const key in obj1) {
    result[key] = obj1[key];
  }
  for (const key in obj2) {
    result[key] = obj2[key];
  }
  return result;
};

const merge2 = (...objs) => {
  let result = {};
  for (const obj of objs) {
    for (const key in obj) {
      result[key] = obj[key] !== null ? obj[key] : result[key];
    }
  }
  return result;
};

exports.merge = merge2;

// =========================================================================

const addToListMap = (key, value, listMap) => {
  if (listMap[key]) {
    listMap[key].push(value);
  } else {
    listMap[key] = [value];
  }

  return listMap;
};

exports.addToListMap = addToListMap;

// =========================================================================

const clone = (obj) => {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }
  let result = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = Array.isArray(obj[key])
        ? obj[key].map((item) => clone(item))
        : clone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};
exports.clone = clone;

// =========================================================================

const sortByDistance = (array, point) => {
  const distance = (a, b) => {
    return Math.abs(a - b);
  };
  return array.sort((a, b) => distance(a, point) - distance(b, point));
};

exports.sortByDistance = sortByDistance;

// =========================================================================

const sort = (array, getValue = (v) => v) => {
  const compareFunc = (a, b) => {
    if (getValue(a) > getValue(b)) {
      return 1;
    } else if (getValue(a) < getValue(b)) {
      return -1;
    }
    return 0;
  };
  return array.sort(compareFunc);
};

exports.sort = sort;

// =========================================================================

const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 === null || obj2 === null) {
    return false;
  }

  if (typeof obj1 === "object" || typeof obj2 === "object") {
    for (const key in obj1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    for (const key in obj2) {
      if (obj1[key] === undefined && obj2[key] !== undefined) {
        return false;
      }
    }
    return true;
  }
  return false;
};

exports.deepEqual = deepEqual;

// =========================================================================

const getData = (obj, path) => {
  if (path.length === 0) {
    return obj;
  }
  if (obj === null) {
    return undefined;
  }
  const [currentKey, ...restKeys] = path;
  return getData(obj[currentKey], restKeys);
};
exports.getData = getData;

// =========================================================================

const setData = (obj, keys, value) => {
  if (keys.length === 0 || keys == null) {
    return value;
  }

  let clonedObj = Array.isArray(obj) ? [...obj] : { ...obj };

  const [currentKey, ...restKeys] = keys;

  if (typeof obj[currentKey] === "object") {
    clonedObj[currentKey] = Array.isArray(obj[currentKey])
      ? [
          ...clonedObj[currentKey].map((item, index) => {
            if (index === restKeys[0]) {
              return setData(item, restKeys.slice(1), value);
            }
            return item;
          }),
        ]
      : {
          ...obj[currentKey],
          [restKeys[0]]: setData(restKeys[0], restKeys.slice(1), value),
        };
  }

  return clonedObj;
};

const setData2 = (obj, path, value) => {
  if (path.length === 0 || path == null) {
    return value;
  }
  let clonedObj = Array.isArray(obj) ? [...obj] : { ...obj };

  const [currentKey, ...restKeys] = path;

  if (restKeys.length === 0 || restKeys == null) {
    clonedObj[currentKey] = value;
    return clonedObj;
  }

  const [currentKey1, ...restKeys1] = restKeys;

  if (Array.isArray(obj[currentKey])) {
    let clonedObj1 = [...obj[currentKey]];
    clonedObj1[currentKey1] = setData(
      obj[currentKey][currentKey1],
      restKeys1,
      value
    );
    clonedObj[currentKey] = clonedObj1;
  } else {
    let clonedObj1 = { ...obj[currentKey] };
    clonedObj1[currentKey1] = setData(
      obj[currentKey][currentKey1],
      restKeys1,
      value
    );
    clonedObj[currentKey] = clonedObj1;
  }

  return clonedObj;
};

exports.setData = setData;
