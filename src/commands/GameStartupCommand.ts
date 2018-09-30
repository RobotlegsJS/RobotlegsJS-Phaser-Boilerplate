import { inject, injectable } from "@robotlegsjs/core";
import { SequenceMacro } from "@robotlegsjs/macrobot";
import { GameModel } from "../models/GameModel";
import { GameModelChangeSignal } from "../signals";
import { GameStartupSubCommand } from "./GameStartupSubCommand";

@injectable()
export class GameStartupCommand extends SequenceMacro {
    @inject(GameModel)
    private gameModel: GameModel;

    @inject(GameModelChangeSignal)
    private gameModelChangeSignal: GameModelChangeSignal;

    public prepare(): void {
        this.add(GameStartupSubCommand);
    }

    protected dispatchComplete(success: boolean): void {
        this.gameModel.changeRotationDirection();
        this.gameModel.resize(this.gameModel.width / 2, this.gameModel.height / 2);
        this.gameModelChangeSignal.dispatch();
        super.dispatchComplete(success);
    }
}
