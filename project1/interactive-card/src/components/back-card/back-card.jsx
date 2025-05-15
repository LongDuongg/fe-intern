import cn from "classnames";
import "./back-card.scss";
import backCard from "../../assets/bg-card-back.png";

export const BackCard = ({ className, card }) => {
  return (
    <div className={cn("back-card-2bc", className)}>
      <img src={backCard} alt="" />
      <div className="cvc">{card?.cvc || "000"}</div>
    </div>
  );
};
