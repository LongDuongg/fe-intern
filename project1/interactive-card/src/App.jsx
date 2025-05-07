import "./App.scss";
import FrontCard from "./components/front-card/front-card";
import BackCard from "./components/back-card/back-card";
import backgroundImage from "./assets/bg-main-mobile.png";
import Sample1 from "./components/sample1";
import Sample2 from "./components/sample2";
import DetailsForm from "./components/details-form/details-form";
import { SampleCounter } from "./components/sample3";
import { cs } from "./common/chain-services.js";
import { State } from "./common/react/state.js";
import { getPath, setPath } from "./common/utils/arr-path.js";

function App() {
  return cs(
    [
      "savedCards",
      ({}, next) => State({ initValue: [], next, name: "savedCards" }),
    ],
    ["card", ({}, next) => State({ initValue: null, next, name: "cards" })],
    [
      "validation",
      ({}, next) => State({ initValue: {}, next, name: "validation" }),
    ],
    ({ card, validation, savedCards }) => {
      console.log(savedCards.value);
      const validate = () => {
        const newErrors = {};

        for (const { field, validators } of formValidation) {
          for (const { validate, message } of validators) {
            if (!validate(getPath(card.value, field.split(".")))) {
              newErrors[field] = message;
              break;
            }
          }
        }
        return newErrors;
      };

      const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
          console.log("Valid card info:", card.value);
          validation.onChange({ success: true });
          // API processing logic here
        } else {
          // console.log("errors: ", validationErrors);
          validation.onChange({ errors: validationErrors });
        }
      };

      const saveCardInfo = () => {
        const cardInfo = {
          name: card.value.name,
          number: card.value.number,
          expDate: {
            month: card.value.expDate.month,
            year: card.value.expDate.year,
          },
          cvc: card.value.cvc,
        };
        savedCards.onChange([cardInfo, ...savedCards.value]);
        card.onChange(null);
        validation.onChange({ success: false });
      };

      return (
        <div className="app-1hj">
          <div className="color-area">
            <img src={null} alt="" />
          </div>
          <BackCard card={card} className="back-card" />
          <FrontCard
            className="front-card"
            card={card}
            validation={validation}
          />
          <DetailsForm
            card={card}
            errors={validation.value.errors}
            success={validation.value.success}
            onSubmit={handleSubmit}
            onSave={saveCardInfo}
            className="details-form"
          />
          <div className="list-saved-cards">
            {savedCards.value.map((savedCard, index) => (
              <div key={index} className="saved-card">
                <div className="saved-card-name">Name : {savedCard.name}</div>
                <div className="saved-card-number">
                  Number : {savedCard.number}
                </div>
                <div className="saved-card-exp-date">
                  EXP. DATE : {savedCard.expDate.month}/{savedCard.expDate.year}
                </div>
                <div className="saved-card-cvc">CVC : {savedCard.cvc}</div>
                <button onClick={() => card.onChange(savedCard)}>edit</button>
              </div>
            ))}
            {savedCards.value.length === 0 && (
              <div className="no-saved-cards">No saved cards</div>
            )}
          </div>
        </div>
      );
    }
  );
}

export default App;

const required = (message) => {
  return {
    validate: (value) => {
      return value != null && value !== "";
    },
    message: message || "This field is required.",
  };
};

const formValidation = [
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
