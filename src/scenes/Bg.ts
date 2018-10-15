import { gameConfig } from "../constants/GameConfig";
import { Atlases } from "../assets";

export class Bg extends Phaser.Scene {
    public create(): void {
        console.log("Bg scene create");
        this.add.image(gameConfig.width * 0.5, gameConfig.height * 0.5, Atlases.Main.Atlas.Name, Atlases.Main.Atlas.Frames.Bg);
    }
}
