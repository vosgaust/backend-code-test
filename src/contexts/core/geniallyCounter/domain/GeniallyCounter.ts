export default class GeniallyCounter {
  private _count = 0;

  constructor(initCount?: number) {
    this._count = initCount || 0;
  }

  increase(): void {
    this._count++;
  }

  get count(): number {
    return this._count;
  }
}