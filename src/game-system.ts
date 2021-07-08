import { IInteractArgs } from "./game-infra/interact-args";
import { Position } from "./game-infra/position";
import { GameSprite } from "./game-object/game-sprite";

export class GameSystem {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: GameSprite[] = [];

  private frameRunner: NodeJS.Timeout;
  private worldResolution: number = 25;

  private interactHandler: ((eventArgs: IInteractArgs) => GameSprite)[] = [];

  constructor(canvas: HTMLCanvasElement, resolution: number = 25) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.worldResolution = resolution;
    this.canvas.onclick = this.onClick.bind(this);
    this.update = this.update.bind(this);
    this.removeSprite = this.removeSprite.bind(this);
    this.drawSprite = this.drawSprite.bind(this);
  }

  public renderWorld(worldContext: CanvasRenderingContext2D) {
    for (
      let indexX = 1;
      indexX < this.canvas.width;
      indexX += this.worldResolution
    ) {
      worldContext.beginPath();
      worldContext.moveTo(indexX, 0);
      worldContext.lineTo(indexX, this.canvas.height);
      worldContext.stroke();
    }
    for (
      let indexY = 1;
      indexY < this.canvas.height;
      indexY += this.worldResolution
    ) {
      worldContext.beginPath();
      worldContext.moveTo(0, indexY);
      worldContext.lineTo(this.canvas.width, indexY);
      worldContext.stroke();
    }
  }

  public activeSprite(sprite: GameSprite) {
    sprite.enable(this.context);
    this.sprites.push(sprite);
  }

  public removeSprite(sprite: GameSprite) {
    const index = this.sprites.indexOf(sprite);
    this.sprites.splice(index, 1);
  }

  public start(interval: number = 1000) {
    const set = new Set<string>();
    for (const sprite of this.sprites.filter((x) => x.active)) {
      sprite.init(this.worldResolution, set);
      set.add(sprite.stringify);
    }

    const timeOut = setTimeout(() => {
      this.update();
      clearTimeout(timeOut);
    }, 100);
    this.frameRunner = setInterval(this.update, interval);
  }

  public update() {
    this.clear();
    for (const sprite of this.sprites.filter((x) => x.active)) {
      sprite.update();
    }
  }

  public stop() {
    clearInterval(this.frameRunner);
    this.clear();
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public registerInteract(handler: (eventArgs: IInteractArgs) => GameSprite) {
    this.interactHandler.push(handler);
  }

  private onClick(event: MouseEvent) {
    const eventArgs: IInteractArgs = this.getInteractArgs(event);

    for (const sprite of this.sprites) {
      if (
        event.offsetX >= sprite.x * sprite.resolution &&
        event.offsetX <= (sprite.x + 1) * sprite.resolution &&
        event.offsetY >= sprite.y * sprite.resolution &&
        event.offsetY <= (sprite.y + 1) * sprite.resolution
      ) {
        sprite.interact(eventArgs);
      }
    }

    for (const handler of this.interactHandler) {
      if (eventArgs.handled) {
        break;
      }

      const sprite = handler(eventArgs);
      if (sprite) {
        this.activeSprite(sprite);
        sprite.loaded.push(this.drawSprite);
      }
    }
  }

  private getInteractArgs(event: MouseEvent): IInteractArgs {
    return {
      position: new Position(
        event.offsetX / this.worldResolution,
        event.offsetY / this.worldResolution
      ),
      handled: false,
      world: this,
      resolution: this.worldResolution,
    };
  }

  private drawSprite(sprite: GameSprite) {
    sprite.draw();
    const index = sprite.loaded.indexOf(this.drawSprite);
    sprite.loaded.splice(index, 1);
  }
}
