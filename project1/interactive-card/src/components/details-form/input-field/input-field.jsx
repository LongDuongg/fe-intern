import "./input-field.scss";
import cn from "classnames";

function InputField({ className, label, type, placeholder, value, onChange }) {
  return (
    <div className={cn("input-field-1ms", className)}>
      <label className="label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
