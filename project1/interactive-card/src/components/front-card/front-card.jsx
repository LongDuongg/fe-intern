import "./front-card.scss";
import cn from "classnames";

import frontCard from "../../assets/bg-card-front.png";
import logo from "../../assets/card-logo.png";
import iconComplete from "../../assets/icon-complete.png";

export const FrontCard = ({ className, card, validation }) => {
  const { name, number, expDate } = card || {};
  return (
    <div className={cn("front-card-2fc", className)}>
      <img className="card-logo" src={logo} alt="" />
      {validation.success && (
        <img className="icon-complete" src={iconComplete} alt="" />
      )}
      <img src={frontCard} alt=""></img>
      <div className="card-number">{number || "0000 0000 0000 0000"}</div>
      <div className="owner-name">{name || "Jane Appleseed"}</div>
      <div className="exp-date">
        {expDate?.month || "00"} / {expDate?.year || "00"}
      </div>
    </div>
  );
};
