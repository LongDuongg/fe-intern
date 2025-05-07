import "./form-group.scss";
import cn from "classnames";

function FormGroup({ label, children, className, errorMessage }) {
  return (
    <div className={cn("form-group-1ms", "form-group", className)}>
      <div className="label">{label}</div>
      {children}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default FormGroup;
