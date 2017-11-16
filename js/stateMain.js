var score = 0;
var music;

var StateMain = {
    preload: function() {

    },
    create: function() {

        this.isplaying = false;
        score = 0;
        this.clickLock = false;
        this.power = 0;

        this.items = ["skirt", "hat", "glasses", "guide", 'wellies', 'pitchfork'];

        this.createBackground();

        this.suitcase = game.add.sprite(10, 10, "suitcase");

        this.suitcase.scale.setTo(0.5);

        this.firstRun = true;

        textStyle = {
            fill: '#ffffff'
        };
        this.scoreText = game.add.text(33, 15, score, textStyle);

        //add the ground
        this.ground = game.add.sprite(0, game.height, "ground");
        this.ground.width = game.width;
        //add the hero in 
        this.hero = game.add.sprite(game.width * .2, this.ground.y - alpacaHeight, "hero");
        //add the power bar just above the head of the hero
        this.powerBar = game.add.sprite(10, this.hero.y, "bar");
        this.powerBar.scale.setTo(0.5);
        this.powerBar.height = 0;

        //start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable the hero for physics
        game.physics.enable(this.hero, Phaser.Physics.ARCADE);
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        //automatically drag him to floor
        this.hero.body.gravity.y = 200;
        this.hero.body.collideWorldBounds = true;
        //this.hero.body.setSize(0.5, 0.5);
        this.hero.height = alpacaHeight;
        this.hero.width = alpacaWidth;

        this.hero.animations.add('run');
        this.hero.animations.play('run', 8, true);

        this.ground.body.immovable = true;


        //record the initial position
        this.startY = this.hero.y;
        //set listeners
        game.input.onDown.add(this.mouseDown, this);

        this.blocks = game.add.sprite(game.width, this.ground.y, "hay3");


        //Audio
        music = game.add.audio('music');
        collectSound = game.add.audio('collect');
        jumpSound = game.add.audio('jump');
        music.play();
        music.loop = true;

        this.makeBlocks();
        this.makeCloud();
        this.addItem();

    },
    mouseDown: function() {
        if (this.clickLock == true) {
            return;
        }
        if (this.hero.y != this.startY) {
            return;
        }
        game.input.onDown.remove(this.mouseDown, this);
        this.timer = game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
        game.input.onUp.add(this.mouseUp, this);
    },
    mouseUp: function() {
        game.input.onUp.remove(this.mouseUp, this);
        this.doJump();
        game.time.events.remove(this.timer);
        this.power = 0;
        this.powerBar.height = 0;
        game.input.onDown.add(this.mouseDown, this);
    },
    increasePower: function() {
        this.power++;
        this.powerBar.height = -this.power * 4;
        if (this.power > 50) {
            this.power = 50;
        }
    },
    doJump: function() {
        this.hero.animations.stop();
        jumpSound.play()
        this.hero.animations.getAnimation('run').frame = 3;
        this.hero.body.velocity.y = -this.power * 12;
    },
    makeBlocks: function() {
        this.blocks.destroy();

        var wallHeight = game.rnd.integerInRange(1, 3);


        //To make it easier, alway use the single hay item first
        if(this.firstRun){
            wallHeight = 1;
            this.firstRun = false;
        }

        this.blocks = game.add.sprite(game.width+game.rnd.integerInRange(50, 100), this.ground.y, "hay"+wallHeight);

        this.blocks.anchor.set(0.5, 1);

        this.blocks.scale.setTo(blockScale);

        game.physics.enable(this.blocks, Phaser.Physics.ARCADE);

        radius = this.blocks.width / 2;
        if (wallHeight == 1) {
            this.blocks.body.setCircle(radius,
                (-radius + 0.5 * this.blocks.width / this.blocks.scale.x),
                (-radius + 0.5 * this.blocks.height / this.blocks.scale.y));
        }
        else if(wallHeight == 3){
            this.blocks.body.setCircle(radius-largeHayCircle,
                (-radius + 0.5 * this.blocks.width / this.blocks.scale.x),
                (-radius + 0.5 * this.blocks.height / this.blocks.scale.y));
        }

        //set the x velocity to -160
        this.blocks.body.velocity.x = -150;
        this.blocks.body.bounce.set(1, 1);


        this.addItem();

    },
    addItem:function(){

        if (this.item) {
            this.item.destroy();
        }

        var randomItem = this.items[Math.floor(Math.random()*this.items.length)];


        //add the cloud sprite to the game
        this.item = game.add.sprite(this.blocks.x + game.rnd.integerInRange(130, 200), game.world.height-7, randomItem);

        this.item.scale.setTo(0.7);
        this.item.anchor.x += 0;
        this.item.anchor.y += 1;


        //enable the sprite for physics
        game.physics.enable(this.item, Phaser.Physics.ARCADE);

        //set the x velocity at -200 which is a little faster than the blocks
        this.item.body.velocity.x = -150;

    },
    makeCloud: function() {
        //if the cloud already exists 
        //destory it
        if (this.cloud) {
            this.cloud.destroy();
        }
        //pick a number at the top of the screen
        //between 10 percent and 40 percent of the height of the screen
        var cloudY = game.rnd.integerInRange(10, cloudMaxTop);
        //add the cloud sprite to the game
        this.cloud = game.add.sprite(game.width + game.rnd.integerInRange(100, 150), cloudY, "cloud");

        this.cloud.animations.add('fly');
        this.cloud.animations.play('fly', 5, true);

        //enable the sprite for physics
        game.physics.enable(this.cloud, Phaser.Physics.ARCADE);
        this.cloud.scale.setTo(cloudScale);
        //set the x velocity at -200 which is a little faster than the blocks
        this.cloud.body.velocity.x = -game.rnd.integerInRange(150, 200);
        //set the bounce for the cloud
        this.cloud.body.bounce.set(2, 2);

        var radius = this.cloud.width / 2;

        this.cloud.body.setCircle(cloudCircle,
            (-radius + 0.5 * this.cloud.width  / this.cloud.scale.x),
            (-radius + 0.5 * this.cloud.height / this.cloud.scale.y));

    },
    update: function() {

        this.hero.body.velocity.x = 0;


        if( this.hero.body.velocity.y == 0 && !this.hero.animations.getAnimation('run').isPlaying ){
            this.hero.animations.play('run', 8, true);
        }

        game.physics.arcade.collide(this.hero, this.ground, function(a, b){

        });
        //
        //collide the hero with the blocks
        //
        game.physics.arcade.collide(this.hero, this.blocks, this.delayOver, null, this);
        //
        //collide the blocks with the ground
        //
        //game.physics.arcade.collide(this.ground, this.blocks);
        //
        //when only specifying one group, all children in that
        //group will collide with each other
        //

        //colide the hero with the cloud
        //
        game.physics.arcade.collide(this.hero, this.cloud, this.delayOver, null, this);
        //

        game.physics.arcade.collide(this.hero, this.item, this.collect , null, this);


        this.backgroundMotion();

        //get the first child

        //if off the screen reset the blocks
        if (this.blocks.x < 0-this.blocks.width) {
            this.makeBlocks();
        }
        //if the cloud has flown off screen
        //reset it
        if (this.cloud.x < 0-this.cloud.width) {
            this.makeCloud();
        }

        if (this.item.x < 0-this.item.width) {
            this.addItem();
        }
        if (this.hero.y < 10) {
            this.hero.body.velocity.y=200;
        }
    },
    render:function(){
        //game.debug.body(this.hero);
        //game.debug.body(this.cloud);
        //game.debug.body(this.blocks);
    },
    collect:function(){

        this.item.destroy();

        collectSound.play();

        var index = this.items.indexOf(this.item.key);
        this.items.splice(index, 1);

        if (this.items.length==0){
            game.state.start("StateCompleted");
        }

        score++;

        this.scoreText.setText(score);

    },
    delayOver: function() {
        this.clickLock = true;
        music.stop();

        if(!this.isplaying) {
            this.isplaying = true;
            deathAudio = game.add.audio('death');
            deathAudio.play();
        }
        game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
    },
    gameOver: function() {
        game.state.start("StateOver");
    },
    createBackground:function(){

        game.stage.backgroundColor = "#6fbff8";

        offset = 200;
        this.mountainsBack = game.add.sprite(0, 0, 'mountains-back');
        this.mountainsBack.width = game.width;
        this.mountainsBack.height = game.height;

        this.mountainsMid1 = game.add.tileSprite(0,
            game.height - game.cache.getImage('mountains-mid1').height,
            game.width,
            game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        );

        this.mountainsMid2 = game.add.tileSprite(0,
            game.height - game.cache.getImage('mountains-mid2').height,
            game.width,
            game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        );
    },
    backgroundMotion:function(){
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -= 0.75;
    }
};