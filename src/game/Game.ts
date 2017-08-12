import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";

import { PhaserBundle, ContextStateManager } from "@robotlegsjs/phaser";

import { StateMediatorConfig } from "./config/StateMediatorConfig";
import { GameConfig } from "./config/GameConfig";

import { StateKey } from "./constant/StateKey";

import { Boot } from "./state/Boot";
import { Preload } from "./state/Preload";
import { GameTitle } from "./state/GameTitle";
import { Main } from "./state/Main";
import { GameOver } from "./state/GameOver";

export class Game extends Phaser.Game {

    private _context: IContext;

    constructor(
        width?: number | string,
        height?: number | string,
        renderer?: number,
        parent?: any,
        state?: any,
        transparent?: boolean,
        antialias?: boolean,
        physicsConfig?: any
    ) {
        super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

        this._context = new Context();
        this._context
            .install(MVCSBundle)
            .install(PhaserBundle)
            .configure(new ContextStateManager(this.state))
            .configure(GameConfig)
            .configure(StateMediatorConfig)
            .initialize();

        this.state.add(StateKey.BOOT, Boot, false);
        this.state.add(StateKey.PRELOAD, Preload, false);
        this.state.add(StateKey.GAME_TITLE, GameTitle, false);
        this.state.add(StateKey.MAIN, Main, false);
        this.state.add(StateKey.GAME_OVER, GameOver, false);

        this.state.start(StateKey.BOOT);
    }
}
