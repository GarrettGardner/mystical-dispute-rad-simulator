import React, { useEffect, useState } from "react";
import { ICardType, IDeck, IRadChecks } from "../utils/models";
import { DEFAULT_DECK_AGGRO, DEFAULT_DECK_MIDRANGE, DEFAULT_RAD_CHECKS_AGGRO, DEFAULT_RAD_CHECKS_MIDRANGE, DEFAULT_RAD_OUTPUT } from "../utils/defaults";
import { CommonUtil } from "../utils/CommonUtil";
import { RADSimulator } from "../utils/RADSimulator";
import FormAddCard, { IFormAddCardFields } from './FormAddCard';
import FormEditCard, { IFormEditCardFields } from './FormEditCard';
import Modal from './Modal';
import SectionChecks from './SectionChecks';
import SectionDeck from './SectionDeck';
import SectionHeader from './SectionHeader';
import SectionResults from './SectionResults';

enum APP_STATE {
  INPUT,
  LOADING,
  COMPLETE,
}

export default function App() {
  const [appState, setAppState] = useState(APP_STATE.INPUT);
  const [deck, setDeck] = useState({...DEFAULT_DECK_MIDRANGE});
  const [modalContent, setModalContent] = useState(null);
  const [radChecks, setRadChecks] = useState({...DEFAULT_RAD_CHECKS_MIDRANGE});
  const [radOutput, setRadOutput] = useState({...DEFAULT_RAD_OUTPUT});

  // Button: Clear
  const clear = () => {
    if (confirm("Are you sure you want to clear all fields?")) {
      setDeck({cards: []});
      setRadChecks({...DEFAULT_RAD_CHECKS_MIDRANGE});
    }
  }

  // Button: Preset
  const preset = (preset: string) => {
    if (confirm("Are you sure you want to set to a preset?")) {
      if (preset == "aggro") {
        setDeck({...DEFAULT_DECK_AGGRO});
        setRadChecks({...DEFAULT_RAD_CHECKS_AGGRO});
      } else if (preset === "midrange") {
        setDeck({...DEFAULT_DECK_MIDRANGE});
        setRadChecks({...DEFAULT_RAD_CHECKS_MIDRANGE});
      }
    }
  }

  // Button: Share
  const share = () => {
    prompt("Copy Paste this URL", window.location.href);
  }

  // Load encoded deck on component load
  useEffect(() => {
    if (window.location.hash) {
      const decodeReturn = CommonUtil.decode(window.location.hash);

      if (decodeReturn.success) {
        setDeck(sortDeck(decodeReturn.deck));
        setRadChecks(decodeReturn.radChecks);
      }
    }
  }, []);

  // Encode deck to hash whenever deck changes
  useEffect(() => {
    window.location.hash = encodeURIComponent(CommonUtil.encode(deck, radChecks));
  }, [deck, radChecks]);

  // Simulate RAD
  const simulateRad = () => {
    setAppState(APP_STATE.LOADING);
    const radOutput = RADSimulator.simulate(deck, radChecks);
    if (!radOutput.success) {
      alert(radOutput.error);
      setAppState(APP_STATE.INPUT);
    } else {
      setRadOutput(radOutput);
      setDeck(sortDeck(deck));
      setAppState(APP_STATE.COMPLETE);
    }
  }

  // Sorts deck with custom logic
  const sortDeck = (deck: IDeck) => {
    let newDeck = {...deck};
    newDeck.cards.sort((a, b) => {
      if (a.color_white !== b.color_white) {
        return a.color_white ? -1 : 1;
      }
      if (a.color_blue !== b.color_blue) {
        return a.color_blue ? -1 : 1;
      }
      if (a.color_black !== b.color_black) {
        return a.color_black ? -1 : 1;
      }
      if (a.color_red !== b.color_red) {
        return a.color_red ? -1 : 1;
      }
      if (a.color_green !== b.color_green) {
        return a.color_green ? -1 : 1;
      }
      if (a.flag_interaction !== b.flag_interaction) {
        return a.flag_interaction ? -1 : 1;
      }
      if (a.flag_bomb !== b.flag_bomb) {
        return a.flag_bomb ? -1 : 1;
      }
      if (a.type_land !== b.type_land) {
        return a.type_land ? -1 : 1;
      }
      if (a.type_early !== b.type_early) {
        return a.type_early ? -1 : 1;
      }
      if (a.type_mid !== b.type_mid) {
        return a.type_mid ? -1 : 1;
      }
      if (a.type_late !== b.type_late) {
        return a.type_late ? -1 : 1;
      }
      return 0;
    });
    return deck;
  }

  // Reset output
  const editInputs = () => {
    setRadOutput({...DEFAULT_RAD_OUTPUT});
    setAppState(APP_STATE.INPUT);
  }

  // Delete card with index
  const deleteCard = (index: number) => {
    let newDeck = {...deck};
    if (index > -1 && index < newDeck.cards.length) {
      newDeck.cards.splice(index, 1);
      setDeck(newDeck);
    }
  }

  // Add card to deck modal
  const addCard = (type?: keyof ICardType) => {
    setModalContent(
      <FormAddCard type={type} addCards={addCardsSubmit} />
    );
  }

  // Add card to deck submission
  const addCardsSubmit = (addCardFields: IFormAddCardFields) => {
    let newDeck = {...deck};
    
    let newCardDetails = {...addCardFields};
    delete newCardDetails.number;
    newDeck.cards = newDeck.cards.concat(Array(addCardFields.number).fill(newCardDetails));

    setDeck(sortDeck(newDeck));
    closeModal();
  }

  // Edit card modal
  const editCard = (index?: number) => {
    setModalContent(
      <FormEditCard index={index} card={deck.cards[index]} editCard={editCardSubmit} />
    );
  }

  // Edit card submission
  const editCardSubmit = (index: number, editCardFields: IFormEditCardFields) => {
    let newDeck = {...deck};
    
    if (newDeck.cards[index] == undefined) {
      return;
    }
    
    newDeck.cards[index] = {...editCardFields};
    setDeck(sortDeck(newDeck));
    closeModal();
  }

  const editChecks = (newRadChecks: IRadChecks) => {
    setRadChecks(newRadChecks);
  }

  // Open modal with content
  const openModal = (content: JSX.Element) => {
    setModalContent(content);
  }

  // Open modal with content
  const closeModal = () => {
    setModalContent(false);
  }

  // Give all cards an index
  deck.cards = deck.cards.map((card, index) => {
    return {
      ...card,
      index: index,
    }
  });

  return (
    <>
      <div aria-hidden="true" className="background"></div>
      <main className="container">
        <SectionHeader
          inputDisabled={appState !== APP_STATE.INPUT}
          clear={clear}
          preset={preset}
          share={share}
        />
        <SectionDeck
          deck={deck}
          inputDisabled={appState !== APP_STATE.INPUT}
          openModal={openModal}
          addCard={addCard}
          editCard={editCard}
          deleteCard={deleteCard}
        />
        <SectionChecks
          inputDisabled={appState !== APP_STATE.INPUT}
          radChecks={radChecks}
          editChecks={editChecks}
          openModal={openModal}
          simulateRad={simulateRad}
        />
      </main>
      { modalContent &&
        <Modal closeModal={closeModal}>
          {modalContent}
        </Modal>
      }
      { appState === APP_STATE.COMPLETE &&
        <Modal closeModal={editInputs}>
          <SectionResults
            editInputs={editInputs}
            radChecks={radChecks}
            radOutput={radOutput}
          />
        </Modal>
      }
    </>
  );
}
