import { injectable } from "@robotlegsjs/core";

@injectable()
export class GameModel {
    private _rotationDirection: number = 1;

    private _width: number = 300;

    private _height: number = 300;

    public get rotationDirection(): number {
        return this._rotationDirection;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public changeRotationDirection(): void {
        this._rotationDirection = -this._rotationDirection;
    }

    public resize(width: number, height: number): void {
        this._width = width;
        this._height = height;
    }
}
