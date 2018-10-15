import { injectable } from "@robotlegsjs/core";
import { SceneMediator } from "@robotlegsjs/phaser";
import { Preload } from "../scenes/";

@injectable()
export class BgMediator extends SceneMediator<Preload> {
    
    public initialize(): void {
        console.log("BgMediator initialize");
    }
    public destroy(): void {
        console.log("BgMediator destroy");
    }
}
