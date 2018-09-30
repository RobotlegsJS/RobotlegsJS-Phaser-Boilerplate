import { inject, injectable } from "@robotlegsjs/core";
import { SceneMediator } from "@robotlegsjs/phaser";
import { GameModel } from "../models/GameModel";
import { Main } from "../scenes";
import { GameStartupSignal, GameModelChangeSignal } from "../signals";

@injectable()
export class MainMediator extends SceneMediator<Main> {
    @inject(GameModelChangeSignal)
    private gameModelChangeSignal: GameModelChangeSignal;

    @inject(GameStartupSignal)
    private gameStartupSignal: GameStartupSignal;

    @inject(GameModel)
    private gameModel: GameModel;

    public destroy(): void {
        console.log("MainMediator destroy");
    }

    public initialize(): void {
        console.log("MainMediator initialize");
        this.scene.onCreationCompleteCb = this.sceneCreated.bind(this);
        this.gameModelChangeSignal.add(this.onGameModelChange);
    }

    protected sceneCreated(): void {
        this.gameStartupSignal.dispatch(Phaser.Math.Between(1000, 5000));
    }

    private onGameModelChange: () => void = () => {
        this.update();
    };

    private update(): void {
        this.scene.redraw(this.gameModel.width, this.gameModel.height, this.gameModel.rotationDirection);
    }
}
