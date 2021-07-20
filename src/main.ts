import { Actor } from './actor/actor';
import { Brick } from './game-object/brick';
import { Goal } from './game-object/goal';
import { Start } from './game-object/start';
import { GameSystem } from './game-system';

const world = document.querySelector('#world') as HTMLCanvasElement;
const foreground = document.querySelector('#curtain') as HTMLCanvasElement;
const path = document.querySelector('#path') as HTMLCanvasElement;
let system: GameSystem;

let goal: Goal;
let start: Start;

export function resetWorld(resolution: string | number): void {
  world.getContext('2d').clearRect(0, 0, world.width, world.height);
  path.getContext('2d').clearRect(0, 0, path.width, path.height);
  system?.stop();

  system = new GameSystem(foreground, +resolution);
  system.registerInteract(Brick.createBrickHandler);

  system.renderWorld(world.getContext('2d'));

  start = new Start();
  system.activeSprite(start);
  goal = new Goal();
  system.activeSprite(goal);

  for (let index = 0; index < 200 / +resolution; index++) {
    const brick = new Brick();
    system.activeSprite(brick);
  }

  system.start();
}

export function wfsAction(): void {
  path.getContext('2d').clearRect(0, 0, path.width, path.height);
  const actor = new Actor(system, start, goal);
  actor.wfsFind();
  system.renderPath(path.getContext('2d'), actor.pathToPrint);
}

export function heuristicAction(): void {
  path.getContext('2d').clearRect(0, 0, path.width, path.height);
  const actor = new Actor(system, start, goal);
  actor.heuristicFind();
  system.renderPath(path.getContext('2d'), actor.pathToPrint);
}

export function aStarAction(): void {
  path.getContext('2d').clearRect(0, 0, path.width, path.height);
  const actor = new Actor(system, start, goal);
  actor.aStarFind();
  system.renderPath(path.getContext('2d'), actor.pathToPrint);
}

resetWorld(25);

window['resetWorld'] = resetWorld;
window['wfsAction'] = wfsAction;
window['heuristicAction'] = heuristicAction;
window['aStarAction'] = aStarAction;
