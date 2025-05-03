import "./form-group.scss";
import cn from "classnames";
import { State } from "../../../common/react/state.js";
import { cs } from "../../../common/chain-services.js";

function FormGroup({ label, children }) {
  // return (
  //   <div className={cn("form-group-1ms", "form-group", className)}>
  //     <div className="label">{label}</div>
  //     {children}
  //   </div>
  // );

  return cs(
    ({}, next) => State({ initValue: "", next }),
    () => {
      return (
        <div className={cn("form-group-1ms", "form-group")}>
          <div className="label">{label}</div>
          {children}
        </div>
      );
    }
  );
}

export default FormGroup;
