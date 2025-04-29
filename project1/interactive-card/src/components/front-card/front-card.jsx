import "./front-card.scss";
import cn from "classnames";
import logo from "../../assets/card-logo.png";
import frontCard from "../../assets/bg-card-front.png";

function FrontCard({ className, cardNumber, cardHolder, expDate }) {
  return (
    <div className={cn("front-card-2fc", className)}>
      <img className="card-logo" src={logo} alt=""></img>
      <img src={frontCard} alt=""></img>
      <div className="card-number">{cardNumber}</div>
      <div className="owner-name">{cardHolder}</div>
      <div className="exp-date">{expDate}</div>
    </div>
  );
}

export default FrontCard;
