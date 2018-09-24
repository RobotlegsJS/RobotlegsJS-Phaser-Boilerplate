import { SceneKey } from '../constants/SceneKey';

export class Boot extends Phaser.Scene {
  public create(): void {
    console.log('Boot scene create');
    this.scene.start(SceneKey.PRELOAD);
    this.scene.remove(this);
  }
}
