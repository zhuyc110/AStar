class PriorityQueueItem<T> {
  public priority: number;
  public item: T;
}

export class PriorityQueue<T> {
  public get length(): number {
    return this.items.length;
  }

  private items: PriorityQueueItem<T>[];

  constructor() {
    this.items = [];
  }

  public enqueue(value: T, priority: number): void {
    if (this.items.length === 0) {
      this.items.push({ priority, item: value });
      return;
    }

    let insertIndex = 0;
    for (let index = 0; index < this.items.length; index++) {
      const pointer = this.items[index];
      insertIndex = index;
      if (pointer.priority > priority) {
        this.items.splice(insertIndex, 0, { item: value, priority });
        return;
      }
    }
    this.items.push({ priority, item: value });
  }

  public dequeue(): T {
    return this.getFirst(true);
  }

  public peek(): T {
    return this.getFirst();
  }

  private getFirst(deleteIt: boolean = false): T {
    if (this.items.length === 0) {
      return null;
    }

    const item = this.items[0];
    if (deleteIt) {
      this.items.splice(0, 1);
    }
    return item.item;
  }
}
