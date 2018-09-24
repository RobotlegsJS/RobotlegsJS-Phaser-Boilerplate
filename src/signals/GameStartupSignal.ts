import { injectable } from '@robotlegsjs/core';
import { Signal } from '@robotlegsjs/signals';

@injectable()
export class GameStartupSignal extends Signal {
  constructor() {
    super(Number);
  }
}
