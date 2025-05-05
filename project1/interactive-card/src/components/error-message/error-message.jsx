import "./error-message.scss";
import cn from "classnames";

function ErrorMessage({ message, className }) {
  return (
    <div className={cn("error-message-1ms", className)}>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default ErrorMessage;
