const { createContext, createElement: h } = require("react");

const { cache1 } = require("../utils/cache1");

const { cs } = require("../chain-services");

const ctxPairs = cache1(() => createContext(null));

const provideContext = (key, value, next) =>
  h(ctxPairs(key).Provider, { value }, next(value));
exports.provideContext = provideContext;

const provideContextM = (values, next) =>
  cs(
    ...Object.keys(values).map(
      (key) => (_, next) =>
        h(ctxPairs(key).Provider, { value: values[key] }, next()),
    ),
    next,
  );
exports.provideContextM = provideContextM;

const consumeContext = (name, as) => [
  as || name,
  (_, next) => consumeContext2({ name, next }),
];
exports.consumeContext = consumeContext;
exports.consumeContext1 = consumeContext;

const consumeContext2 = ({ name, next }) =>
  h(ctxPairs(name).Consumer, {}, next);
exports.consumeContext2 = consumeContext2;

const changeContext = (name, fn, next) =>
  cs(consumeContext(name), (params) =>
    provideContext(name, fn(params[name]), next),
  );
exports.changeContext = changeContext;
