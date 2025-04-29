import "./form-group.scss";
import cn from "classnames";

function FormGroup({ className, label, children }) {
  return (
    <div className={cn("form-group-1ms", "form-group", className)}>
      <div className="label">{label}</div>
      {children}
    </div>
  );
}

export default FormGroup;
