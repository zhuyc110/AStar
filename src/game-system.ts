import { GameSprite } from "./game-object/game-sprite";

export class GameSystem {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: GameSprite[] = [];

  private frameRunner: NodeJS.Timeout;
  private worldResolution: number = 25;

  constructor(canvas: HTMLCanvasElement, resolution: number = 25) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.worldResolution = resolution;
    this.canvas.onclick = this.onClick.bind(this);
  }

  public activeSprite(sprite: GameSprite) {
    sprite.enable(this.context);
    this.sprites.push(sprite);
  }

  public start(interval: number = 1000) {
    const set = new Set<string>();
    for (const sprite of this.sprites.filter((x) => x.active)) {
      sprite.init(this.worldResolution, set);
      set.add(sprite.stringify);
    }
    this.frameRunner = setInterval(this.update.bind(this), interval);
  }

  public update() {
    this.clear();
    for (const sprite of this.sprites.filter((x) => x.active)) {
      sprite.update();
    }
  }

  public renderWorld(context: CanvasRenderingContext2D) {
    for (
      let indexX = 1;
      indexX < this.canvas.width;
      indexX += this.worldResolution
    ) {
      context.beginPath();
      context.moveTo(indexX, 0);
      context.lineTo(indexX, this.canvas.height);
      context.stroke();
    }
    for (
      let indexY = 1;
      indexY < this.canvas.height;
      indexY += this.worldResolution
    ) {
      context.beginPath();
      context.moveTo(0, indexY);
      context.lineTo(this.canvas.width, indexY);
      context.stroke();
    }
  }

  public stop() {
    clearInterval(this.frameRunner);
    this.clear();
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private onClick(event: MouseEvent) {
    for (const sprite of this.sprites) {
      if (
        event.offsetX >= sprite.x * sprite.resolution &&
        event.offsetX <= (sprite.x + 1) * sprite.resolution &&
        event.offsetY >= sprite.y * sprite.resolution &&
        event.offsetY <= (sprite.y + 1) * sprite.resolution
      ) {
        sprite.interact();
      }
    }
  }
}
