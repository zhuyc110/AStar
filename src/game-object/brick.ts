import { IInteractArgs } from '../game-infra/interact-args';
import { GameSprite } from './game-sprite';

export class Brick extends GameSprite {
  public static createBrickHandler: (eventArgs: IInteractArgs) => GameSprite = (
    eventArgs: IInteractArgs,
  ) => {
    const brick = new Brick(
      eventArgs.position.x,
      eventArgs.position.y,
      eventArgs.resolution,
    );
    eventArgs.handled = true;

    return brick;
  };

  constructor(x: number = 0, y: number = 0, resolution: number = 0) {
    super(x, y);
    this.resolution = resolution;
    this.img.src = 'asset/brick.png';
  }

  public init(worldResolution: number, used: Set<string>): void {
    this.resolution = worldResolution;
    this.x = this.getRandomInt(this.context.canvas.width / this.resolution);
    this.y = this.getRandomInt(this.context.canvas.height / this.resolution);
    while (used.has(this.stringify)) {
      this.x = this.getRandomInt(this.context.canvas.width / this.resolution);
      this.y = this.getRandomInt(this.context.canvas.height / this.resolution);
    }
    this.draw();
  }

  public update(): void {
    this.draw();
  }

  public interact(eventArgs: IInteractArgs): void {
    console.log('Brick clicked');
    eventArgs.world.removeSprite(this);
    eventArgs.handled = true;
  }
}
