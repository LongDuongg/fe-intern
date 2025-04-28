import "./front-card.scss";
import cn from "classnames";

import frontCard from "../assets/bg-card-front.png";

function FrontCard({ className }) {
  return (
    <div className={cn("front-card-2fc", className)}>
      <img src={frontCard} alt=""></img>
    </div>
  );
}

export default FrontCard;
