import { Queue } from '../common/queue';
import { IPosition } from '../game-infra/position';
import { ActorBase } from './actor-base';

export class WfsActor extends ActorBase {
  public goToGoal(): void {
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
}
