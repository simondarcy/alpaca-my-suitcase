var StateOver={

    create:function()
    {

        //Background

        tilesprite = game.add.sprite(0, 0, '_bg');
        tilesprite.width = game.world.width;
        tilesprite.height = game.world.height;

        //alpaca
        alpaca = game.add.sprite(game.width/2.24, game.height -23, '_over_alpaca');
        alpaca.anchor.setTo(1, 1);
        alpaca.scale.set(alpacaScale);

        //add a sprite to be used as a play again button
        this.playAgain=game.add.sprite(game.width/1.6 + 2, (game.height/2) +60,"playAgain");
        //center the button image
        this.playAgain.anchor.set(0.5,1);
        this.playAgain.scale.setTo(btnScale);

        //enable for input
        this.playAgain.inputEnabled=true;
        //add an event listener
        this.playAgain.events.onInputDown.add(this.restartGame,this);

        instuctionsStyle = {
            font: "46px",
            fill: '#FFFF00',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        instuctions = game.add.text(Math.round(game.width/2)-overTextOffsetX, Math.round(game.height/2)-10, 'Uh Oh!', instuctionsStyle);
        instuctions.anchor.setTo(-0.5, 1);





    },
    restartGame:function()
    {
        //restart the game by starting stateMain
        game.state.start("StateMain");
    }
};