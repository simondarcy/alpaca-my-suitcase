var loadingText;
var Preloader = {

    preload : function() {
        //
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.pageAlignHorizontally = true;
        //game.scale.pageAlignVertically = true;

        //game.scale.refresh();

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#000';

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);


        game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        WebFontConfig = {
            active: function() {
                game.time.events.add(Phaser.Timer.SECOND, function() {}, this);
            },
            google: {
                families: ['Montserrat']
            }
        };


        //Home screen assets
        game.load.image("_start_alpaca", "img/_alpaca_start_screen.png");
        game.load.image('rtelogo', 'img/_logo.png');
        game.load.image('_bg', 'img/_bg.png');
        game.load.image('_suitcase', 'img/_suitcase_full.png');


        game.load.image("_over_alpaca", "img/_alpaca_try_again.png");
        game.load.image("_winner_alpaca", "img/_alpaca_winner.png");

        game.load.image("purple", "img/purple.png");
        game.load.image("yellow", "img/yellow.png");
        game.load.image("white", "img/white.png");


        //load everything ere

        game.load.image("playAgain", "img/button-style.png");
        game.load.image("playBtn", "img/button-play.png");
        game.load.image("tryAgainBtn", "img/button-try-again.png");

        game.load.image("bgr", "img/bg.png");
        game.load.image("title", "img/_game_title.png?v=2");
        game.load.image("bgr", "img/bg.png");


        game.load.image("ground", "images/ground.png");
        game.load.image("skirt", "img/skirt.png");
        game.load.image("hat", "img/hat.png");
        game.load.image("wellies", "img/wellies.png");
        game.load.image("pitchfork", "img/pitchfork.png");
        game.load.image("glasses", "img/glasses.png");
        game.load.image("guide", "img/guide.png");
        game.load.image("suitcase", "img/suitcase-score.png?v=1");

        game.load.spritesheet("hero", "img/sprite-alpaca.png", 330, 371);
        game.load.image("bar", "img/jump-bar.png");

        game.load.image("hay1", "img/hay1.png");
        game.load.image("hay2", "img/hay2.png");
        game.load.image("hay3", "img/hay3.png");

        game.load.spritesheet("cloud", "img/sprite-angry-cloud.png", 220, 202);

        //Parallax bgr
        game.load.image('mountains-back', 'img/sky-back.png');
        game.load.image('mountains-mid1', 'img/sky-middle.png?v=1');
        game.load.image('mountains-mid2', 'img/sky-front.png?v2');

        //Share Buttons
        game.load.image('facebook', 'img/share_facebook.png');
        game.load.image('twitter', 'img/share_twitter.png');
        game.load.image('link', 'img/share_link.png');


        //Audio

        game.load.audio('collect', ['audio/collect.wav']);
        game.load.audio('death', ['audio/death.wav']);
        game.load.audio('jump', ['audio/jump.wav']);
        game.load.audio('music', ['audio/music.wav']);
        game.load.audio('winner', ['audio/winner.wav']);




        loadingText = game.add.text(32, 100, 'Loading', { fill: '#FFF'});
        game.load.start();

    },
    loadStart : function(){
        loadingText.setText("Loading ...");
    },
    loadComplete : function(){
        game.state.start('StateBegin');
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " of " + totalFiles + ' loaded');
    },
    create: function () {

    }
};