import { ViewMediator } from "@robotlegsjs/phaser";
import { MushroomView } from "../views";

export default class MushroomViewMediator extends  ViewMediator <MushroomView> {
    public initialize(): void {
        console.log(`MushroomViewMediator initialize`);
        this.addViewListeners();

    } 
    
    public destroy(): void {
        console.log(`MushroomViewMediator destroy`)
    }

   private addViewListeners():void {
      this.on(this.view, 'pointerup', this.onMushroomClick)
   }

   private onMushroomClick = ():void =>{
     console.log("on mushroom clicked");
     this.view.startMushRoomTween();
   }

} 