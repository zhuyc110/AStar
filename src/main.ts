import { AStarActor } from './actor/a-star-actor';
import { ActorBase } from './actor/actor-base';
import { HeuristicActor } from './actor/heuristic-actor';
import { WfsActor } from './actor/wfs-actor';
import { IPosition } from './game-infra/position';
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

export function specialWorld(): void {
  world.getContext('2d').clearRect(0, 0, world.width, world.height);
  path.getContext('2d').clearRect(0, 0, path.width, path.height);
  system?.stop();
}

function goToGoal(
  create: (game: GameSystem, start: IPosition, goal: IPosition) => ActorBase,
): void {
  path.getContext('2d').clearRect(0, 0, path.width, path.height);
  const actor = create(system, start, goal);
  actor.goToGoal();
  system.renderVisited(path.getContext('2d'), actor.visited);
  system.renderPath(path.getContext('2d'), actor.pathToPrint);
}

export function wfsAction(): void {
  goToGoal((game, start, goal) => new WfsActor(game, start, goal));
}

export function heuristicAction(): void {
  goToGoal((game, start, goal) => new HeuristicActor(game, start, goal));
}

export function aStarAction(): void {
  goToGoal((game, start, goal) => new AStarActor(game, start, goal));
}

resetWorld(25);

window['resetWorld'] = resetWorld;
window['wfsAction'] = wfsAction;
window['heuristicAction'] = heuristicAction;
window['aStarAction'] = aStarAction;
