import "./back-card.scss";
import cn from "classnames";
import backCard from "../../assets/bg-card-back.png";

const BackCard = ({ className, card }) => {
  return (
    <div className={cn("back-card-2bc", className)}>
      <img src={backCard} alt="" />
      <div className="cvc">{card.value?.cvc || "000"}</div>
    </div>
  );
};

export default BackCard;
