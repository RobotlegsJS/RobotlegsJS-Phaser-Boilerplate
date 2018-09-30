import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { ISceneMediatorMap } from "@robotlegsjs/phaser";
import { BootMediator } from "../mediators/BootMediator";
import { MainMediator } from "../mediators/MainMediator";
import { PreloadMediator } from "../mediators/PreloadMediator";
import { Boot, Main, Preload } from "../scenes";

@injectable()
export class SceneMediatorConfig implements IConfig {
    @inject(ISceneMediatorMap)
    private sceneMediatorMap: ISceneMediatorMap;

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
        return;
    }
}
