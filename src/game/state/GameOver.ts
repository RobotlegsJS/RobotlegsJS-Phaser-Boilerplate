import { StateKey } from "../constant/StateKey";
import { BaseState } from "./BaseState";

export class GameOver extends BaseState {

    public create(): void {
        super.create();
    }

    public restartGame(): void {
        this.game.state.start(StateKey.MAIN);
    }
}
