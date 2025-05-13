
import "./App.scss";

import {cs}             from "./common/chain-services.js";
import {BackCard}       from "./components/back-card/back-card";
import {DetailsForm}    from "./components/details-form/details-form";
import {FrontCard}      from "./components/front-card/front-card";
import {ListSavedCards} from "./list-saved-cards.jsx";

export const App = () => cs(
  ["listSavedCards", (_, next) => ListSavedCards({next})],
  ["detailsForm", (_, next) => DetailsForm({next})],
  ({listSavedCards, detailsForm}) => (
    <div className="app-1hj">
      <div className="color-area">
        <img src={null} alt="" />
      </div>

      {BackCard({
        card: detailsForm.card,
        className: "back-card",
      })}

      {FrontCard({
        className: "front-card",
        card: detailsForm.card,
        validation: detailsForm.validation,
      })}

      {detailsForm.render({
        errors: detailsForm.validation.errors,
        className: "details-form",
        onSave: ({card, validation}) => {
          listSavedCards.addCardInfo({card, validation});
        },
      })}

      {listSavedCards.render()}

    </div>
  ),
);

