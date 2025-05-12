import "./details-form.scss";
import cn from "classnames";
import { cs } from "../../common/chain-services.js";
import { scope } from "../../common/react/scope.js";
import { bindInput } from "../../common/react/bind-input.js";

const DetailsForm = ({ card, errors, success, onSubmit, onSave, className }) =>
  cs(() => (
    <div className={cn("details-form-1ms", className)}>
      <div className="cardholder-name">
        <div className="label">{"Cardholder Name"}</div>

        <input
          className={errors?.name ? "error" : ""} // add error class if there is an error
          type="text"
          placeholder="e.g. Jane Doe"
          {...bindInput(scope(card, ["name"]))}
        />
        {errors?.name && <div className="error-message">{errors?.name}</div>}
      </div>

      <div className="card-number">
        <div className="label">{"Card Number"}</div>
        <input
          className={errors?.number ? "error" : ""} // add error class if there is an error
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
          {...bindInput(scope(card, ["number"]))}
        />
        {errors?.number && (
          <div className="error-message">{errors?.number}</div>
        )}
      </div>

      <div className="flex-row">
        <div className="exp-date">
          <div className="label">{"Exp. Date (MM/YY)"}</div>
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
          <div className="error-message">
            {errors?.["expDate.month"] || errors?.["expDate.year"]}
          </div>
        </div>

        <div className="cvc">
          <div className="label">{"CVC"}</div>
          <input
            className={errors?.cvc ? "error" : ""} // add error class if there is an error
            type="text"
            placeholder="e.g. 123"
            {...bindInput(scope(card, ["cvc"]))}
          />
          {errors?.cvc && <div className="error-message">{errors?.cvc}</div>}
        </div>
      </div>

      <button className="confirm-btn" onClick={() => onSubmit()}>
        Confirm
      </button>
      {/* {success && ( */}
      <button className="save-btn" onClick={() => onSave()}>
        Save
      </button>
      {/* )} */}
    </div>
  ));

export default DetailsForm;
