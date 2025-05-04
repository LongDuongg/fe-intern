import "./form-group.scss";
import cn from "classnames";

function FormGroup({ label, children, className }) {
  return (
    <div className={cn("form-group-1ms", "form-group", className)}>
      <div className="label">{label}</div>
      {children}
    </div>
  );
}

export default FormGroup;
