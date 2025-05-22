const { cs } = require("../chain-services");
const { fragments } = require("./fragments");
const { Invoke } = require("./invoke");
const { keyed } = require("./keyed");
const { scope } = require("./scope");
const { State } = require("./state");

const Load2 = ({
  fetch,
  next,
  keepOutdatedValue,
  disabled,
  props,
  captureException = false,
  onLoad,
  _key,
}) =>
  cs(
    [
      "loaded",
      (_, next) =>
        State({
          // getInitValue: () => ({value: 123, key: _key}),
          next,
        }),
    ],
    ({ loaded }) => {
      const loading = loaded.value == null || loaded.value.key !== _key;

      return fragments(
        !disabled &&
          cs(keyed(_key), () =>
            Invoke({
              props,
              fn: async ({ isMounted, getLatestProps }) => {
                if (!loading) {
                  return;
                }
                try {
                  const value = await fetch({ getLatestProps });
                  if (!isMounted()) {
                    return;
                  }
                  loaded.onChange({ value, key: _key });
                } catch (exception) {
                  // console.log("exception", exception);
                  if (!isMounted()) {
                    return;
                  }

                  if (captureException) {
                    loaded.onChange({ exception, key: _key }, () =>
                      onLoad?.(exception),
                    );
                  } else {
                    throw exception;
                  }
                }
              },
            }),
          ),

        next &&
          next({
            loading,
            ...scope(loaded, ["value"]),
            value:
              !loaded.value || (_key !== loaded.value.key && !keepOutdatedValue)
                ? undefined
                : loaded.value.value,
            exception:
              !loaded.value || (_key !== loaded.value.key && !keepOutdatedValue)
                ? undefined
                : loaded.value.exception,
            // value: loading && !keepOutdatedValue ? undefined : loaded.value.value,
            reload: async () => {
              const value = await fetch({ getLatestProps: () => props });
              loaded.onChange({ value, key: _key });
            },
          }),
      );
    },
  );
exports.Load2 = Load2;
