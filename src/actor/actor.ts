import { PriorityQueue } from '../common/priority-queue';
import { Queue } from '../common/queue';
import { IPosition, Position } from '../game-infra/position';
import { GameSystem } from '../game-system';

export class Actor {
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
      const current = queue.dequeue();

      if (current.stringify === this.goal.stringify) {
        this.visited.push(current);
        break;
      }

      if (visited.has(current.stringify)) {
        continue;
      }

      this.visited.push(current);
      visited.add(current.stringify);

      const neighbors = this.getNeighbors(current);

      for (let neighbor of neighbors) {
        if (bricks.find(x => x.stringify === neighbor.stringify)) {
          continue;
        }

        if (visited.has(neighbor.stringify)) {
          continue;
        }

        if (neighbor.stringify === this.goal.stringify) {
          neighbor = this.goal;
        }

        queue.enqueue(neighbor);

        this.mapPath.set(neighbor, current);
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
      const current = queue.dequeue();

      if (current.stringify === this.goal.stringify) {
        this.visited.push(current);
        break;
      }

      if (visited.has(current.stringify)) {
        continue;
      }

      this.visited.push(current);
      visited.add(current.stringify);

      const neighbors = this.getNeighbors(current);

      for (let neighbor of neighbors) {
        if (bricks.find(x => x.stringify === neighbor.stringify)) {
          continue;
        }

        if (visited.has(neighbor.stringify)) {
          continue;
        }

        if (neighbor.stringify === this.goal.stringify) {
          neighbor = this.goal;
        }

        const priority = this.getDistance(neighbor, this.goal);

        queue.enqueue(neighbor, priority);

        this.mapPath.set(neighbor, current);
      }
    }
  }

  public aStarFind(): void {
    const bricks = this.world.objects.filter(
      x => x.stringify !== this.goal.stringify,
    );

    const cost = new Map<string, number>();
    cost.set(this.start.stringify, 0);

    const queue = new PriorityQueue<IPosition>();
    queue.enqueue(this.start, 0);

    while (queue.length > 0) {
      const current = queue.dequeue();

      if (current.stringify === this.goal.stringify) {
        this.visited.push(current);
        break;
      }

      this.visited.push(current);
      const neighbors = this.getNeighbors(current);

      for (let neighbor of neighbors) {
        if (bricks.find(x => x.stringify === neighbor.stringify)) {
          continue;
        }

        if (neighbor.stringify === this.goal.stringify) {
          neighbor = this.goal;
        }

        const newCost = cost.get(current.stringify) + 1;
        if (
          !cost.has(neighbor.stringify) ||
          newCost < cost.get(neighbor.stringify)
        ) {
          const priority = newCost + this.getDistance(neighbor, this.goal);
          cost.set(neighbor.stringify, newCost);
          queue.enqueue(neighbor, priority);

          this.mapPath.set(neighbor, current);
        }
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

  private getDistance(position: IPosition, target: IPosition): number {
    return Math.abs(position.x - target.x) + Math.abs(target.y - position.y);
  }
}
