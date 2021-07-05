import { GameSprite } from "./game-sprite";

export class Brick extends GameSprite {
  private img: HTMLImageElement;
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.img = new Image();
    this.img.src = "../../asset/brick.png";
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
  public interact(): void {
    console.log("Brick clicked");
  }

  private draw() {
    this.context.drawImage(
      this.img,
      this.x * this.resolution + 2,
      this.y * this.resolution + 2
    );
  }
}
