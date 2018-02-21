const DEFAULTS = {
  gameWidth: 1024,
  gameHeight: 768,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  sections: {
    body: document.getElementById( "body" ),
    main: document.getElementById( "main" ),
    startScreen: document.getElementById( "startScreen" ),
    planeContainer: document.getElementById( "planeContainer" ),
    cloudContainer: document.getElementById( "cloudContainer" ),
    birdContainer: document.getElementById( "birdContainer" ),
    additionalContainer: document.getElementById( "additionalContainer" ),
    hiderContainer: document.getElementById( "hiderContainer" )
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

function startGame()
{
  audio.backgroundMusic( "play" );
  MainThread.start();
  DEFAULTS.sections.planeContainer.appendChild( plane.generatePlane() );
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
    if ( ( e.keyCode ? e.keyCode : e.which ) == 32 ) pause( MainThread.getState() );
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
