import "./details-form.scss";
import cn from "classnames";
import FormGroup from "./form-group/form-group";
import { cs } from "../../common/chain-services.js";
import { scope } from "../../common/react/scope.js";
import { bindInput } from "../../common/react/bind-input.js";

function DetailsForm({ card, className }) {
  return cs(() => {
    return (
      <div className={cn("details-form-1ms", className)}>
        <FormGroup label="Cardholder Name">
          <input
            type="text"
            placeholder="e.g. Jane Doe"
            {...bindInput(scope(card, ["name"]))}
          />
        </FormGroup>

        <FormGroup label="Card number">
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            {...bindInput(scope(card, ["number"]))}
          />
        </FormGroup>

        <div className="flex-row">
          <FormGroup className="exp-date" label="Exp. Date (MM/YY)">
            <input
              type="text"
              placeholder="MM"
              {...bindInput(scope(card, ["expDate", "month"]))}
            />
            <input
              type="text"
              placeholder="YY"
              {...bindInput(scope(card, ["expDate", "year"]))}
            />
          </FormGroup>

          <FormGroup className="cvc" label="CVC">
            <input
              type="text"
              placeholder="e.g. 123"
              {...bindInput(scope(card, ["cvc"]))}
            />
          </FormGroup>
        </div>
        <button className="confirm-btn">Confirm</button>
      </div>
    );
  });
}

export default DetailsForm;
