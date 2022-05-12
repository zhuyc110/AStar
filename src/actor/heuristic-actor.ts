import { PriorityQueue } from '../common/priority-queue';
import { IPosition } from '../game-infra/position';
import { ActorBase } from './actor-base';

export class HeuristicActor extends ActorBase {
  public goToGoal(): void {
    const bricks = this.world.objects.filter(
      x => x.stringify !== this.goal.stringify,
    );

    const visited = new Set<string>();

    const queue = new PriorityQueue<IPosition>();
    queue.enqueue(this.start, 0);
    while (queue.length > 0) {
      const current = queue.dequeue();

      this.visited.push(current);
      if (current.stringify === this.goal.stringify) {
        break;
      }

      if (visited.has(current.stringify)) {
        continue;
      }

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
}
