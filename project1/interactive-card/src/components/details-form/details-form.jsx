import "./details-form.scss";
import cn from "classnames";
import InputField from "./input-field/input-field";
import Button from "./button/button";

function DetailsForm({ className }) {
  return (
    <div className={cn("details-form-1ms", className)}>
      <InputField
        label="Cardholder Name"
        placeholder="e.g. Jane Appleseed"
        type="text"
      />
      <InputField
        label="Card number"
        placeholder="e.g. 1234 5678 9123 4567"
        type="text"
      />
      <Button label="Confirm" />
    </div>
  );
}

export default DetailsForm;
