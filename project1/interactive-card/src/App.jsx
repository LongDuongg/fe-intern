import "./App.scss";
import FrontCard from "./components/front-card/front-card";
import BackCard from "./components/back-card/back-card";
import backgroundImage from "./assets/bg-main-mobile.png";
import Sample1 from "./components/sample1";
import Sample2 from "./components/sample2";
import DetailsForm from "./components/details-form/details-form";
import { SampleCounter } from "./components/sample3";

function App() {
  return (
    <div className="app-1hj">
      <div className="color-area">
        <img src={null} alt="" />
      </div>
      <BackCard className="back-card" />
      <FrontCard
        className="front-card"
        cardNumber="0000 0000 0000 0000"
        cardHolder="Jane Appleseed"
        expDate="00/00"
      />
      <DetailsForm className="details-form" />
      {/* <SampleCounter /> */}
    </div>
  );
}

export default App;
