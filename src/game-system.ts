import { IInteractArgs } from './game-infra/interact-args';
import { IPosition, Position } from './game-infra/position';
import { GameSprite } from './game-object/game-sprite';

export class GameSystem {
  public get objects(): IPosition[] {
    return this.sprites;
  }
  public get bound(): IPosition {
    return this.boundValue;
  }
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: GameSprite[] = [];

  private frameRunner: NodeJS.Timeout;
  private worldResolution = 25;

  private interactHandler: ((eventArgs: IInteractArgs) => GameSprite)[] = [];
  private boundValue: IPosition;

  constructor(canvas: HTMLCanvasElement, resolution: number = 25) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.worldResolution = resolution;
    this.canvas.onclick = this.onClick.bind(this);
    this.update = this.update.bind(this);
    this.removeSprite = this.removeSprite.bind(this);
    this.drawSprite = this.drawSprite.bind(this);

    this.boundValue = new Position(
      Math.floor(this.canvas.width / resolution),
      Math.floor(this.canvas.height / resolution),
    );
  }

  public renderWorld(worldContext: CanvasRenderingContext2D): void {
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

  public renderPath(
    pathContext: CanvasRenderingContext2D,
    path: IPosition[],
  ): void {
    let pre: IPosition = null;
    for (let index = 0; index < path.length; index++) {
      const node = path[index];
      const nodeLocation = new Position(
        (node.x + 0.5) * this.worldResolution + 1,
        (node.y + 0.5) * this.worldResolution + 1,
      );
      if (pre !== null) {
        const preLocation = new Position(
          (pre.x + 0.5) * this.worldResolution + 1,
          (pre.y + 0.5) * this.worldResolution + 1,
        );
        pathContext.beginPath();
        pathContext.moveTo(preLocation.x, preLocation.y);
        pathContext.lineTo(nodeLocation.x, nodeLocation.y);
        pathContext.stroke();
      }
      pathContext.beginPath();
      pathContext.ellipse(
        nodeLocation.x,
        nodeLocation.y,
        2,
        2,
        Math.PI / 4,
        0,
        2 * Math.PI,
      );
      pathContext.stroke();
      pre = node;
    }
  }

  public renderVisited(
    pathContext: CanvasRenderingContext2D,
    visited: IPosition[],
  ): void {
    pathContext.fillStyle = '#E1A679';
    for (const node of visited) {
      pathContext.fillRect(
        node.x * this.worldResolution + 2,
        node.y * this.worldResolution + 2,
        this.worldResolution - 2,
        this.worldResolution - 2,
      );
    }
    pathContext.fillStyle = 'black';
  }

  public activeSprite(sprite: GameSprite): void {
    sprite.enable(this.context);
    this.sprites.push(sprite);
  }

  public removeSprite(sprite: GameSprite): void {
    const index = this.sprites.indexOf(sprite);
    this.sprites.splice(index, 1);
  }

  public start(interval: number = 100): void {
    const set = new Set<string>();
    for (const sprite of this.sprites.filter(x => x.active)) {
      sprite.init(this.worldResolution, set);
      set.add(sprite.stringify);
    }

    const timeOut = setTimeout(() => {
      this.update();
      clearTimeout(timeOut);
    }, 100);
    this.frameRunner = setInterval(this.update, interval);
  }

  public update(): void {
    this.clear();
    for (const sprite of this.sprites.filter(x => x.active)) {
      sprite.update();
    }
  }

  public stop(): void {
    clearInterval(this.frameRunner);
    this.clear();
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public registerInteract(
    handler: (eventArgs: IInteractArgs) => GameSprite,
  ): void {
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
      }
    }
  }

  private getInteractArgs(event: MouseEvent): IInteractArgs {
    return {
      position: new Position(
        event.offsetX / this.worldResolution,
        event.offsetY / this.worldResolution,
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
