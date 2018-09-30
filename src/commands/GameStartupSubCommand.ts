import { inject, injectable } from "@robotlegsjs/core";
import { AsyncCommand } from "@robotlegsjs/macrobot";

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
