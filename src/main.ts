import { AStarActor } from './actor/a-star-actor';
import { ActorBase } from './actor/actor-base';
import { HeuristicActor } from './actor/heuristic-actor';
import { WfsActor } from './actor/wfs-actor';
import { IPosition } from './game-infra/position';
import { Brick } from './game-object/brick';
import { Goal } from './game-object/goal';
import { Start } from './game-object/start';
import { GameSystem } from './game-system';

const world: HTMLCanvasElement = document.querySelector('#world');
const foreground: HTMLCanvasElement = document.querySelector('#curtain');
const path: HTMLCanvasElement = document.querySelector('#path');
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

const resolution: HTMLInputElement = document.querySelector('input');
const resetButton: HTMLButtonElement = document.querySelector('#reset');
resetButton.addEventListener('click', () => resetWorld(resolution.value));

const wfsButton: HTMLButtonElement = document.querySelector('#wfs');
wfsButton.addEventListener('click', () => wfsAction());

const heuristicButton: HTMLButtonElement = document.querySelector('#heuristic');
heuristicButton.addEventListener('click', () => heuristicAction());

const aStarButton: HTMLButtonElement = document.querySelector('#a-star');
aStarButton.addEventListener('click', () => aStarAction());

// window['resetWorld'] = resetWorld;
// window['wfsAction'] = wfsAction;
// window['heuristicAction'] = heuristicAction;
// window['aStarAction'] = aStarAction;
