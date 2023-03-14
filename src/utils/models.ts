export interface ICardType {
  type_land: boolean,
  type_early: boolean,
  type_mid: boolean,
  type_late: boolean,
}

export interface ICardColor {
  color_colorless: boolean,
  color_white: boolean,
  color_blue: boolean,
  color_black: boolean,
  color_red: boolean,
  color_green: boolean,
}

export interface ICardFlag {
  flag_bomb: boolean,
  flag_interaction: boolean,
}

export interface ICard extends ICardColor, ICardType, ICardFlag {
  index?: number,
}

export interface IDeck {
  cards: ICard[]
}

export interface IRadCheckStage {
  draws: number,
  minLand: number,
  maxLand: number,
  minPlayable: number,
  minInteraction: number,
  minBomb: number,
}

export interface IRadChecks {
  opener: IRadCheckStage,
  early: IRadCheckStage,
  mid: IRadCheckStage,
  late: IRadCheckStage,
}

export interface IRadOutputStage {
  minLandSuccesses: number,
  maxLandSuccesses: number,
  bothLandSuccesses: number,
  minPlayableSuccesses: number,
  minInteractionSuccesses: number,
  minBombSuccesses: number,
  successes: number,
}

export interface IRadOutput {
  success: boolean,
  error: string,
  simulations: number,
  totalSuccesses: number,
  opener: IRadOutputStage,
  early: IRadOutputStage,
  mid: IRadOutputStage,
  late: IRadOutputStage,
}
