import { ICard, IDeck, IRadChecks, IRadOutput } from "./models";

export const DEFAULT_CARD: ICard = {
  type_land: true,
  type_early: false,
  type_mid: false,
  type_late: false,
  color_colorless: true,
  color_white: false,
  color_blue: false,
  color_black: false,
  color_red: false,
  color_green: false,
  flag_bomb: false,
  flag_interaction: false,
};

export const DEFAULT_CARD_BLANK: ICard = {
  ...DEFAULT_CARD,
  type_land: false,
  color_colorless: false,
};

export const DEFAULT_DECK_AGGRO: IDeck = {
  cards: [
    ...Array(8).fill({
      ...DEFAULT_CARD_BLANK,
      type_land: true,
      color_white: true,
    }),
    ...Array(8).fill({
      ...DEFAULT_CARD_BLANK,
      type_land: true,
      color_red: true,
    }),
    ...Array(5).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_white: true,
    }),
    ...Array(3).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_white: true,
      flag_interaction: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      type_mid: true,
      type_late: true,
      color_white: true,
      flag_bomb: true,
    }),
    ...Array(4).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_red: true,
    }),
    ...Array(2).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_red: true,
      flag_interaction: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_red: true,
      flag_bomb: true,
    }),
    ...Array(2).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_white: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_white: true,
      flag_interaction: true,
    }),
    ...Array(2).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_red: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_red: true,
      flag_bomb: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_late: true,
      color_white: true,
      flag_interaction: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_late: true,
      color_red: true,
      flag_bomb: true,
    }),
  ]
};

export const DEFAULT_DECK_MIDRANGE: IDeck = {
  cards: [
    ...Array(8).fill({
      ...DEFAULT_CARD_BLANK,
      type_land: true,
      color_black: true,
    }),
    ...Array(8).fill({
      ...DEFAULT_CARD_BLANK,
      type_land: true,
      color_green: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_land: true,
      color_black: true,
      color_green: true,
    }),
    ...Array(4).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_black: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      type_mid: true,
      type_late: true,
      color_green: true,
      flag_interaction: true,
    }),
    ...Array(5).fill({
      ...DEFAULT_CARD_BLANK,
      type_early: true,
      color_green: true,
    }),
    ...Array(2).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_black: true,
      flag_interaction: true,
    }),
    ...Array(2).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_black: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_green: true,
      flag_bomb: true,
      flag_interaction: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_green: true,
      flag_bomb: true,
    }),
    ...Array(2).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_green: true,
      flag_interaction: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_mid: true,
      color_green: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_late: true,
      color_black: true,
      flag_interaction: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_late: true,
      color_black: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_late: true,
      color_green: true,
      flag_bomb: true,
    }),
    ...Array(1).fill({
      ...DEFAULT_CARD_BLANK,
      type_late: true,
      color_green: true,
    }),
  ]
};

export const DEFAULT_RAD_CHECKS_EMPTY: IRadChecks = {
  opener: {
    draws: 0,
    minLand: 0,
    maxLand: 40,
    minPlayable: 0,
    minInteraction: 0,
    minBomb: 0,
  },
  early: {
    draws: 0,
    minLand: 0,
    maxLand: 40,
    minPlayable: 0,
    minInteraction: 0,
    minBomb: 0,
  },
  mid: {
    draws: 0,
    minLand: 0,
    maxLand: 4,
    minPlayable: 0,
    minInteraction: 0,
    minBomb: 0,
  },
  late: {
    draws: 0,
    minLand: 0,
    maxLand: 40,
    minPlayable: 0,
    minInteraction: 0,
    minBomb: 0,
  },
};

export const DEFAULT_RAD_CHECKS_AGGRO: IRadChecks = {
  opener: {
    draws: 7,
    minLand: 2,
    maxLand: 5,
    minPlayable: 1,
    minInteraction: 0,
    minBomb: 0,
  },
  early: {
    draws: 9,
    minLand: 2,
    maxLand: 6,
    minPlayable: 2,
    minInteraction: 0,
    minBomb: 0,
  },
  mid: {
    draws: 13,
    minLand: 3,
    maxLand: 8,
    minPlayable: 4,
    minInteraction: 1,
    minBomb: 0,
  },
  late: {
    draws: 20,
    minLand: 4,
    maxLand: 9,
    minPlayable: 1,
    minInteraction: 2,
    minBomb: 1,
  },
};

export const DEFAULT_RAD_CHECKS_MIDRANGE: IRadChecks = {
  opener: {
    draws: 7,
    minLand: 2,
    maxLand: 5,
    minPlayable: 0,
    minInteraction: 0,
    minBomb: 0,
  },
  early: {
    draws: 9,
    minLand: 3,
    maxLand: 6,
    minPlayable: 1,
    minInteraction: 0,
    minBomb: 0,
  },
  mid: {
    draws: 13,
    minLand: 4,
    maxLand: 8,
    minPlayable: 4,
    minInteraction: 0,
    minBomb: 0,
  },
  late: {
    draws: 20,
    minLand: 5,
    maxLand: 10,
    minPlayable: 5,
    minInteraction: 2,
    minBomb: 1,
  },
};

export const DEFAULT_RAD_OUTPUT: IRadOutput = {
  success: false,
  error: "",
  simulations: 0,
  totalSuccesses: 0,
  opener: {
    minLandSuccesses: 0,
    maxLandSuccesses: 0,
    bothLandSuccesses: 0,
    minPlayableSuccesses: 0,
    minInteractionSuccesses: 0,
    minBombSuccesses: 0,
    successes: 0,
  },
  early: {
    minLandSuccesses: 0,
    maxLandSuccesses: 0,
    bothLandSuccesses: 0,
    minPlayableSuccesses: 0,
    minInteractionSuccesses: 0,
    minBombSuccesses: 0,
    successes: 0,
  },
  mid: {
    minLandSuccesses: 0,
    maxLandSuccesses: 0,
    bothLandSuccesses: 0,
    minPlayableSuccesses: 0,
    minInteractionSuccesses: 0,
    minBombSuccesses: 0,
    successes: 0,
  },
  late: {
    minLandSuccesses: 0,
    maxLandSuccesses: 0,
    bothLandSuccesses: 0,
    minPlayableSuccesses: 0,
    minInteractionSuccesses: 0,
    minBombSuccesses: 0,
    successes: 0,
  },
};
