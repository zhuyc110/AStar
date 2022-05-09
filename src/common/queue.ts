export class Queue<T> {
  public get length(): number {
    return this.items.length;
  }

  private items: T[];

  constructor() {
    this.items = [];
  }

  public enqueue(value: T): void {
    this.items.push(value);
  }

  public dequeue(): T {
    return this.getFirst(true);
  }

  public peek(): T {
    return this.getFirst();
  }

  public includes(expression: (x: T) => boolean): boolean {
    return !!this.items.find(x => expression(x));
  }

  private getFirst(deleteIt: boolean = false): T {
    if (this.items.length === 0) {
      return null;
    }

    const item = this.items[0];
    if (deleteIt) {
      this.items.splice(0, 1);
    }
    return item;
  }
}
