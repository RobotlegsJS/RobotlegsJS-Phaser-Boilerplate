import { IConfig, IContext, inject, injectable } from "@robotlegsjs/core";
import { ISignalCommandMap } from "@robotlegsjs/signalcommandmap";
import { GameStartupSignal, GameModelChangeSignal } from "../signals";
import { GameStartupCommand } from "../commands";
import { GameModel } from "../models";

@injectable()
export class RobotlegsConfig implements IConfig {
    @inject(IContext)
    public context: IContext;
    @inject(ISignalCommandMap)
    public commandMap: ISignalCommandMap;

    public configure(): void {
        this.mapCommands();
        this.mapManager();
        this.mapModels();
        this.mapSignals();
    }

    private mapCommands(): void {
        this.commandMap.map(GameStartupSignal).toCommand(GameStartupCommand);
    }

    private mapManager(): void {
        return;
    }

    private mapSignals(): void {
        this.context.injector
            .bind(GameModelChangeSignal)
            .toSelf()
            .inSingletonScope();
    }

    private mapModels(): void {
        this.context.injector
            .bind(GameModel)
            .toSelf()
            .inSingletonScope();
    }
}
