import { GameSprite } from "../game-object/game-sprite";
import { IPosition } from "./position";

export interface IInteractArgs {
  position: IPosition;
  handled: boolean;
  world: { removeSprite(sprite: GameSprite): void };
  resolution: number;
}
