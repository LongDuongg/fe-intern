import "./list-saved-cards.scss";
import cn from "classnames";
import { cs } from "../../common/chain-services.js";
import { State } from "../../common/react/state.js";

export const ListSavedCards = ({ next }) =>
  cs(
    ["savedCards", ({}, next) => State({ initValue: [], next })],
    ({ savedCards }) =>
      next({
        addCardInfo: ({ card, validation }) => {
          if (card.id) {
            const updatedCards = savedCards.value.map((savedCard) =>
              savedCard.details.id === card.id
                ? {
                    details: card,
                    validation,
                  }
                : savedCard
            );
            savedCards.onChange(updatedCards);
          } else {
            savedCards.onChange([
              {
                details: { id: generateId(), ...card },
                validation,
              },
              ...savedCards.value,
            ]);
          }
        },
        render: ({ className }) => (
          <div className={cn("list-saved-cards-1lsc", className)}>
            {savedCards.value.map((savedCard, index) => (
              <div
                key={index}
                className={cn(
                  "saved-card",
                  savedCard.validation.success ? "valid" : "invalid"
                )}
              >
                <div className="row saved-card-name">
                  Name : {savedCard.details.name}
                </div>
                <div className="row saved-card-number">
                  Number : {savedCard.details.number}
                </div>
                <div className="row saved-card-exp-date">
                  Exp. Date : {savedCard.details.expDate.month}/
                  {savedCard.details.expDate.year}
                </div>
                <div className="row saved-card-cvc">
                  CVC : {savedCard.details.cvc}
                </div>

                <div className="actions">
                  <div
                    className="btn-action"
                    onClick={() => {
                      card.onChange(savedCard.details);
                      // validation.onChange(savedCard.validation);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>

                  <div
                    className="btn-action"
                    onClick={() => {
                      savedCards.onChange(
                        savedCards.value.filter(
                          (card, i) => card.details.id !== savedCard.details.id
                        )
                      );
                    }}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            ))}
            {savedCards.value.length === 0 && (
              <div className="no-saved-cards">No saved cards</div>
            )}
          </div>
        ),
      })
  );

const generateId = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};
