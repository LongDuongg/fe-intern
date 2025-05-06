import "./details-form.scss";
import cn from "classnames";
import FormGroup from "./form-group/form-group";
import { cs } from "../../common/chain-services.js";
import { scope } from "../../common/react/scope.js";
import { bindInput } from "../../common/react/bind-input.js";
import ErrorMessage from "../error-message/error-message.jsx";

function DetailsForm({ card, errors, onSubmit, className }) {
  return cs(() => {
    return (
      <div className={cn("details-form-1ms", className)}>
        <FormGroup label="Cardholder Name">
          <input
            className={errors?.value.name ? "error" : ""} // add error class if there is an error
            type="text"
            placeholder="e.g. Jane Doe"
            {...bindInput(scope(card, ["name"]))}
          />
          <ErrorMessage
            message={errors?.value.name}
            className={"error-message"}
          />
        </FormGroup>

        <FormGroup label="Card number">
          <input
            className={errors?.value.number ? "error" : ""} // add error class if there is an error
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            {...bindInput(scope(card, ["number"]))}
          />
          <ErrorMessage
            message={errors?.value.number}
            className={"error-message"}
          />
        </FormGroup>

        <div className="flex-row">
          <FormGroup className="exp-date" label="Exp. Date (MM/YY)">
            <input
              className={errors?.value["expDate.month"] ? "error" : ""} // add error class if there is an error
              type="text"
              placeholder="MM"
              {...bindInput(scope(card, ["expDate", "month"]))}
            />

            <input
              className={errors?.value["expDate.year"] ? "error" : ""} // add error class if there is an error
              type="text"
              placeholder="YY"
              {...bindInput(scope(card, ["expDate", "year"]))}
            />

            <ErrorMessage
              message={
                errors?.value["expDate.month"] || errors?.value["expDate.year"]
              }
              className={"error-message"}
            />
          </FormGroup>

          <FormGroup className="cvc" label="CVC">
            <input
              className={errors?.value.cvc ? "error" : ""} // add error class if there is an error
              type="text"
              placeholder="e.g. 123"
              {...bindInput(scope(card, ["cvc"]))}
            />
            <ErrorMessage
              message={errors?.value.cvc}
              className={"error-message"}
            />
          </FormGroup>
        </div>
        <button className="confirm-btn" onClick={() => onSubmit()}>
          Confirm
        </button>
      </div>
    );
  });
}

export default DetailsForm;
