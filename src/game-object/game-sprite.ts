import { IInteractArgs } from '../game-infra/interact-args';
import { Position } from '../game-infra/position';

export abstract class GameSprite extends Position {
  public velocityX: number;
  public velocityY: number;
  public active: boolean;
  public resolution: number;
  public loaded: ((sprite: GameSprite) => void)[] = [];
  protected context: CanvasRenderingContext2D;
  protected img: HTMLImageElement;

  constructor(x: number = 0, y: number = 0) {
    super(x, y);
    this.img = new Image();
    this.img.onload = () => {
      this.loaded.forEach(callBack => {
        callBack(this);
      });
    };
    this.draw.bind(this);
  }
  public enable(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.active = true;
  }
  public abstract init(worldSize: number, used: Set<string>): void;
  public abstract update(): void;

  public abstract interact(eventArgs: IInteractArgs): void;
  public draw(): void {
    this.context.drawImage(
      this.img,
      this.x * this.resolution + 2,
      this.y * this.resolution + 2,
    );
  }

  protected getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
