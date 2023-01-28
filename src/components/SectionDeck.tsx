import React from "react";
import { ICardType, IDeck } from "../utils/models";
import ButtonAddCard from './ButtonAddCard';
import CardGroup from './CardGroup';
import Icon from './Icon';
import Popover from './Popover';

interface ISectionDeckProps {
  addCard: (index?: keyof ICardType) => void,
  deck: IDeck,
  deleteCard: (index?: number) => void,
  editCard: (index?: number) => void,
  inputDisabled: boolean,
  openModal: (content: JSX.Element) => void,
}

export default function SectionDeck(props: ISectionDeckProps) {
  const interaction = props.deck.cards.filter(card => card.flag_interaction);
  const bomb = props.deck.cards.filter(card => card.flag_bomb);
  const lands = props.deck.cards.filter(card => card.type_land);
  const earlyPlays = props.deck.cards.filter(card => !card.type_land && card.type_early);
  const midPlays = props.deck.cards.filter(card => !card.type_land && !card.type_early && card.type_mid);
  const latePlays = props.deck.cards.filter(card => !card.type_land && !card.type_early && !card.type_mid && card.type_late);

  return (
    <section className="section-deck">
      <h2 className="text--header-section">
        Step 1: Input Deck <span className="text--smaller">({props.deck.cards.length} Card{props.deck.cards.length !== 1 ? 's' : ''} - {interaction.length} Interaction, {bomb.length} Bomb{bomb.length !== 1 ? 's' : ''})</span>
        <Popover openModal={props.openModal}>
          <>
            <p className="text--header-modal">Input Deck</p>
            <p>A simplified breakdown of a Magic deck. Cards are broken into four categories: <strong>Land</strong>, <strong>Early-Game Plays</strong>, <strong>Mid-Game Plays</strong> and <strong>Late-Game Plays</strong>.</p>
            <p><strong className="text--larger">Colors:</strong> Cards can have colors (Lands produce colors, and Plays require colors to be considered playable), or can be colorless.</p>
            <p><strong className="text--larger">Lands:</strong> Mana sources. The colors of the lands indicate which colors they can produce.</p>
            <p><strong className="text--larger">Early-Game Plays:</strong> Defined by any plays intended to help develop and survive the very beginning of the game, generally one-, two- or three- costed cards.</p>
            <p><strong className="text--larger">Mid-Game Plays:</strong> Defined by plays that are relevant in the mid-game or developing stage of the game, often four- or five- costed plays.</p>
            <p><strong className="text--larger">Late-Game Plays:</strong> Defined by big late-game plays, generally six-costed or more spells, or other effects that your deck is building to.</p>
            <p><strong className="text--larger">Interaction:</strong> Denoted by a lightning bolt icon ( <Icon icon="interaction" /> ), interaction is defined by things like removal or even combat tricks in aggressive decks. Most decks need a way to go over the top of the opponent's game plan, and interaction to disrupt that plan is often essential.</p>
            <p><strong className="text--larger">Bombs:</strong> Denoted by a bomb icon ( <Icon icon="bomb" /> ), bombs are defined by the best cards in your deck. Most limited decks have a couple to a few cards that are much better than the rest. You usually want to draw at least one of these in most games.</p>
            <p>Delete cards by hovering over them and clicking the red X ( <Icon icon="delete" /> ) button.</p>
            <p>Add cards by clicking the Add buttons below each section. A pop-up will appear where you can specify the details of the card as well as how many cards you'd like to add.</p>
          </>
        </Popover>
      </h2>
      <div className="row row--deck">
        <div className="col">
          <h3 className="text--header-subsection">Lands <span className="text--smaller">({lands.length} Card{lands.length !== 1 ? 's' : ''})</span></h3>
          <CardGroup cards={lands} editCard={props.editCard} deleteCard={props.deleteCard} disabled={props.inputDisabled} />
          <ButtonAddCard label="Add Lands" addCard={() => props.addCard("type_land") } disabled={props.inputDisabled} />
        </div>
        <div className="col">
          <h3 className="text--header-subsection">Early-Game Plays <span className="text--smaller">({earlyPlays.length} Card{earlyPlays.length !== 1 ? 's' : ''})</span></h3>
          <CardGroup cards={earlyPlays} editCard={props.editCard} deleteCard={props.deleteCard} disabled={props.inputDisabled} />
          <ButtonAddCard label="Add Early-Game Plays" addCard={() => props.addCard("type_early") } disabled={props.inputDisabled} />
        </div>
        <div className="col">
          <h3 className="text--header-subsection">Mid-Game Plays <span className="text--smaller">({midPlays.length} Card{midPlays.length !== 1 ? 's' : ''})</span></h3>
          <CardGroup cards={midPlays} editCard={props.editCard} deleteCard={props.deleteCard} disabled={props.inputDisabled} />
          <ButtonAddCard label="Add Mid-Game Plays" addCard={() => props.addCard("type_mid") } disabled={props.inputDisabled} />
        </div>
        <div className="col">
          <h3 className="text--header-subsection">Late-Game Plays <span className="text--smaller">({latePlays.length} Card{latePlays.length !== 1 ? 's' : ''})</span></h3>
          <CardGroup cards={latePlays} editCard={props.editCard} deleteCard={props.deleteCard} disabled={props.inputDisabled} />
          <ButtonAddCard label="Add Late-Game Plays" addCard={() => props.addCard("type_late")} disabled={props.inputDisabled} />
        </div>
      </div>
    </section>
  );
}
