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
import { setPath } from "./common/utils/arr-path.js";

function App() {
  return cs(
    ["card", ({}, next) => State({ initValue: {}, next })],
    ["errors", ({}, next) => State({ initValue: {}, next })],
    ({ card, errors }) => {
      console.log(errors);
      const validate = () => {
        const newErrors = {};
        const { name, number, expDate, cvc } = card.value;
        const currentYear = new Date().getFullYear() % 100; // get last two numbers

        // no name but use trim() to prevent empty spaces
        if (!name?.trim()) {
          newErrors.name = "Cardholder name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
          newErrors.name = "Name must contain only letters.";
        }

        // no number but use trim() to prevent empty spaces
        if (!number?.trim()) {
          newErrors.number = "Card number is required.";
        } else if (!/^\d{16}$/.test(number.replace(/\s+/g, ""))) {
          newErrors.number = "Card number must be 16 digits.";
        }

        // no month but use trim() to prevent empty spaces
        if (!expDate?.month.trim()) {
          newErrors.month = "Month is required.";
        } else if (!/^(0[1-9]|1[0-2])$/.test(month)) {
          newErrors.month = "Invalid month.";
        }

        // no year but use trim() to prevent empty spaces
        if (!expDate?.year.trim()) {
          newErrors.year = "Year is required.";
        } else if (!/^\d{2}$/.test(year) || parseInt(year) < currentYear) {
          newErrors.year = "Year is invalid or expired.";
        }

        // no number but use trim() to prevent empty spaces
        if (!cvc?.trim()) {
          newErrors.cvc = "CVC is required.";
        } else if (!/^\d{3}$/.test(cvc)) {
          newErrors.cvc = "CVC must be 3 digits.";
        }

        return newErrors;
      };

      const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
          console.log("Valid card info:", card.value);
          // API processing logic here
        } else {
          console.log("errors: ", validationErrors);
          errors.onChange(setPath(errors.value, [], validationErrors));
        }
      };

      return (
        <div className="app-1hj">
          <div className="color-area">
            <img src={null} alt="" />
          </div>
          <BackCard card={card} className="back-card" />
          <FrontCard className="front-card" card={card} />
          <DetailsForm
            card={card}
            errors={errors}
            handleSubmit={handleSubmit}
            className="details-form"
          />
          {/* <SampleCounter /> */}
        </div>
      );
    }
  );
}

export default App;
