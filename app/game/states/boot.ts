/// <reference path='../_references.ts' />

module GameApp.States {
	'use strict'; 
	
   export class Boot extends Phaser.State {
 
        preload() {
 
        }
 
        create() {
 
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
 
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
 
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
 
            this.game.state.start('Preloader', true, false);
 
        }
 
    }
}
