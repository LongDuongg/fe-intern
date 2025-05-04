import "./form-group.scss";
import cn from "classnames";

function FormGroup({ label, children }) {
  return (
    <div className={cn("form-group-1ms", "form-group")}>
      <div className="label">{label}</div>
      {children}
    </div>
  );
}

export default FormGroup;
