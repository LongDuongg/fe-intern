import cn from "classnames";

import "./details-form.scss";

import { cs } from "../../common/chain-services.js";
import { bindInput } from "../../common/react/bind-input.js";
import { scope } from "../../common/react/scope.js";
import { State } from "../../common/react/state.js";
import { getPath, setPath } from "../../common/utils/arr-path.js";

export const DetailsForm = ({ next }) =>
  cs(
    [
      "card",
      ({}, next) =>
        State({
          initValue: {
            "name": "werwe",
            "number": "1231231231231311",
            "expDate": {
              "month": "12",
              "year": "12",
            },
            "cvc": "123",
          },
          next,
        }),
    ],

    [
      "validation",
      ({ card }, next) =>
        next(
          (() => {
            const cardDetails = card.value;
            const newErrors = {};

            for (const { field, validators } of formValidation()) {
              for (const { validate, message } of validators) {
                if (!validate(getPath(cardDetails, field.split(".")))) {
                  newErrors[field] = message;
                  break;
                }
              }
            }
            if (Object.keys(newErrors).length === 0) {
              return { success: true };
            } else {
              return { errors: newErrors };
            }
          })()
        ),
    ],

    ({ card, validation }) =>
      next({
        card: card.value,
        validation,
        render: ({ errors, onSave, className }) =>
          cs(
            ["showErrors", ({}, next) => State({ initValue: {}, next })],
            ({ showErrors }) => (
              <div className={cn("details-form-1ms", className)}>
                <div className="field cardholder-name">
                  <div className="label">{"Cardholder Name"}</div>

                  <input
                    className={
                      errors?.name && showErrors?.value.name ? "error" : ""
                    } // add error class if there is an error
                    type="text"
                    placeholder="e.g. Jane Doe"
                    {...bindInput(scope(card, ["name"]))}
                    onKeyDown={() => {
                      showErrors?.onChange(
                        setPath(showErrors?.value, ["name"], true)
                      );
                    }}
                  />
                  {errors?.name && showErrors?.value.name && (
                    <div className="error-message">{errors?.name}</div>
                  )}
                </div>

                <div className="field card-number">
                  <div className="label">{"Card Number"}</div>
                  <input
                    className={
                      errors?.number && showErrors?.value.number ? "error" : ""
                    } // add error class if there is an error
                    type="text"
                    placeholder="e.g. 1234 5678 9123 0000"
                    {...bindInput(scope(card, ["number"]))}
                    onKeyDown={() => {
                      showErrors?.onChange(
                        setPath(showErrors?.value, ["number"], true)
                      );
                    }}
                  />
                  {errors?.number && showErrors?.value.number && (
                    <div className="error-message">{errors?.number}</div>
                  )}
                </div>

                <div className="flex-row">
                  <div className="field exp-date">
                    <div className="label">{"Exp. Date (MM/YY)"}</div>
                    <input
                      className={
                        errors?.["expDate.month"] &&
                        showErrors?.value["expDate.month"]
                          ? "error"
                          : ""
                      } // add error class if there is an error
                      type="text"
                      placeholder="MM"
                      {...bindInput(scope(card, ["expDate", "month"]))}
                      onKeyDown={() => {
                        showErrors.onChange(
                          setPath(showErrors?.value, ["expDate.month"], true)
                        );
                      }}
                    />
                    <input
                      className={
                        errors?.["expDate.year"] &&
                        showErrors?.value["expDate.year"]
                          ? "error"
                          : ""
                      } // add error class if there is an error
                      type="text"
                      placeholder="YY"
                      {...bindInput(scope(card, ["expDate", "year"]))}
                      onKeyDown={() => {
                        showErrors.onChange(
                          setPath(showErrors?.value, ["expDate.year"], true)
                        );
                      }}
                    />
                    <div className="error-message">
                      {(errors?.["expDate.month"] &&
                        showErrors?.value["expDate.month"] &&
                        errors?.["expDate.month"]) ||
                        (errors?.["expDate.year"] &&
                          showErrors?.value["expDate.year"] &&
                          errors?.["expDate.year"])}
                    </div>
                  </div>

                  <div className="field cvc">
                    <div className="label">{"CVC"}</div>
                    <input
                      {...{
                        className:
                          errors?.cvc && showErrors?.value.cvc ? "error" : "",
                        // add error class if there is an error
                        type: "text",
                        placeholder: "e.g. 123",
                        ...bindInput(scope(card, ["cvc"])),
                        onKeyDown: () => {
                          showErrors?.onChange(
                            setPath(showErrors?.value, ["cvc"], true)
                          );
                        },
                      }}
                    />

                    {errors?.cvc && showErrors?.value.cvc && (
                      <div className="error-message">{errors?.cvc}</div>
                    )}
                  </div>
                </div>

                {/* <button className="confirm-btn" onClick={() => onSubmit()}>
        Confirm
      </button> */}
                {/* {success && ( */}

                <button
                  {...{
                    className: "save-btn",
                    onClick: () => {
                      console.log(JSON.stringify(card.value, null, 2));
                      onSave({ card: card.value, validation });
                      showErrors.onChange({});
                      card.onChange(null);
                    },
                  }}
                >
                  Save
                </button>

                {/* )} */}
              </div>
            )
          ),
      })
  );

const formValidation = () => [
  {
    field: "name",
    validators: [
      required("Cardholder name is required."),
      {
        validate: (value) => {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: "Name must contain only letters.",
      },
    ],
  },
  {
    field: "number",
    validators: [
      required("Card number is required."),
      {
        validate: (value) => {
          //5105 1051 0510 5100
          return /^\d{16}$/.test(value.replace(/\s+/g, ""));
        },
        message: "Card number must be 16 digits.",
      },
    ],
  },
  // {
  //   field: "expDate",
  //   validators: [
  //     required("Month and Year is required."),
  //     {
  //       validate: (value) => {
  //         return value.month != null && value.month !== "";
  //       },
  //       message: "Month is required.",
  //     },
  //     {
  //       validate: (value) => {
  //         return /^(0[1-9]|1[0-2])$/.test(value.month);
  //       },
  //       message: "Invalid month.",
  //     },
  //     {
  //       validate: (value) => {
  //         return value.year != null && value.year !== "";
  //       },
  //       message: "Year is required.",
  //     },
  //     {
  //       validate: (value) => {
  //         return /^\d{2}$/.test(value.year);
  //       },
  //       message: "Invalid year.",
  //     },
  //   ],
  // },
  {
    field: "expDate.month",
    validators: [
      required("Month is required."),
      {
        validate: (value) => {
          return /^(0[1-9]|1[0-2])$/.test(value);
        },
        message: "Invalid month.",
      },
    ],
  },
  {
    field: "expDate.year",
    validators: [
      required("Year is required."),
      {
        validate: (value) => {
          return /^\d{2}$/.test(value);
        },
        message: "Invalid year.",
      },
    ],
  },
  {
    field: "cvc",
    validators: [
      required("CVC is required."),
      {
        validate: (value) => {
          return /^\d{3}$/.test(value);
        },
        message: "CVC must be 3 digits.",
      },
    ],
  },
];

const required = (message) => {
  return {
    validate: (value) => {
      return value != null && value !== "";
    },
    message: message || "This field is required.",
  };
};

// const A = () => createElement(A1, {});
//
// const B = () => {
//   return cs(
//     ["state", ({}, next) => State({ initValue: 0, next })],
//     ({ state }) => {
//       return (
//         <div>
//           <div>{state.value}</div>
//           <button onClick={() => state.onChange(state.value + 1)}>+</button>
//         </div>
//       );
//     }
//   );
// };

// const A1 = () => {
//   const [state, setState] = useState(0);
//   return (
//     <div>
//       <div>{state}</div>
//       <button onClick={() => setState(state + 1)}>+</button>
//     </div>
//   );
// };
