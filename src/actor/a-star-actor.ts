import { PriorityQueue } from '../common/priority-queue';
import { IPosition } from '../game-infra/position';
import { ActorBase } from './actor-base';

export class AStarActor extends ActorBase {
  public goToGoal(): void {
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
}
