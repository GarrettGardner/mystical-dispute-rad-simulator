import { IDeck, IRadChecks } from "./models";
import { DEFAULT_RAD_CHECKS_EMPTY } from "./defaults";

export interface IDecodeReturn {
  success: boolean,
  deck?: IDeck,
  radChecks?: IRadChecks,
}

export const CommonUtil = {
  percent: function(dividend: number, divisor: number): string {
    let percentString = String(Math.round((dividend/divisor)*1000)/10);
    if (percentString.length < 3) {
      percentString += ".0";
    }
    percentString += "%";
    return percentString;
  },

  decode: (hash: string): IDecodeReturn => {
    hash = decodeURIComponent(hash);
    if (hash.charAt(0) == "#") {
      hash = hash.substring(1);
    }
    try {
      hash = atob(hash);
    } catch(e) {
      return { success: false };
    }
    const encodedParts: any = {};
    const inputParts = hash.split("|");
    inputParts.forEach(part => {
      const parts = part.split("=");
      if (parts.length < 2) {
        return false;
      }
      encodedParts[parts[0]] = parts[1];
    });

    let deck: IDeck = {
      cards: [],
    }

    let checks: IRadChecks = {...DEFAULT_RAD_CHECKS_EMPTY};

    if (!("d" in encodedParts)) {
      return { success: false };
    }
    encodedParts["d"].split(",").forEach((encodedCard: any) => {
      deck.cards.push({
        type_land: encodedCard.indexOf("l") > -1,
        type_early: encodedCard.indexOf("e") > -1,
        type_mid: encodedCard.indexOf("m") > -1,
        type_late: encodedCard.indexOf("a") > -1,
        color_colorless: encodedCard.indexOf("c") > -1,
        color_white: encodedCard.indexOf("w") > -1,
        color_blue: encodedCard.indexOf("u") > -1,
        color_black: encodedCard.indexOf("b") > -1,
        color_red: encodedCard.indexOf("r") > -1,
        color_green: encodedCard.indexOf("g") > -1,
        flag_bomb: encodedCard.indexOf("o") > -1,
        flag_interaction: encodedCard.indexOf("i") > -1,
      });
    });

    if ("od" in encodedParts) {
      checks.opener.draws = Number(encodedParts["od"]);
    }
    if ("ol" in encodedParts) {
      checks.opener.minLand = Number(encodedParts["ol"]);
    }
    if ("ox" in encodedParts) {
      checks.opener.maxLand = Number(encodedParts["ox"]);
    }
    if ("op" in encodedParts) {
      checks.opener.minPlayable = Number(encodedParts["op"]);
    }
    if ("oi" in encodedParts) {
      checks.opener.minInteraction = Number(encodedParts["oi"]);
    }
    if ("ob" in encodedParts) {
      checks.opener.minBomb = Number(encodedParts["ob"]);
    }

    if ("ed" in encodedParts) {
      checks.early.draws = Number(encodedParts["ed"]);
    }
    if ("el" in encodedParts) {
      checks.early.minLand = Number(encodedParts["el"]);
    }
    if ("ex" in encodedParts) {
      checks.early.maxLand = Number(encodedParts["ex"]);
    }
    if ("ep" in encodedParts) {
      checks.early.minPlayable = Number(encodedParts["ep"]);
    }
    if ("ei" in encodedParts) {
      checks.early.minInteraction = Number(encodedParts["ei"]);
    }
    if ("eb" in encodedParts) {
      checks.early.minBomb = Number(encodedParts["eb"]);
    }

    if ("md" in encodedParts) {
      checks.mid.draws = Number(encodedParts["md"]);
    }
    if ("ml" in encodedParts) {
      checks.mid.minLand = Number(encodedParts["ml"]);
    }
    if ("mx" in encodedParts) {
      checks.mid.maxLand = Number(encodedParts["mx"]);
    }
    if ("mp" in encodedParts) {
      checks.mid.minPlayable = Number(encodedParts["mp"]);
    }
    if ("mi" in encodedParts) {
      checks.mid.minInteraction = Number(encodedParts["mi"]);
    }
    if ("mb" in encodedParts) {
      checks.mid.minBomb = Number(encodedParts["mb"]);
    }

    if ("ld" in encodedParts) {
      checks.late.draws = Number(encodedParts["ld"]);
    }
    if ("ll" in encodedParts) {
      checks.late.minLand = Number(encodedParts["ll"]);
    }
    if ("lx" in encodedParts) {
      checks.late.maxLand = Number(encodedParts["lx"]);
    }
    if ("lp" in encodedParts) {
      checks.late.minPlayable = Number(encodedParts["lp"]);
    }
    if ("li" in encodedParts) {
      checks.late.minInteraction = Number(encodedParts["li"]);
    }
    if ("lb" in encodedParts) {
      checks.late.minBomb = Number(encodedParts["lb"]);
    }

    return {
      success: true,
      deck: deck,
      radChecks: checks
    };
  },

  encode: (deck: IDeck, checks: IRadChecks) => {
    const encodedParts: string[] = [];
    const encodedDeck = deck.cards.map((card) => {
      let encodedCard = "";
      if (card.type_land) {
        encodedCard += String("l");
      } else {
        if (card.type_early) {
          encodedCard += String("e");
        }
        if (card.type_mid) {
          encodedCard += String("m");
        }
        if (card.type_late) {
          encodedCard += String("a");
        }
      }
      if (card.color_colorless) {
        encodedCard += String("c");
      } else {
        if (card.color_white) {
          encodedCard += String("w");
        }
        if (card.color_blue) {
          encodedCard += String("u");
        }
        if (card.color_black) {
          encodedCard += String("b");
        }
        if (card.color_red) {
          encodedCard += String("r");
        }
        if (card.color_green) {
          encodedCard += String("g");
        }
      }
      if (card.flag_bomb) {
        encodedCard += String("o");
      }
      if (card.flag_interaction) {
        encodedCard += String("i");
      }
      return encodedCard;
    });
    encodedParts.push(`d=${encodedDeck.join(",")}`);

    encodedParts.push(`od=${checks.opener.draws}`);
    encodedParts.push(`ol=${checks.opener.minLand}`);
    encodedParts.push(`ox=${checks.opener.maxLand}`);
    encodedParts.push(`op=${checks.opener.minPlayable}`);
    encodedParts.push(`oi=${checks.opener.minInteraction}`);
    encodedParts.push(`ob=${checks.opener.minBomb}`);
    
    encodedParts.push(`ed=${checks.early.draws}`);
    encodedParts.push(`el=${checks.early.minLand}`);
    encodedParts.push(`ex=${checks.early.maxLand}`);
    encodedParts.push(`ep=${checks.early.minPlayable}`);
    encodedParts.push(`ei=${checks.early.minInteraction}`);
    encodedParts.push(`eb=${checks.early.minBomb}`);
    
    encodedParts.push(`md=${checks.mid.draws}`);
    encodedParts.push(`ml=${checks.mid.minLand}`);
    encodedParts.push(`mx=${checks.mid.maxLand}`);
    encodedParts.push(`mp=${checks.mid.minPlayable}`);
    encodedParts.push(`mi=${checks.mid.minInteraction}`);
    encodedParts.push(`mb=${checks.mid.minBomb}`);
    
    encodedParts.push(`ld=${checks.late.draws}`);
    encodedParts.push(`ll=${checks.late.minLand}`);
    encodedParts.push(`lx=${checks.late.maxLand}`);
    encodedParts.push(`lp=${checks.late.minPlayable}`);
    encodedParts.push(`li=${checks.late.minInteraction}`);
    encodedParts.push(`lb=${checks.late.minBomb}`);

    return btoa(encodedParts.join("|"));
  },
}
