import "./details-form.scss";
import cn from "classnames";
import FormGroup from "./form-group/form-group";
import Button from "./button/button";

function DetailsForm({ className }) {
  return (
    <div className={cn("details-form-1ms", className)}>
      <FormGroup label="Cardholder Name">
        <input type="text" placeholder="e.g. Jane Doe" />
      </FormGroup>
      <FormGroup label="Card number">
        <input type="text" placeholder="e.g. 1234 5678 9123 0000" />
      </FormGroup>

      <div className="flex-row">
        <FormGroup label="Exp. Date (MM/YY)">
          <input type="text" placeholder="MM" />
          <input type="text" placeholder="YY" />
        </FormGroup>
        <FormGroup label="CVC">
          <input type="text" placeholder="e.g. 123" />
        </FormGroup>
      </div>
      <Button label="Confirm" />
    </div>
  );
}

export default DetailsForm;
