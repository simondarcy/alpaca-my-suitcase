var StateBegin={

    preload:function(){

    },
    create:function()
    {

        //Background
        tilesprite = game.add.sprite(0, 0, '_bg');
        tilesprite.width = game.world.width;
        tilesprite.height = game.world.height;

        //Title
        title = game.add.sprite(game.width/2 - titleStartx, titleStartY, 'title');
        title.anchor.set(0,0.5);
        title.scale.setTo(titleScale);

        //alpaca
        alpaca = game.add.sprite(game.width/2.24, game.height -23, '_start_alpaca');
        alpaca.anchor.setTo(1, 1);
        alpaca.scale.set(alpacaScale);

        instuctionsStyle = {
            font: instructionFontSize,
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        instuctions = game.add.text(Math.round(game.width/2), Math.round(game.height/2)-instuctionsY, 'Press and release to jump,\n avoid hay and bad weather,\ncollect all the items!', instuctionsStyle);
        instuctions.anchor.setTo(instructionsOffset, 1);
        instuctions.lineSpacing = letterSpacing;


        //add a sprite to be used as a play again button
        this.playAgain=game.add.sprite(game.width/1.6 + playBtnOffset, (game.height/2) +60 ,"playBtn");
        //center the button image
        this.playAgain.anchor.set(0.5,1);
        this.playAgain.scale.setTo(btnScale);
        //enable for input
        this.playAgain.inputEnabled=true;
        //add an event listener
        this.playAgain.events.onInputDown.add(this.restartGame,this);


        //Logo
        var logo = game.add.sprite(game.width/2 - 45, logoStartY, 'rtelogo');
        logo.anchor.setTo(1, 0.5);
        logo.scale.set(logoScale);


        //Suitcase
        suitcase = game.add.sprite(game.width/2-15, game.height-21, '_suitcase');
        suitcase.anchor.setTo(0, 1);
        suitcase.scale.set(suitcaseScale);



        //Preloader.createShareIcons()
    },
    restartGame:function()
    {


        if(navigator.userAgent.indexOf("Chrome") != -1){

            if (isMobile==-1){

                game.scale.startFullScreen(false);
            }
            else{

                game.scale.startFullScreen(false);
            }



        }

        game.state.start("StateMain");
    }

};