export interface IPosition {
  x: number;
  y: number;

  readonly stringify: string;
}

export class Position implements IPosition {
  public x: number;
  public y: number;
  public get stringify(): string {
    return `${this.x}, ${this.y}`;
  }

  constructor(x: number = 0, y: number = 0) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }
}
