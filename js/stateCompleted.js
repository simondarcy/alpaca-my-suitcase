var StateCompleted={

    preload:function(){
    },
    create:function()
    {


        //Background
        tilesprite = game.add.sprite(0, 0, '_bg');
        tilesprite.width = game.world.width;
        tilesprite.height = game.world.height;

        hero = game.add.sprite(game.width/2.24, game.height -23, '_winner_alpaca');
        hero.anchor.setTo(1, 1);
        hero.scale.set(alpacaScale);


        //add a sprite to be used as a play again button
        this.playAgain=game.add.sprite(game.width/1.6 + playAgainOffset, (game.height/2) +60,"playAgain");
        //center the button image
        this.playAgain.anchor.set(0.5,1);
        this.playAgain.scale.setTo(btnScale);
        //enable for input
        this.playAgain.inputEnabled=true;
        //add an event listener
        this.playAgain.events.onInputDown.add(this.restartGame,this);


        this.createShareIcons();

        //music.stop();
        winAudio = game.add.audio('winner');
        winAudio.play();


        emitter = game.add.emitter(game.world.centerX, -100, 200);

        //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
        emitter.makeParticles(['purple', 'yellow', 'white']);

        emitter.start(false, 5000, 20);

        instuctionsStyle = {
            font: "46px",
            fill: '#FFFF00',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        instuctions = game.add.text(Math.round(game.width/2)-finalTextOffsetX, Math.round(game.height/2)-finalTextOffsetY, 'You Won!', instuctionsStyle);
        instuctions.anchor.setTo(-0.5, 1);

        instuctionsStyle = {
            font: "16px",
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        instuctions = game.add.text(Math.round(game.width/2), Math.round(game.height/2)-instuctionsY, 'To be in with a chance of winning 2 tickets\nto see Neil Diamond in the 3 arena.\nSimply share on FB or Twitter\nusing the hashtag #rtealpaca', instuctionsStyle);
        instuctions.anchor.setTo(instructionsOffset, 1);
        instuctions.lineSpacing = letterSpacing;



    },
    restartGame:function()
    {
        //restart the game by starting stateMain
        game.state.start("StateMain");
    },
    createShareIcons:function(){

        shareBtnStart = game.world.centerX + shareBtnStartX;


        var facebook = game.add.button(shareBtnStart , game.stage.height-50, 'facebook');
        facebook.anchor.setTo(0.5);
        facebook.scale.set(shareBtnScale);

        var twitter = game.add.button(facebook.x + shareBtnStartPadding, game.stage.height-50, 'twitter');
        twitter.anchor.setTo(0.5);
        twitter.scale.set(shareBtnScale);

        var link = game.add.button(twitter.x + shareBtnStartPadding , game.stage.height-50, 'link');
        link.anchor.setTo(0.5);
        link.scale.set(shareBtnScale);

        facebook.onInputUp.add(function(){
            url = "//www.facebook.com/sharer/sharer.php?u="+window.location.href;
            window.open(url, "_blank")

        }, this);
        twitter.onInputUp.add(function(){
            shareText = "Play Alpaca my Suitcase for a chance to win @NeilDiamond tickets";
            url = "//twitter.com/share?url="+window.location.href+"&text="+shareText+"&via=rte&hashtags=rtealpaca,competition,ploughing17";
            window.open(url, "_blank")
        }, this);

        link.onInputUp.add(function(){
            shareText = "Play Alpaca my Suitcase! for a chance to win 2 tickets to see Neil Diamond live in Dublin" + window.location.origin + window.location.pathname;
            var $temp = document.createElement("input");

            document.body.appendChild($temp);
            $temp.value = shareText;
            $temp.focus();
            $temp.select();
            document.execCommand("copy");
            document.body.removeChild($temp);
            alert("Game link copied to clipboard. Thanks for sharing!");
        }, this);


    }

};