import "./details-form.scss";
import cn from "classnames";
import { cs } from "../../common/chain-services.js";
import { scope } from "../../common/react/scope.js";
import { bindInput } from "../../common/react/bind-input.js";
import { setPath } from "../../common/utils/arr-path.js";

const DetailsForm = ({
  card,
  errors,
  showErrors,
  success,
  onSubmit,
  onSave,
  className,
}) =>
  cs(() => (
    <div className={cn("details-form-1ms", className)}>
      <div className="cardholder-name">
        <div className="label">{"Cardholder Name"}</div>

        <input
          className={errors?.name && showErrors?.value.name ? "error" : ""} // add error class if there is an error
          type="text"
          placeholder="e.g. Jane Doe"
          {...bindInput(scope(card, ["name"]))}
          onKeyDown={() => {
            showErrors?.onChange(setPath(showErrors?.value, ["name"], true));
          }}
        />
        {errors?.name && showErrors?.value.name && (
          <div className="error-message">{errors?.name}</div>
        )}
      </div>

      <div className="card-number">
        <div className="label">{"Card Number"}</div>
        <input
          className={errors?.number && showErrors?.value.number ? "error" : ""} // add error class if there is an error
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
          {...bindInput(scope(card, ["number"]))}
          onKeyDown={() => {
            showErrors?.onChange(setPath(showErrors?.value, ["number"], true));
          }}
        />
        {errors?.number && showErrors?.value.number && (
          <div className="error-message">{errors?.number}</div>
        )}
      </div>

      <div className="flex-row">
        <div className="exp-date">
          <div className="label">{"Exp. Date (MM/YY)"}</div>
          <input
            className={
              errors?.["expDate.month"] && showErrors?.value["expDate.month"]
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
              errors?.["expDate.year"] && showErrors?.value["expDate.year"]
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

        <div className="cvc">
          <div className="label">{"CVC"}</div>
          <input
            className={errors?.cvc && showErrors?.value.cvc ? "error" : ""} // add error class if there is an error
            type="text"
            placeholder="e.g. 123"
            {...bindInput(scope(card, ["cvc"]))}
            onKeyDown={() => {
              showErrors?.onChange(setPath(showErrors?.value, ["cvc"], true));
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
      <button className="save-btn" onClick={() => onSave()}>
        Save
      </button>
      {/* )} */}
    </div>
  ));

export default DetailsForm;
