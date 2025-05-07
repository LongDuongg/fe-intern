import "./details-form.scss";
import cn from "classnames";
import FormGroup from "./form-group/form-group";
import { cs } from "../../common/chain-services.js";
import { scope } from "../../common/react/scope.js";
import { bindInput } from "../../common/react/bind-input.js";

function DetailsForm({ card, errors, success, onSubmit, onSave, className }) {
  return cs(() => {
    return (
      <div className={cn("details-form-1ms", className)}>
        <FormGroup label="Cardholder Name" errorMessage={errors?.name}>
          <input
            className={errors?.name ? "error" : ""} // add error class if there is an error
            type="text"
            placeholder="e.g. Jane Doe"
            {...bindInput(scope(card, ["name"]))}
          />
        </FormGroup>

        <FormGroup label="Card number" errorMessage={errors?.number}>
          <input
            className={errors?.number ? "error" : ""} // add error class if there is an error
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            {...bindInput(scope(card, ["number"]))}
          />
        </FormGroup>

        <div className="flex-row">
          <FormGroup
            className="exp-date"
            label="Exp. Date (MM/YY)"
            errorMessage={errors?.["expDate.month"] || errors?.["expDate.year"]}
          >
            <input
              className={errors?.["expDate.month"] ? "error" : ""} // add error class if there is an error
              type="text"
              placeholder="MM"
              {...bindInput(scope(card, ["expDate", "month"]))}
            />

            <input
              className={errors?.["expDate.year"] ? "error" : ""} // add error class if there is an error
              type="text"
              placeholder="YY"
              {...bindInput(scope(card, ["expDate", "year"]))}
            />
          </FormGroup>

          <FormGroup className="cvc" label="CVC" errorMessage={errors?.cvc}>
            <input
              className={errors?.cvc ? "error" : ""} // add error class if there is an error
              type="text"
              placeholder="e.g. 123"
              {...bindInput(scope(card, ["cvc"]))}
            />
          </FormGroup>
        </div>

        <button className="confirm-btn" onClick={() => onSubmit()}>
          Confirm
        </button>
        {success && (
          <button className="save-btn" onClick={() => onSave()}>
            Save
          </button>
        )}
      </div>
    );
  });
}

export default DetailsForm;
