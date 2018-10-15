import { Atlases } from '../assets';


export class MushroomView extends Phaser.GameObjects.Container {
    private  mushroomImage: Phaser.GameObjects.Image;
    private  mushroomTween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.creteMushRoomImage();
        this.createMushroomMovingTween();
    }
  
    public startMushRoomTween():void {
       this.mushroomTween.resume();
    }

    private creteMushRoomImage():void {
      const config: {key:string; frame: string }= {
          key : Atlases.Main.Atlas.Name,
          frame : Atlases.Main.Atlas.Frames.Mushroom
      }
      this.mushroomImage = this.scene.make.image(config);
      this.add(this.mushroomImage);
    }
    
    private createMushroomMovingTween():void {
        const tweenConfig: any = {
            targets: this,
            yoyo: true,
            duration: 500,
            x: 500,
            paused: true,
            onComplete: ()=> {
                this.mushroomTween.paused = true;
            } 
          };
       this.mushroomTween = this.scene.make.tween(tweenConfig);   
    }
}