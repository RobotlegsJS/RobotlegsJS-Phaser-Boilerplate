import { inject, injectable } from "@robotlegsjs/core";
import { SequenceMacro, AsyncCommand } from "@robotlegsjs/macrobot";
import { GameModel } from "../models/GameModel";
import { GameModelChangeSignal } from "../signals";

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

@injectable()
export class GameStartupSubCommand extends AsyncCommand {
    @inject(Number)
    protected _delay: number;

    public execute(): void {
        setTimeout(this.onTimeout.bind(this), this._delay);
    }

    protected onTimeout(): void {
        this.dispatchComplete(true);
    }
}
