import "./App.scss";
import FrontCard from "./components/front-card/front-card";
import BackCard from "./components/back-card/back-card";
import backgroundImage from "./assets/bg-main-mobile.png";
import Sample1 from "./components/sample1";
import Sample2 from "./components/sample2";
import DetailsForm from "./components/details-form/details-form";
import { SampleCounter } from "./components/sample3";
import { cs } from "./common/chain-services.js";
import { State } from "./common/react/state.js";

function App() {
  return cs(
    ["card", ({}, next) => State({ initValue: {}, next })],
    ({ card }) => {
      console.log(card.value);
      return (
        <div className="app-1hj">
          <div className="color-area">
            <img src={null} alt="" />
          </div>
          <BackCard card={card} className="back-card" />
          <FrontCard className="front-card" card={card} />
          <DetailsForm card={card} className="details-form" />
          {/* <SampleCounter /> */}
        </div>
      );
    }
  );
}

export default App;
