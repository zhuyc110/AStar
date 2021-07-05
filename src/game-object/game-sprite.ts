import { IPosition } from "./position";

export abstract class GameSprite implements IPosition {
  public get stringify(): string {
    return `${this.x}, ${this.y}`;
  }
  public x: number;
  public y: number;
  public velocityX: number;
  public velocityY: number;
  public active: boolean;
  public resolution: number;
  protected context: CanvasRenderingContext2D;
  public enable(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.active = true;
  }
  public abstract init(worldSize: number, used: Set<string>): void;
  public abstract update(): void;

  public abstract interact(): void;

  protected getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
