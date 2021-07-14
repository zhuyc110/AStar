import { Queue } from '../common/queue';
import { IPosition, Position } from '../game-infra/position';
import { GameSystem } from '../game-system';

export class Actor {
  public path: IPosition[] = [];

  constructor(
    private world: GameSystem,
    private start: IPosition,
    private goal: IPosition,
  ) {}

  public findPath(): void {
    const bricks = this.world.objects.filter(
      x => x.stringify !== this.goal.stringify,
    );

    const visited = new Set<string>();

    const queue = new Queue<IPosition>();
    queue.enqueue(this.start);
    while (queue.length > 0) {
      const node = queue.dequeue();

      if (node.stringify === this.goal.stringify) {
        break;
      }

      if (visited.has(node.stringify)) {
        continue;
      }

      this.path.push(node);
      visited.add(node.stringify);

      const neighbors = this.getNeighbors(node);

      for (const neighbor of neighbors) {
        if (bricks.find(x => x.stringify === neighbor.stringify)) {
          continue;
        }

        if (visited.has(neighbor.stringify)) {
          continue;
        }

        queue.enqueue(neighbor);
      }
    }
  }

  private getNeighbors(position: IPosition): IPosition[] {
    const result: IPosition[] = [];

    if (position.x > 0) {
      const potential = new Position(position.x - 1, position.y);
      result.push(potential);
    }

    if (position.x < this.world.bound.x) {
      const potential = new Position(position.x + 1, position.y);
      result.push(potential);
    }

    if (position.y > 0) {
      const potential = new Position(position.x, position.y - 1);
      result.push(potential);
    }

    if (position.y < this.world.bound.y) {
      const potential = new Position(position.x, position.y + 1);
      result.push(potential);
    }

    return result;
  }
}
