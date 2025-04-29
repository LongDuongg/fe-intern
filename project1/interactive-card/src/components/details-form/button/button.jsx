import "./button.scss";

function Button({ className, label, onClick }) {
  return (
    <button className={`button-1ms ${className}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
