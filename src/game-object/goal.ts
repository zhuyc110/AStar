import { IInteractArgs } from "../game-infra/interact-args";
import { GameSprite } from "./game-sprite";

export class Goal extends GameSprite {
  constructor(x: number = 0, y: number = 0) {
    super(x, y);
    this.img = new Image();
    this.img.src = "../../asset/goal.png";
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
    console.log("Goal clicked");
    eventArgs.handled = true;
  }
}
