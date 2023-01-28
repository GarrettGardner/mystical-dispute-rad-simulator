import { ICard, IDeck, IRadChecks, IRadCheckStage, IRadOutput, IRadOutputStage } from "./models";
import { DEFAULT_RAD_OUTPUT } from "./defaults";

const ITERATIONS = 10000;

interface ICheckProps {
  cards: ICard[],
  draws: number,
  minLand: number,
  maxLand: number,
  minPlayable: number,
  playableChecks: (keyof ICard)[],
  minInteraction: number,
  minBomb: number
}

interface ICheckReturn {
  success: boolean,
  minLandSuccess: boolean,
  maxLandSuccess: boolean,
  minPlayableSuccess: boolean,
  minInteractionSuccess: boolean,
  minBombSuccess: boolean
}

const DEFAULT_CHECK_RETURN: ICheckReturn = {
  success: true,
  minLandSuccess: true,
  maxLandSuccess: true,
  minPlayableSuccess: true,
  minInteractionSuccess: true,
  minBombSuccess: true
}

interface ICheckAccessToColorsReturn {
  white: boolean,
  blue: boolean,
  black: boolean,
  red: boolean,
  green: boolean,
}

export class RADSimulator {
  // Checks if access to colors
  static checkAccessToColors(cards: ICard[]): ICheckAccessToColorsReturn {
    return {
      white: cards.filter(card =>
        card.type_land &&
        card.color_white
      ).length > 0 ? true : false,
      blue: cards.filter(card =>
        card.type_land &&
        card.color_blue
      ).length > 0 ? true : false,
      black: cards.filter(card =>
        card.type_land &&
        card.color_black
      ).length > 0 ? true : false,
      red: cards.filter(card =>
        card.type_land &&
        card.color_red
      ).length > 0 ? true : false,
      green: cards.filter(card =>
        card.type_land &&
        card.color_green
      ).length > 0 ? true : false,
    };
  }

  // Checks number of lands
  static landCount(cards: ICard[]): number {
    return cards.filter(card => card.type_land).length;
  }

  // Checks if certain flags are castable by access to colors and flag arguments
  static flagCount(cards: ICard[], keys: (keyof ICard)[]): number {
    const accessToColors = this.checkAccessToColors(cards);
    return cards.filter(card => {
      if (
        (card.color_white && !accessToColors.white) ||
        (card.color_blue && !accessToColors.blue) ||
        (card.color_black && !accessToColors.black) ||
        (card.color_red && !accessToColors.red) ||
        (card.color_green && !accessToColors.green)
      ) {
        return false;
      }

      let check = false;
      keys.forEach(key => {
        if (card[key]) {
          check = true;
        }
      });

      return check;
    }
    ).length;;
  }

  // Runs all checks on a given stage of the game
  static checks(inputCards: ICard[], playableFlags: (keyof ICard)[], radChecksStage: IRadCheckStage, radOutputStage: IRadOutputStage) {
    const cards = inputCards.slice(0, radChecksStage.draws);
    let success = true;

    const landCount = this.landCount(cards);
    const playableCount = this.flagCount(cards, playableFlags);
    const interactionCount = this.flagCount(cards, ["flag_interaction"]);
    const bombCount = this.flagCount(cards, ["flag_bomb"]);

    // Minimum total land count
    if (landCount < radChecksStage.minLand) {
      success = false;
    } else {
      radOutputStage.minLandSuccesses++;
    }

    // Maximum total land count
    if (landCount > radChecksStage.maxLand) {
      success = false;
    } else {
      radOutputStage.maxLandSuccesses++;
    }

    // Minimum Playables that are castable
    if (playableCount < radChecksStage.minPlayable) {
      success = false;
    } else {
      radOutputStage.minPlayableSuccesses++;
    }

    // Minimum Interaction that are castable
    if (interactionCount < radChecksStage.minInteraction) {
      success = false;
    } else {
      radOutputStage.minInteractionSuccesses++;
    }

    // Minimum Bombs that are castable
    if (bombCount < radChecksStage.minBomb) {
      success = false;
    } else {
      radOutputStage.minBombSuccesses++;
    }

    if (success) {
      radOutputStage.successes++;
    }

    return success;
  }

  static simulate(deck: IDeck, radChecks: IRadChecks): IRadOutput {
    // Build the deck from the input specifications
    let cards = deck.cards;

    let radOutput = JSON.parse(JSON.stringify(DEFAULT_RAD_OUTPUT));
    
    if (cards.length < 40) {
      radOutput.error = `Too few cards in deck (You have ${cards.length}, minimum is 40).`;
      return radOutput;
    }
    
    if (cards.length > 60) {
      radOutput.error = `Too many cards in deck (You have ${cards.length}, maximum is 60).`;
      return radOutput;
    }

    for (let i = 0; i < ITERATIONS; i++) {
      let success = true;

      // Shuffle the deck
      cards.sort(() => 0.5 - Math.random());

      // Check opener
      const checkOpener = this.checks(cards, ["type_early"], radChecks.opener, radOutput.opener);
      if (!checkOpener) {
        success = false;
      }
      
      // Check early game
      const checkEarly = this.checks(cards, ["type_early"], radChecks.early, radOutput.early);
      if (!checkEarly) {
        success = false;
      }
      
      // Check mid game
      const checkMid = this.checks(cards, ["type_early", "type_mid"], radChecks.mid, radOutput.mid);
      if (!checkMid) {
        success = false;
      }
      
      // Check mid game
      const checkLate = this.checks(cards, ["type_mid", "type_late"], radChecks.late, radOutput.late);
      if (!checkLate) {
        success = false;
      }

      // Check overall success
      if (success) {
        radOutput.totalSuccesses++;
      }

      radOutput.simulations++;
    }

    radOutput.success = true;
    return radOutput;
  }
}
