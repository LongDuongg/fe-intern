import "./App.scss";

import { cs } from "./common/chain-services.js";
import { BackCard } from "./components/back-card/back-card";
import { DetailsForm } from "./components/details-form/details-form";
import { FrontCard } from "./components/front-card/front-card";
import { ListSavedCards } from "./components/list-saved-cards/list-saved-cards.jsx";

export const App = () =>
  cs(
    ["listSavedCards", (_, next) => ListSavedCards({ next })],
    ["detailsForm", (_, next) => DetailsForm({ next })],
    ({ listSavedCards, detailsForm }) => (
      <div className="app-1hj">
        <div className="color-area">
          <img src={null} alt="" />
        </div>

        <div className="back-card">
          {BackCard({
            card: detailsForm.card,
          })}
        </div>

        <div className="front-card">
          {FrontCard({
            card: detailsForm.card,
            validation: detailsForm.validation,
          })}
        </div>

        <div className="details-form-and-list">
          <div className="details-form">
            {detailsForm.render({
              errors: detailsForm.validation.errors,
              onSave: ({ card, validation }) => {
                listSavedCards.addCardInfo({ card, validation });
              },
            })}
          </div>

          <div className="list-saved-cards">{listSavedCards.render({})}</div>
        </div>
      </div>
    )
  );
