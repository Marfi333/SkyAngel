$(document).ready(function() {
  setTimeout( function() {
    functions.toggleStartScreen( "show" );
    functions.hiders.createHider();
    functions.hiders.placeHiders();
  }, 500);
});



let audio = new Audion();
let plane = new Plane( DEFAULTS.gameWidth, DEFAULTS.gameHeight );
let clouds = [
  new Cloud
];
let birds = [];
let frame = 0;

/* MAIN THREAD */
MainThread.startFrame( function() {

  frame++;

  if ( frame == 60 && clouds.length < 12 )
  {
    setTimeout( function() {
      clouds = felhoGyar( clouds );
    }, 1000);
    clouds = felhoGyar( clouds );
  }

  if ( frame == 60 )
  {
    frame = 0;
  }

  DEFAULTS.sections.planeContainer.innerHTML = "";
  DEFAULTS.sections.cloudContainer.innerHTML = "";
  for ( let i = 0; i < clouds.length; i++ )
  {
    if ( clouds[i].horizontalPosition >= DEFAULTS.gameWidth )
    {
      clouds.splice( i, 1 );
    }
  }
});

let started = 20;

MainThread.updateFrame( function( delta ) {
  if ( started === 20 )
  {
    if ( plane.horizontalPosition <= (1024-325) ) started = false;
    plane.move(started, "right");
  }

  if ( started === false )
  {
    userPlaneControls( delta );
  }

  clouds.forEach( function( element ) {
    element.move( delta );
  });
});

MainThread.renderFrame( function() {
  clouds.forEach( function( element ) {
    DEFAULTS.sections.cloudContainer.appendChild( element.DOMElement );
  });
  DEFAULTS.sections.planeContainer.appendChild( plane.generatePlane() );
});
/* MAIN THREAD */

/* EVENT LISTENERS */
document.getElementById( "startBtn" ).addEventListener( "click", function() {
  setTimeout( function() {
    startGame();
  }, 500);
  functions.toggleStartScreen( "hide" );
});

window.addEventListener( "resize", function() {  /* HIDER */
  functions.hiders.toggleOverflow( window.innerWidth < DEFAULTS.gameWidth )
  functions.hiders.resizeHider().placeHiders();
}); /* HIDER */

for ( let i = 0; i < document.getElementsByTagName( "button" ).length; i++ ) /* BUTTON SOUND */
{
  document.getElementsByTagName( "button" )[i].addEventListener( "click", function() {
    audio.buttonPress();
  });
} /* BUTTON SOUND */

var state = false; /* INSTRUCTIONS */
document.getElementById( "instructionsBtn" ).addEventListener( "click", function( event ) {
  functions.moveLogo( !state );
  functions.toggleButtons( !state )

  state = !state;

  document.getElementById( "instructionsBtn" ).removeEventListener( "click", document.getElementById( "instructionsBtn" ) );
}); /* INSTRUCTIONS */

document.getElementById( "backBtn" ).addEventListener( "click", function( event ) { /* BACK */
  functions.moveLogo( !state );
  functions.toggleButtons( !state );

  state = !state;

  document.getElementById( "backBtn" ).removeEventListener( "click", document.getElementById( "backBtn" ) );
}); /* BACK */
