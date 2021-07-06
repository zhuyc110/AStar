import { IPosition } from "./position";

export interface IInteractArgs {
  position: IPosition;
  handled: boolean;
  context: CanvasRenderingContext2D;
  resolution: number;
}
