var game;

var isMobile=navigator.userAgent.indexOf("Mobile");

var blockScale = 0.4;
var cloudMaxTop = 90;
var cloudScale = 0.4;
var titleScale = 0.51;
var alpacaScale = 0.51;
var alpacaHeight = 100;
var alpacaWidth = 80;
var logoScale = 0.51;
var suitcaseScale = 0.51;
var btnScale = 0.51;
var titleStartY = 123;
var titleStartx = 10;
var logoStartY = 130;
var instructionsOffset = -0.2;
var instuctionsY = 10;
var cloudCircle = 38;
var largeHayCircle = 0;
var finalTextOffsetX = 0;
var finalTextOffsetY = 100;
var playAgainOffset = 70;
var letterSpacing = -5;
var playBtnOffset = 2;
var shareBtnStartX = 100;
var shareBtnScale = 1;
var shareBtnStartPadding = 90;
var instructionFontSize = "16px";
var overTextOffsetX = 10;

if (isMobile==-1){
    //desktop
}
else{
    //Mobile resize
    blockScale = 0.25;
    cloudMaxTop = 20;
    cloudScale = 0.29;
    titleScale=0.35;
    alpacaScale = 0.31;
    logoScale = 0.31;
    suitcaseScale = 0.25;
    btnScale = 0.31;
    titleStartx = 0;
    titleStartY = 60;
    logoStartY = 60;
    instuctionsY = -20;
    instructionsOffset = 0;
    cloudCircle = 25;
    finalTextOffsetX = 55;
    finalTextOffsetY = 60;
    largeHayCircle = 10;
    playAgainOffset = 50;
    alpacaHeight = 80;
    alpacaWidth = 64;
    letterSpacing = -5;
    playBtnOffset = 10;
    shareBtnStartX = 70;
    shareBtnScale= 0.7;
    shareBtnStartPadding = 60;
    instructionFontSize = "18px";
    overTextOffsetX = 50;

}



function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}



function init(){

    var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var maxWidth = 980;
    var maxHeight = maxWidth/1.7777;

    if (isMobile==-1)
    {
        game=new Phaser.Game(Math.min(w, maxWidth),Math.min(h,maxHeight),Phaser.AUTO,"ph_game");
        document.querySelector('body').style.paddingTop = "30px";
        game.state.add("Preloader",Preloader);
        game.state.add("StateBegin",StateBegin);
        game.state.add("StateOver",StateOver);
        game.state.add("StateCompleted",StateCompleted);
        game.state.add("StateMain",StateMain);
        game.state.start("Preloader");
    }
    else
    {
        var originalBodyStyle = getComputedStyle(document.body).getPropertyValue('display');
        document.body.style.display='none';
        setTimeout(function () {
            document.body.style.display = originalBodyStyle;
            w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
            h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


            //percentage = 10/h * 100;

            if (isFacebookApp()){
                h = h - 50;
            }

            //str = "<p>Client: "+ document.documentElement.clientWidth + " - " + document.documentElement.clientHeight+"</p>";
            //str = str + "<p>window: "+ window.innerWidth + " - " + window.innerHeight +"</p>";
            //str = str + "<p>screen: "+ screen.width + " - " + screen.height +"</p>";
            //document.getElementById('debug').innerHTML = str;

            if(screen.width>w) {
                w = screen.width;
                h = screen.height - 80;
            }

            game=new Phaser.Game(w, h,Phaser.AUTO,"ph_game");
            game.state.add("Preloader",Preloader);
            game.state.add("StateBegin",StateBegin);
            game.state.add("StateOver",StateOver);
            game.state.add("StateCompleted",StateCompleted);
            game.state.add("StateMain",StateMain);
            game.state.start("Preloader");

        }, 100);





        console.log("Mobile");
    }


}

var flipped = false;

function doOnOrientationChange()
{
    //switch statement to select a behaviour based on the screens orientation
    switch (window.orientation) {
        case 0:
        case 180:
            //Portrait mode: show the illustration
            if (!flipped) {
                document.getElementById("flip").style.display = "block";
            }
            break;
        case 90:
        case -90:
            //Lanscape mode: hide the illustration
            document.getElementById("flip").style.display = "none";
            //prevent re init should user flip multiple times
            if (!flipped) {
                init();
                flipped = true;
            }
            break;
        case undefined:

            if(navigator.userAgent.indexOf("Chrome") == -1) {
                init();
            }


    }
}

window.onload = function()
{




    if (isMobile!=-1) {

        //mobile
        var el = document.createElement("p");
        el.innerHTML = "test";
        var div = document.getElementById("ph_game");
        insertAfter(div, el);
        //initially check orientation
        doOnOrientationChange();
        //detect orientation change
        window.addEventListener('orientationchange', doOnOrientationChange);
    }
    else{
        init();
    }
    //init();





};