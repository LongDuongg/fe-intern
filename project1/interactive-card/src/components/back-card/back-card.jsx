import "./back-card.scss";
import cn from "classnames";
import backCard from "../../assets/bg-card-back.png";

function BackCard({ className }) {
  return (
    <div className={cn("back-card-2bc", className)}>
      <img src={backCard} alt="" />
    </div>
  );
}

export default BackCard;
