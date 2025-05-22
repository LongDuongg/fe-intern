const { cs } = require("../chain-services");
const { Load2 } = require("./load2");

// For captureException, please use Load2
const Load = ({
  fetch,
  keepOutdatedValue = false,
  disabled,
  next,
  props,
  _key,
}) =>
  cs(
    [
      "load2",
      ({}, next) =>
        Load2({
          keepOutdatedValue,
          disabled,
          fetch,
          _key,
          props,
          next,
        }),
    ],
    ({ load2 }) => next && next(load2.value),
  );
exports.Load = Load;
