const cache1 = (fn, getKey = (v) => v) => {
  let cache = {};

  return (param) => {
    const key = getKey(param);
    if (!cache.hasOwnProperty(key)) {
      cache[key] = fn(param);
    }
    return cache[key];
  };
};

exports.cache1 = cache1;
