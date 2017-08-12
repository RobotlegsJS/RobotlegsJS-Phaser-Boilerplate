import { injectable, IConfig, inject } from "@robotlegsjs/core";

import { IStateMediatorMap } from "@robotlegsjs/phaser";

import { BootMediator } from "../mediator/BootMediator";
import { PreloadMediator } from "../mediator/PreloadMediator";
import { GameTitleMediator } from "../mediator/GameTitleMediator";
import { MainMediator } from "../mediator/MainMediator";
import { GameOverMediator } from "../mediator/GameOverMediator";

import { Boot } from "../state/Boot";
import { Preload } from "../state/Preload";
import { GameTitle } from "../state/GameTitle";
import { Main } from "../state/Main";
import { GameOver } from "../state/GameOver";

@injectable()
export class StateMediatorConfig implements IConfig {

    @inject(IStateMediatorMap)
    public stateMediatorMap: IStateMediatorMap;

    public configure(): void {
        this.mapMediators();
    }

    private mapMediators(): void {
        this.stateMediatorMap.map(Boot).toMediator(BootMediator);
        this.stateMediatorMap.map(Preload).toMediator(PreloadMediator);
        this.stateMediatorMap.map(GameTitle).toMediator(GameTitleMediator);
        this.stateMediatorMap.map(Main).toMediator(MainMediator);
        this.stateMediatorMap.map(GameOver).toMediator(GameOverMediator);
    }
}
