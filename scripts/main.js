const DEFAULTS = {
  gameWidth: 1024,
  gameHeight: 768,
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
    backBtn: document.getElementById( "backBtn" ),
    instructionsImg: document.getElementById( "instructionsImg" )
  },
  maxOnscreenClouds: 8
}

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
      console.log("end");
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
        instructionsBtn.style.display = "none";
        backBtn.style.display = "block";
        backBtn.style.top = "-220px";
        instructionsImg.style.display = "block";

        startBtn.style.opacity = "1";
        instructionsBtn.style.opacity = "1";
        backBtn.style.opacity = "1";
        instructionsImg.style.opacity = "1";
      }, 200);
      startBtn.style.opacity = "0";
      instructionsBtn.style.opacity = "0";
      backBtn.style.opacity = "0";
      instructionsImg.style.opacity = "0";
    }
    else if ( movement == false )
    {
      setTimeout( function() {
        startBtn.style.display = "block";
        instructionsBtn.style.display = "block";
        backBtn.style.display = "none";
        instructionsImg.style.display = "none";

        startBtn.style.opacity = "1";
        instructionsBtn.style.opacity = "1";
        backBtn.style.opacity = "1";
        instructionsImg.style.opacity = "1";
      }, 200);
      startBtn.style.opacity = "0";
      instructionsBtn.style.opacity = "0";
      backBtn.style.opacity = "0";
      instructionsImg.style.opacity = "0";
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

  if ( functions.keys.isDown( functions.keys.UP ) ) plane.move( delta, "up", true );
  if ( functions.keys.isDown( functions.keys.LEFT ) ) plane.move( delta, "left", true );
  if ( functions.keys.isDown( functions.keys.DOWN ) ) plane.move( delta, "down", true );
  if ( functions.keys.isDown( functions.keys.RIGHT ) ) plane.move( delta, "right", true );
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

  console.log("Game Over");
}
