import { ICard } from "../utils/models";
import React from "react";
import Icon from "./Icon";

interface ICardGroupProps {
  disabled: boolean,
  cards: ICard[],
  deleteCard: (index: number) => void,
  editCard: (index: number) => void,
}

export default function CardGroup(props: ICardGroupProps) {
  const cardClasses = (card: ICard) => {
    let classes = ['card'];

    if (card.color_colorless) {
      classes.push('card--color-colorless');
    } else {
      if (card.color_white) {
        classes.push('card--color-white');
      }
      if (card.color_blue) {
        classes.push('card--color-blue');
      }
      if (card.color_black) {
        classes.push('card--color-black');
      }
      if (card.color_red) {
        classes.push('card--color-red');
      }
      if (card.color_green) {
        classes.push('card--color-green');
      }
      if (classes.length > 2) {
        classes.push('card--color-gold');
      }
    }

    return classes.join(" ");
  }

  return (
    <div className="cards">
      { props.cards.map((card, index) => (
        <div key={index} className={cardClasses(card)}>
          <button type="button" className="card__inner" onClick={() => props.editCard(card.index)} disabled={props.disabled}>
            { !card.type_land && ( 
              <div className="card__colors">
                { card.color_colorless &&
                  <Icon icon="mtg-colorless" />
                }
                { card.color_white &&
                  <Icon icon="mtg-white" />
                }
                { card.color_blue &&
                  <Icon icon="mtg-blue" />
                }
                { card.color_black &&
                  <Icon icon="mtg-black" />
                }
                { card.color_red &&
                  <Icon icon="mtg-red" />
                }
                { card.color_green &&
                  <Icon icon="mtg-green" />
                }
              </div>
            )}
            <div className="card__type">
              { card.type_land &&
                <Icon icon="land" />
              }
              { card.type_early &&
                <Icon icon="earlyplay" />
              }
              { card.type_mid &&
                <Icon icon="midplay" />
              }
              { card.type_late &&
                <Icon icon="lateplay" />
              }
            </div>
            <div className="card__flags">
              { card.type_land ? ( 
                <>
                  { card.color_colorless &&
                    <Icon icon="mtg-colorless" />
                  }
                  { card.color_white &&
                    <Icon icon="mtg-white" />
                  }
                  { card.color_blue &&
                    <Icon icon="mtg-blue" />
                  }
                  { card.color_black &&
                    <Icon icon="mtg-black" />
                  }
                  { card.color_red &&
                    <Icon icon="mtg-red" />
                  }
                  { card.color_green &&
                    <Icon icon="mtg-green" />
                  }
                </>
              ) : (
                <>
                  { card.flag_interaction &&
                    <Icon icon="interaction" />
                  }
                  { card.flag_bomb &&
                    <Icon icon="bomb" />
                  }
                </>
              )}
            </div>
          </button>
          { !props.disabled &&
            <div className="card__delete" onClick={() => props.deleteCard(card.index)}>
              <div className="card__delete__inner">
                <Icon icon="delete" />
              </div>
            </div>
          }
        </div>
      )) }
    </div>
  );
}
