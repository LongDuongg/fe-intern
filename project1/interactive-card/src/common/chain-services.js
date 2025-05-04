function cs() {
  return gather(arguments, {}, 0);
}
exports.cs = cs;

const gather = (chain, prev, index) => {
  // console.log(`prev: ${JSON.stringify(prev)}`);
  // console.log(`index: ${index}`);
  const first = chain[index];
  let name;
  let fn;
  if (Array.isArray(first)) {
    name = first[0];
    fn = first[1];
  } else if (typeof first === "object") {
    name = first.name;
    fn = first.load;
  } else {
    fn = first;
  }

  return fn(
    prev,
    chain.length <= index + 1
      ? null
      : (value) => {
          // console.log(`value: ${value}`);
          // console.log(`value: ${JSON.stringify(value)}`);
          let values;
          if (name != null && name !== "") {
            values = Object.assign({}, prev);
            values[name] = value;
          } else {
            values = prev;
          }
          // console.log(`values: ${JSON.stringify(values)}`);
          return gather(chain, values, index + 1);
        }
  );
};
