import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faBomb } from "@fortawesome/free-solid-svg-icons/faBomb";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faChessPawn } from "@fortawesome/free-solid-svg-icons/faChessPawn";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons/faChessKnight";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons/faChessQueen";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons/faMountainSun";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

enum IconType {
  SPAN,
  FONTAWESOME,
}

const ICONS = {
  'mtg-colorless' : {
    type: IconType.SPAN,
    faIcon: faPlus,
  },
  'mtg-white' : {
    type: IconType.SPAN,
    faIcon: faPlus,
  },
  'mtg-blue' : {
    type: IconType.SPAN,
    faIcon: faPlus,
  },
  'mtg-black' : {
    type: IconType.SPAN,
    faIcon: faPlus,
  },
  'mtg-red' : {
    type: IconType.SPAN,
    faIcon: faPlus,
  },
  'mtg-green' : {
    type: IconType.SPAN,
    faIcon: faPlus,
  },
  'add' : {
    type: IconType.FONTAWESOME,
    faIcon: faPlus,
  },
  'check' : {
    type: IconType.FONTAWESOME,
    faIcon: faCheck,
  },
  'close' : {
    type: IconType.FONTAWESOME,
    faIcon: faClose,
  },
  'delete' : {
    type: IconType.FONTAWESOME,
    faIcon: faXmark,
  },
  'info' : {
    type: IconType.FONTAWESOME,
    faIcon: faCircleInfo,
  },
  'land' : {
    type: IconType.FONTAWESOME,
    faIcon: faMountainSun,
  },
  'earlyplay' : {
    type: IconType.FONTAWESOME,
    faIcon: faChessPawn,
  },
  'midplay' : {
    type: IconType.FONTAWESOME,
    faIcon: faChessKnight,
  },
  'lateplay' : {
    type: IconType.FONTAWESOME,
    faIcon: faChessQueen,
  },
  'bomb' : {
    type: IconType.FONTAWESOME,
    faIcon: faBomb,
  },
  'interaction' : {
    type: IconType.FONTAWESOME,
    faIcon: faBolt,
  },
}

export interface IIconProps {
  icon: keyof typeof ICONS
}

export default function Icon(props: IIconProps) {
  const icon = ICONS[props.icon];

  if (icon.type == IconType.SPAN) {
    return (
      <span className={`icon icon--${props.icon}`}><span className="icon__inner"></span></span>
    );
  }

  if (icon.type == IconType.FONTAWESOME) {
    return (
      <span className={`icon icon--${props.icon}`}>
        <span className="icon__inner">
          <FontAwesomeIcon icon={icon.faIcon} />
        </span>
      </span>
    );
  }

  return null;
}
