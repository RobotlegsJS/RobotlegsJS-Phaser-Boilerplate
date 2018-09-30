import { NinePatchPlugin } from "@koreez/phaser3-ninepatch";

export const gameConfig: IConfig = {
    type: Phaser.AUTO,
    width: 540,
    height: 960,
    parent: "game-container",
    scene: [],
    transparent: true,
    dom: {
        createContainer: true
    },
    plugins: {
        global: [{ key: "NinePatchPlugin", plugin: NinePatchPlugin, start: true }]
    }
};

export interface IConfig {
    type: number;
    width: number;
    height: number;
    parent: string;
    scene: any[];
    transparent: boolean;
    dom: any;
    plugins: any;
}
