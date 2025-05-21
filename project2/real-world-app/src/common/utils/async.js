export const waitTimeout = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  });
};
