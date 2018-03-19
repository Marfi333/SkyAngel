const DEFAULTS = {
  gameWidth: window.innerWidth,
  gameHeight: window.innerHeight,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  fuelMeter: null,
  endStarCounter: document.getElementById( "endStarCounter" ),
  endTimeCounter: document.getElementById( "endTimeCounter" ),
  sections: {
    body: document.getElementById( "body" ),
    main: document.getElementById( "main" ),
    startScreen: document.getElementById( "startScreen" ),
    endScreen: document.getElementById( "endScreen" ),
    planeContainer: document.getElementById( "planeContainer" ),
    cloudContainer: document.getElementById( "cloudContainer" ),
    birdContainer: document.getElementById( "birdContainer" ),
    collectibleContainer: document.getElementById( "collectibleContainer" ),
    hiderContainer: document.getElementById( "hiderContainer" ),
    interface: document.getElementById( "interfaceSection" )
  },
  buttons: {
    startBtn: document.getElementById( "startBtn" ),
    instructionsBtn: document.getElementById( "instructionsBtn" ),
    constrolsBtn: document.getElementById( "controlsBtn" ),
    backBtn: document.getElementById( "backBtn" ),
    secondaryButtons: document.getElementById("secondaryButtons")
  },
  instructionsImg: document.getElementById( "instructionsImg" ),
  maxOnscreenClouds: 15,
  background: {
    firstColor: "#3B86F7",
    secondColor: "#9DC3FB"
  },
  backgrounds: [
    "linear-gradient(to bottom, rgba(59, 134, 247,1) 0%, rgba(157, 195, 251,1) 100%)",
    "linear-gradient(to bottom, rgba(52,130,247,1) 0%, rgba(133, 180, 250,1) 100%)",
    "linear-gradient(to bottom, rgba(7, 73, 171,1) 0%, rgba(108, 164, 249,1) 100%)",
    "linear-gradient(to bottom, rgba(7,73,171,1) 0%, rgba(59,134,247,1) 100%)",
    "linear-gradient(to bottom, rgba(5,52,122,1) 0%, rgba(52,130,247,1) 100%)",
    "linear-gradient(to bottom, rgba(4,42,98,1) 0%, rgba(9,94,220,1) 100%)"
  ]
}
/*
$(document).ready(function() {

  let bgColors = DEFAULTS.background;
  let backgrounds = { length: 4 };
  let bgCount = 0.1;
  let rendez = "asc";

  setInterval( () => {
    if ( bgCount >= backgrounds.length )
    {
      rendez = "desc";
      napszak = true;
    }
    else if ( bgCount <= 0.1 )
    {
      rendez = "asc";
      napszak = true;
    }

    if ( rendez == "asc" )
    {
      bgColors.firstColor = chroma(bgColors.firstColor).darken(0.1);
      bgColors.secondColor = chroma(bgColors.secondColor).darken(0.1);
      bgCount+= 0.1;
    }
    else if ( rendez == "desc" )
    {
      bgColors.firstColor = chroma(bgColors.firstColor).brighten(0.1);
      bgColors.secondColor = chroma(bgColors.secondColor).brighten(0.1);
      bgCount-= 0.1;
    }

    main.style.background = `linear-gradient(to bottom, ${bgColors.firstColor} 0%, ${bgColors.secondColor} 100%)`;
  }, 100);

});
*/

const functions = {
  toggleStartScreen: function( method ) {
    if ( method == "hide" )
    {
      setTimeout( function() {
        DEFAULTS.sections.startScreen.style.display = "none";
      }, 200);
      DEFAULTS.sections.startScreen.style.opacity = 0;
    }
    else if ( method == "show" )
    {
      setTimeout( function() {
        DEFAULTS.sections.startScreen.style.opacity = 1;
      }, 200);
      DEFAULTS.sections.startScreen.style.display = "block";
    }
  },
  toggleEndScreen: function( method ) {
    if ( method == "hide" )
    {
      setTimeout( function() {
        DEFAULTS.sections.endScreen.style.display = "none";
      }, 200);
      DEFAULTS.sections.endScreen.style.opacity = 0;
    }
    else if ( method == "show" )
    {
      setTimeout( function() {
        DEFAULTS.sections.endScreen.style.opacity = 1;
      }, 200);
      DEFAULTS.sections.endScreen.style.display = "block";
    }
  },
  toggleFinishScreen: function( method ) {
    if ( method == "hide" )
    {

    }
    else if ( method == "show" )
    {
    }
  },
  toggleButtons: function( movement ) {
    let startBtn = document.getElementById( "startBtn" );
    let instructionsBtn = document.getElementById( "instructionsBtn" );
    let backBtn = document.getElementById( "backBtn" );
    let instructionsImg = document.getElementById( "instructionsImg" );

    if ( movement == true )
    {
      setTimeout( function() {
        startBtn.style.display = "none";
        // instructionsBtn.style.display = "none";
        DEFAULTS.buttons.secondaryButtons.style.display = "none";
        backBtn.style.display = "block";
        backBtn.style.top = "-220px";
        DEFAULTS.instructionsImg.style.display = "block";

        startBtn.style.opacity = "1";
        // instructionsBtn.style.opacity = "1";
        backBtn.style.opacity = "1";
        DEFAULTS.instructionsImg.style.opacity = "1";
        DEFAULTS.buttons.secondaryButtons.style.opacity = "1";
      }, 200);
      startBtn.style.opacity = "0";
      // instructionsBtn.style.opacity = "0";
      backBtn.style.opacity = "0";
      DEFAULTS.instructionsImg.style.opacity = "0";
      DEFAULTS.buttons.secondaryButtons.style.opacity = "0";
    }
    else if ( movement == false )
    {
      setTimeout( function() {
        startBtn.style.display = "block";
        // instructionsBtn.style.display = "block";
        DEFAULTS.buttons.secondaryButtons.style.display = "grid";
        backBtn.style.display = "none";
        DEFAULTS.instructionsImg.style.display = "none";

        startBtn.style.opacity = "1";
        // instructionsBtn.style.opacity = "1";
        DEFAULTS.buttons.secondaryButtons.style.opacity = "1";
        backBtn.style.opacity = "1";
        DEFAULTS.instructionsImg.style.opacity = "1";
      }, 200);
      startBtn.style.opacity = "0";
      // instructionsBtn.style.opacity = "0";
      DEFAULTS.buttons.secondaryButtons.style.opacity = "0";
      backBtn.style.opacity = "0";
      DEFAULTS.instructionsImg.style.opacity = "0";
    }
  },
  hiders: new Hider({
    wW:DEFAULTS.windowWidth,
    wH:DEFAULTS.windowHeight,
    gW:DEFAULTS.gameWidth,
    gH:DEFAULTS.gameHeight
  }),
  moveLogo: function( movement )
  {
    let element = document.getElementById( "logo" );

    if ( movement == true )
    {
      setTimeout( function() {
        element.style.position = "absolute";
        element.style.top = "-315px";
        element.style.opacity = "1";
      }, 200);
      element.style.opacity = "0";
    }
    else if ( movement == false )
    {
      setTimeout( function() {
        element.style.position = "relative";
        element.style.top = "0px";
        element.style.opacity = "1";
      }, 200);
      element.style.opacity = "0";
    }
  },
  keys: {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PAUSE: 32,

    W: 87,
    A: 65,
    S: 83,
    D: 68,

    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },

    onKeydown: function(event) {
      this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
      delete this._pressed[event.keyCode];
    }
  }
}

function felhoGyar( arr )
{
  setTimeout( function() {
    arr.push( new Cloud );
  });

  return arr;
}

function madarGyar( arr )
{
  setTimeout( function() {
    arr.push( new Bird );
  });

  return arr;
}

function csillagGyar( arr, pW )
{
  arr.push( new Collectible( "star", { width: pW } ) );

  return arr;
}

function uzemanyagGyar( arr, pW )
{
  arr.push( new Collectible( "parachute", { width: pW } ) );

  return arr;
}

function startGame()
{
  audio.backgroundMusic( "play" );
  MainThread.start();
  DEFAULTS.sections.planeContainer.appendChild( plane.generatePlane() );
  functions.toggleEndScreen( "hide" );
  DEFAULTS.sections.interface.style.display = "block";
}

function runAllGauges()
{
  var gauges = $('.gauge-cont');
  $.each(gauges, function(i, v){
    var self = this;
		setTimeout(function(){
        setGauge(self);
    },i * 700);
  });
}

function setGauge(gauge, perc)
{
  var percentage = perc / 100;

  var degrees = 180 * percentage;
  var pointerDegrees = degrees - 90;
  var spinner = $(gauge).find('.spinner');
  var pointer = $(gauge).find('.pointer');
  $(spinner).attr({
    style: 'transform: rotate(' + degrees + 'deg)'
  });

  $(pointer).attr({
    style: 'transform: rotate(' + pointerDegrees + 'deg)'
  });
}

function pause( p )
{
  if ( !p )
  {
    MainThread.start();
    audio.backgroundMusic( "play" );
  }
  else
  {
    MainThread.stop();
    audio.backgroundMusic( "pause" );
  }
}

function userPlaneControls( delta )
{
  window.onkeydown = function( e )
  {
    if ( ( e.keyCode ? e.keyCode : e.which ) == 32 )
    {
      pause( MainThread.getState() );
      audio.buttonPress();
    }
  }

  window.addEventListener( 'keyup', function( event ) {
    functions.keys.onKeyup( event );
  }, false);

  window.addEventListener('keydown', function( event ) {
    functions.keys.onKeydown( event );
  }, false);

  if ( functions.keys.isDown( functions.keys.UP ) || functions.keys.isDown( functions.keys.W ) ) plane.move( delta, "up", true );
  if ( functions.keys.isDown( functions.keys.LEFT ) || functions.keys.isDown( functions.keys.A ) ) plane.move( delta, "left", true );
  if ( functions.keys.isDown( functions.keys.DOWN ) || functions.keys.isDown( functions.keys.S ) ) plane.move( delta, "down", true );
  if ( functions.keys.isDown( functions.keys.RIGHT ) || functions.keys.isDown( functions.keys.D ) ) plane.move( delta, "right", true );
}

function gameOver()
{
  MainThread.stop();
  DEFAULTS.sections.cloudContainer.innerHTML = "";
  DEFAULTS.sections.planeContainer.innerHTML = "";
  DEFAULTS.sections.birdContainer.innerHTML = "";
  DEFAULTS.sections.collectibleContainer.innerHTML = "";

  audio.backgroundMusic( "pause" );
  audio.finishMusic( "play" );

  functions.toggleEndScreen( "show" );

  DEFAULTS.endStarCounter.innerHTML = csillagok;
  DEFAULTS.endTimeCounter.innerHTML = masodPercek;

  DEFAULTS.sections.interface.style.display = "none";
}
