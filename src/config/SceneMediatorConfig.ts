import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { ISceneMediatorMap, IViewMediatorMap } from "@robotlegsjs/phaser";
import { BootMediator } from "../mediators/BootMediator";
import { MainMediator } from "../mediators/MainMediator";
import { PreloadMediator } from "../mediators/PreloadMediator";
import { Boot, Main, Preload } from "../scenes";
import { MushroomView } from "../views";
import MushroomViewMediator from "../mediators/MushroomViewMediator";

@injectable()
export class SceneMediatorConfig implements IConfig {
    @inject(ISceneMediatorMap)
    private sceneMediatorMap: ISceneMediatorMap;

    @inject(IViewMediatorMap)
    private viewMediatorMap:IViewMediatorMap;

    public configure(): void {
        this.mapSceneMediators();
        this.mapViewMediators();
    }

    private mapSceneMediators(): void {
        this.sceneMediatorMap.map(Boot).toMediator(BootMediator);
        this.sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
        this.sceneMediatorMap.map(Main).toMediator(MainMediator);
    }

    private mapViewMediators(): void {
        this.viewMediatorMap.map(MushroomView).toMediator(MushroomViewMediator);
    }
}
