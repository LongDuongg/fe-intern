const { cs } = require("../chain-services");
const { State } = require("./state");

const rLsStore = (key, defaultValue) => {
  const lsJson = cLsJson(key);
  return (_, next) =>
    cs(
      [
        "v",
        (_, next) =>
          State({
            getInitValue: () => lsJson.get() || defaultValue,
            next,
          }),
      ],
      ({ v }) =>
        next({
          value: v.value,
          onChange: (v1) => {
            lsJson.set(v1);
            v.onChange(v1);
          },
        }),
    );
};
exports.rLsStore = rLsStore;

const cLsJson = !(typeof window !== "undefined")
  ? () => ({
      get: () => {},
      set: () => {},
    })
  : (key) => ({
      get: () => {
        const cacheStr = localStorage.getItem(key);

        if (cacheStr == null) {
          return undefined;
        }

        return JSON.parse(cacheStr);
      },
      set: (value) => {
        if (value == null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      },
    });
exports.cLsJson = cLsJson;
