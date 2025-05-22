function remove1Mutate(col, targetElem) {
  if (col == null) {
    return;
  }

  let i = col.indexOf(targetElem);
  if (i === -1) {
    return;
  }
  col.splice(i, 1);
}
exports.remove1Mutate = remove1Mutate;

function addRemove(col) {
  return (element) => {
    col.push(element);

    return () => remove1Mutate(col, element);
  };
}
exports.addRemove = addRemove;

function replace1(col, target, with1) {
  return col.map((e) => (e === target ? with1 : e));
}
exports.replace1 = replace1;

function createArray(length) {
  if (isNaN(length)) {
    throw "[createArray] Length is not a number: " + length;
  }
  return new Array(length).fill(0).map((_, i) => i);
}
exports.createArray = createArray;
