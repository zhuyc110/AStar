import { PriorityQueue } from '../common/priority-queue';
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

  public wfsFind(): void {
    const bricks = this.world.objects.filter(
      x => x.stringify !== this.goal.stringify,
    );

    const visited = new Set<string>();

    const queue = new Queue<IPosition>();
    queue.enqueue(this.start);
    while (queue.length > 0) {
      const node = queue.dequeue();
      this.path.push(node);

      if (node.stringify === this.goal.stringify) {
        this.path.push(node);
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

  public heuristicFind(): void {
    const bricks = this.world.objects.filter(
      x => x.stringify !== this.goal.stringify,
    );

    const visited = new Set<string>();

    const queue = new PriorityQueue<IPosition>();
    queue.enqueue(this.start, 0);
    while (queue.length > 0) {
      const node = queue.dequeue();
      this.path.push(node);

      if (node.stringify === this.goal.stringify) {
        this.path.push(node);
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

        const priority = this.getDistance(neighbor);

        queue.enqueue(neighbor, priority);
      }
    }
  }

  private getNeighbors(position: IPosition): IPosition[] {
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

  private getDistance(position: IPosition): number {
    return (
      Math.abs(position.x - this.goal.x) + Math.abs(this.goal.y - position.y)
    );
  }
}
