import { SceneKey } from "../constants/SceneKey";
import { Atlases, Images } from "../assets";
import { loadAtlases, loadImages } from "../assetLoader";

export class Preload extends Phaser.Scene {
    public preload(): void {
        loadAtlases(this, Atlases.Main.Atlas);
        loadImages(this, Images);
    }

    public create(): void {
        console.log("Preload scene create");
        this.scene.start(SceneKey.MAIN);
        this.scene.remove(this);
    }
}
