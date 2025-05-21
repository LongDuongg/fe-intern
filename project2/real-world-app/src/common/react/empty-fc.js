const { createElement } = require("react");

const EmptyFC = ({ next }) => createElement(EmptyFC1, { next });
exports.EmptyFC = EmptyFC;

const EmptyFC1 = ({ next }) => next();
