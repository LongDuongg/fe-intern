import "./front-card.scss";
import cn from "classnames";
import logo from "../../assets/card-logo.png";
import frontCard from "../../assets/bg-card-front.png";

function FrontCard({ className, card }) {
  const { name, number, expDate } = card.value;
  return (
    <div className={cn("front-card-2fc", className)}>
      <img className="card-logo" src={logo} alt=""></img>
      <img src={frontCard} alt=""></img>
      <div className="card-number">{number || "0000 0000 0000 0000"}</div>
      <div className="owner-name">{name || "Jane Appleseed"}</div>
      <div className="exp-date">
        {expDate?.month || "00"} / {expDate?.year || "00"}
      </div>
    </div>
  );
}

export default FrontCard;
