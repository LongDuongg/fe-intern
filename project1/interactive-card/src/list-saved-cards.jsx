import * as React from "react";
import cn from "classnames";

import {cs}    from "./common/chain-services.js";
import {State} from "./common/react/state.js";

export const ListSavedCards = ({next}) => cs(
  ["savedCards", ({}, next) => State({ initValue: [], next })],
  ({savedCards}) => next({
    addCardInfo: ({card, validation}) => {
      if (card.id) {
        const updatedCards = savedCards.value.map((savedCard) => (
          savedCard.details.id === card.id ? (
            {
              details: card,
              validation,
            }
          ) : (
            savedCard
          )
        ));
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
    render: () => (
      <div className="list-saved-cards">
        {savedCards.value.map((savedCard, index) => (
          <div
            key={index}
            className={cn(
              "saved-card",
              savedCard.validation.success ? "valid" : "invalid"
            )}
          >
            <div className="saved-card-name">
              Name : {savedCard.details.name}
            </div>
            <div className="saved-card-number">
              Number : {savedCard.details.number}
            </div>
            <div className="saved-card-exp-date">
              EXP. DATE : {savedCard.details.expDate.month}/
              {savedCard.details.expDate.year}
            </div>
            <div className="saved-card-cvc">
              CVC : {savedCard.details.cvc}
            </div>
            <button
              onClick={() => {
                card.onChange(savedCard.details);
                // validation.onChange(savedCard.validation);
              }}
            >
              edit
            </button>

            <button
              onClick={() => {
                savedCards.onChange(
                  savedCards.value.filter(
                    (card, i) => card.details.id !== savedCard.details.id
                  )
                );
              }}
            >
              delete
            </button>
          </div>
        ))}
        {savedCards.value.length === 0 && (
          <div className="no-saved-cards">No saved cards</div>
        )}
      </div>
    ),
  }),
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
