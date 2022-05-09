import { IInteractArgs } from '../game-infra/interact-args';
import { GameSprite } from './game-sprite';

export class Start extends GameSprite {
  constructor(x: number = 0, y: number = 0) {
    super(x, y);
    this.img.src = '../../asset/start.png';
  }

  public init(worldSize: number): void {
    this.resolution = worldSize;
    this.draw();
  }

  public update(): void {
    this.draw();
  }

  public interact(eventArgs: IInteractArgs): void {
    eventArgs.handled = true;
  }
}
