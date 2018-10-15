// tslint:disable-next-line
/// <reference path="../definitions/phaser.d.ts" />
import "reflect-metadata";
import "phaser";
import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextSceneManager, PhaserBundle } from "@robotlegsjs/phaser";
import { RobotlegsConfig } from "./config/RobotlegsConfig";
import { SceneMediatorConfig } from "./config/SceneMediatorConfig";
import { gameConfig } from "./constants/GameConfig";
import { SceneKey } from "./constants/SceneKey";
import { SignalCommandMapExtension } from "@robotlegsjs/signalcommandmap";
import { Preload, Main, Boot, Bg } from "./scenes";

class Game extends Phaser.Game {
    private _context: Context;

    constructor(config: any) {
        super(config);
        window.onresize = this.resize.bind(this);
        this.resize();

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle, SignalCommandMapExtension)
            .configure(new ContextSceneManager(this.scene))
            .configure(SceneMediatorConfig)
            .configure(RobotlegsConfig)
            .initialize();
        (this as any).scene.add(SceneKey.BOOT, new Boot(SceneKey.BOOT));
        (this as any).scene.add(SceneKey.PRELOAD, new Preload(SceneKey.PRELOAD));
        (this as any).scene.add(SceneKey.BG, new Bg(SceneKey.BG));
        (this as any).scene.add(SceneKey.MAIN, new Main(SceneKey.MAIN));
        (this as any).scene.start(SceneKey.BOOT);
    }

    public resize(): void {
        const { width, height } = this.config as any;
        const scale: number = Math.min(window.innerHeight / height, window.innerWidth / width);
        this.canvas.style.position = "absolute";
        this.canvas.style.width = width * scale + "px";
        this.canvas.style.height = height * scale + "px";
        this.canvas.style.left = (window.innerWidth - width * scale) * 0.5 + "px";
        this.canvas.style.top = (window.innerHeight - height * scale) * 0.5 + "px";
        if (this.context) {
            (this.context as any).rect(0, 0, width, height);
            (this.context as any).fillStyle = "red";
            (this.context as any).fill();
        }
    }
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        (window as IWindow).game = new Game(gameConfig);
    }
};

interface IWindow extends Window {
    game: Game;
}
