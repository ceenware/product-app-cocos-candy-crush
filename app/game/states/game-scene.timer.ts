module GameApp.States{
	'use strict';
	
	export class GameTimer{
		
		game: Phaser.Game;
      
      timer: Phaser.Timer;
      timerEvent: Phaser.TimerEvent;
      timerLabel: Phaser.Text;
      timerText: Phaser.Text;
      endedAsGameOver: boolean = false;
		
		constructor(game: Phaser.Game) {
			this.game = game;
		}
		
		renderTimer() {
         if(this.timer.running){
            this.timerText.text = this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000))
         }
         else if(this.endedAsGameOver){
            this.timerText.text = GameApp.I18n.t('gameOver');
         }
         else{
            this.timerText.text = GameApp.I18n.t('done');
         }
      }
      
      createTimer() {
         
         this.timerLabel = this.game.add.text(32, 20, GameApp.I18n.t('time'), {
            font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
            fill: "white",
            align: "center",
            fontSize: 20
         });
         this.timerLabel.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);

         this.timerText = this.game.add.text(32, 40, "02:00", {
             font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
             fill: "white",
             align: "center",
             fontSize: 30
         });
         this.timerText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
         
         this.timer = this.game.time.create();
         this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 30, this.endTimer, this);
         this.timer.start();
      }
      
      endTimer(){
         this.timer.stop();
         
         var levelNumber = parseInt(this.game.state.states['GameScene'].levelNumber);
         if(levelNumber <= 2){
             levelNumber = levelNumber+1;
             
             
              var bg = this.game.add.sprite(this.game.world.centerX, -200, 'levelComplete');
              bg.anchor.setTo(0.5, 0.5);

              var completeText = this.game.add.text(this.game.world.centerX, -200, GameApp.I18n.t('levelComplete'), {
                 font: "Gill Sans Bold, Arial, Microsoft YaHei, PingFang SC, sans-serif",
                 fill: "white",
                 align: "center",
                 fontSize: 42
              });
              completeText.anchor.set(0.5, 0.5);
              completeText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);

              
              var tween = this.game.add.tween(bg).to({ x: this.game.world.centerX, y: this.game.world.centerY }, 3000, Phaser.Easing.Bounce.Out, true);
              this.game.add.tween(completeText).to({ x: this.game.world.centerX, y: this.game.world.centerY }, 3000, Phaser.Easing.Bounce.Out, true);
              
              tween.onComplete.add(() => {
                 this.changeLevel(levelNumber);
              }, this)
             
             
         }
         else{
            this.endedAsGameOver = true;
            this.timerText.text = GameApp.I18n.t('gameOver');
         }
        
      }

      updateLabels(){
         if(this.timerLabel){
            this.timerLabel.text = GameApp.I18n.t('time');
         }

         if(this.timerText && !this.timer.running){
            this.timerText.text = this.endedAsGameOver ? GameApp.I18n.t('gameOver') : GameApp.I18n.t('done');
         }
      }
      
      changeLevel(levelNumber: number){
         this.game.state.states['GameScene'].levelNumber = levelNumber;
         this.game.state.states['GameScene'].score = this.game.state.states['GameScene'].score;
         this.game.state.start('GameScene', true, false);
      }
      
      formatTime(s: number){
         var minutes: any = "0" + Math.floor(s / 60);
         var seconds = "0" + (s - minutes * 60);
         return minutes.substr(-2) + ":" + seconds.substr(-2); 
      }
		
	}
	
}
