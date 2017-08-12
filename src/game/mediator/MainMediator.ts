import { injectable, inject } from "@robotlegsjs/core";

import { StateMediator } from "@robotlegsjs/phaser";

import { GameModel } from "../model/GameModel";
import { Main } from "../state/Main";

@injectable()
export class MainMediator extends StateMediator<Main> {

    @inject(GameModel)
    public gameModel: GameModel;

    public initialize(): void {
        console.log("MainMediator: initialize");
        console.log("score: " + this.gameModel.score);
        console.log("level: " + this.gameModel.level);
    }

    public destroy(): void {
        console.log("MainMediator: destroy");
    }
}
