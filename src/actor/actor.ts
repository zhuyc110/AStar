import { IPosition, Position } from '../game-infra/position';
import { GameSystem } from '../game-system';

export class Actor {
  constructor(
    private world: GameSystem,
    private start: IPosition,
    private goal: IPosition,
  ) {}

  private getNeighbors(position: IPosition): IPosition[] {
    const result: IPosition[] = [];

    if (position.x > 0) {
      const potential = new Position(position.x - 1, position.y);
      if (!this.world.objects.find(x => x.stringify === potential.stringify)) {
        result.push(potential);
      }
    }

    if (position.x < this.world.bound.x) {
      const potential = new Position(position.x + 1, position.y);
      if (!this.world.objects.find(x => x.stringify === potential.stringify)) {
        result.push(potential);
      }
    }

    if (position.y > 0) {
      const potential = new Position(position.x, position.y - 1);
      if (!this.world.objects.find(x => x.stringify === potential.stringify)) {
        result.push(potential);
      }
    }

    if (position.y < this.world.bound.y) {
      const potential = new Position(position.x, position.y + 1);
      if (!this.world.objects.find(x => x.stringify === potential.stringify)) {
        result.push(potential);
      }
    }

    return result;
  }
}
