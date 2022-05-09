import { IPosition, Position } from '../game-infra/position';
import { GameSystem } from '../game-system';

export abstract class ActorBase {
  public visited: IPosition[] = [];

  public mapPath: Map<IPosition, IPosition> = new Map<IPosition, IPosition>();

  public get pathToPrint(): IPosition[] {
    const realPath: IPosition[] = [this.goal];
    let pointer: IPosition = this.goal;
    while (pointer) {
      const next = this.mapPath.get(pointer);
      if (!next) {
        break;
      }
      realPath.push(next);
      pointer = next;
    }

    return realPath;
  }

  constructor(
    protected world: GameSystem,
    protected start: IPosition,
    protected goal: IPosition,
  ) {}

  public abstract goToGoal(): void;

  protected getNeighbors(position: IPosition): IPosition[] {
    const result: IPosition[] = [];

    if (position.x > 0) {
      const potential = new Position(position.x - 1, position.y);
      result.push(potential);
    }

    if (position.x < this.world.bound.x - 1) {
      const potential = new Position(position.x + 1, position.y);
      result.push(potential);
    }

    if (position.y > 0) {
      const potential = new Position(position.x, position.y - 1);
      result.push(potential);
    }

    if (position.y < this.world.bound.y - 1) {
      const potential = new Position(position.x, position.y + 1);
      result.push(potential);
    }

    return result;
  }

  protected getDistance(position: IPosition, target: IPosition): number {
    return Math.abs(position.x - target.x) + Math.abs(target.y - position.y);
  }
}
