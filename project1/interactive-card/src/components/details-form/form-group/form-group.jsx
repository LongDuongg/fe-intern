import "./form-group.scss";
import cn from "classnames";

function FormGroup({ label, children, className, message }) {
  return (
    <div className={cn("form-group-1ms", "form-group", className)}>
      <div className="label">{label}</div>
      {children}
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default FormGroup;
