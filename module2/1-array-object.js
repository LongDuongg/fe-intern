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

Array.prototype.filter2 = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

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

// =========================================================================

const remove = (element, array) => {
  for (let i = 0; i < array.length; i++) {
    if (deepEqual(array[i], element)) {
      array.splice(i, 1);
    }
  }
  return array;
};

exports.remove = remove;

Array.prototype.remove2 = function (element) {
  for (let i = 0; i < this.length; i++) {
    if (deepEqual(this[i], element)) {
      this.splice(i, 1);
    }
  }
  return this;
};

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

Array.prototype.without2 = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

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
    listMap[key] = value;
  }

  return listMap;
};

exports.addToListMap = addToListMap;

// =========================================================================

const sortByDistance = (array, point) => {
  const distance = (a, b) => {
    return Math.abs(a - b);
  };
  return array.sort((a, b) => distance(a, point) - distance(b, point));
};

exports.sortByDistance = sortByDistance;

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

const setData = (obj, keys, value) => {
  if (keys.length === 0 || keys == null) {
    return value;
  }

  const [currentKey, ...restKeys] = keys;

  if (typeof obj[currentKey] === "object") {
    obj[currentKey] = Array.isArray(obj[currentKey])
      ? [
          ...obj[currentKey].map((item, index) => {
            if (index === restKeys[0]) {
              return setData(obj[currentKey], restKeys, value);
            }
            return item;
          }),
        ]
      : {
          ...obj[currentKey],
          [restKeys]: setData(obj[currentKey], restKeys, value),
        };
  } else {
    obj[currentKey] = setData(obj[currentKey], restKeys, value);
  }

  return obj[currentKey];
};

exports.setData = setData;
