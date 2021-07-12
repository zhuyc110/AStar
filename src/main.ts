import { Brick } from './game-object/brick';
import { Goal } from './game-object/goal';
import { GameSystem } from './game-system';

const world = document.querySelector('#world') as HTMLCanvasElement;
const foreground = document.querySelector('#curtain') as HTMLCanvasElement;
let system: GameSystem;

let goal: Goal;

export function resetWorld(resolution: string | number): void {
  world.getContext('2d').clearRect(0, 0, world.width, world.height);
  system?.stop();

  system = new GameSystem(foreground, +resolution);
  system.registerInteract(Brick.createBrickHandler);

  system.renderWorld(world.getContext('2d'));

  goal = new Goal();
  system.activeSprite(goal);

  for (let index = 0; index < 200 / +resolution; index++) {
    const brick = new Brick();
    system.activeSprite(brick);
  }

  system.start();
}

resetWorld(25);

window['resetWorld'] = resetWorld;
