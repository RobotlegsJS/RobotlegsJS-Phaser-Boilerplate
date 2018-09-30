import { injectable } from "@robotlegsjs/core";
import { SceneMediator } from "@robotlegsjs/phaser";
import { Preload } from "../scenes/";

@injectable()
export class PreloadMediator extends SceneMediator<Preload> {
    public initialize(): void {
        console.log("PreloadMediator initialize");
    }
    public destroy(): void {
        console.log("PreloadMediator destroy");
    }
}
