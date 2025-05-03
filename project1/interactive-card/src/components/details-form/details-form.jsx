import "./details-form.scss";
import cn from "classnames";
import FormGroup from "./form-group/form-group";
import Button from "./button/button";
import { cs } from "../../common/chain-services.js";

function DetailsForm({ className }) {
  return (
    <div className={cn("details-form-1ms", className)}>
      {cs(
        [
          "formGroup",
          ({}, next) =>
            FormGroup({ label: "Cardholder Name", children: next() }),
        ],
        ({ formGroup }) => (
          <input
            type="text"
            placeholder="e.g. Jane Doe"
            // value={formGroup.value}
            // onChange={formGroup.onChange(value)}
          />
        )
      )}

      {cs(
        [
          "formGroup",
          ({}, next) =>
            FormGroup({ label: "Cardholder Number", children: next() }),
        ],
        ({ formGroup }) => (
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            // value={formGroup.value}
            // onChange={formGroup.onChange(value)}
          />
        )
      )}

      <div className="flex-row">
        {cs(
          [
            "formGroup",
            ({}, next) =>
              FormGroup({ label: "Exp. Date (MM/YY)", children: next() }),
          ],
          ({ formGroup }) => (
            <>
              <input type="text" placeholder="MM" />
              <input type="text" placeholder="YY" />
            </>
          )
        )}

        {cs(
          [
            "formGroup",
            ({}, next) => FormGroup({ label: "CVC", children: next() }),
          ],
          ({ formGroup }) => (
            <input
              type="text"
              placeholder="e.g. 123"
              // value={formGroup.value}
              // onChange={formGroup.onChange(value)}
            />
          )
        )}
      </div>
      <Button label={"Confirm"} />
    </div>
  );
}

export default DetailsForm;
