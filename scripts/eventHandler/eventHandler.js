$(document).ready(function() {
  setTimeout( function() {
    functions.toggleStartScreen( "show" );
    functions.hiders.createHider();
    functions.hiders.placeHiders();
  }, 500);
});


let elementHit = new ElementHit();
let audio = new Audion();
let plane = new Plane( DEFAULTS.gameWidth, DEFAULTS.gameHeight );
let clouds = [
  new Cloud,
  new Cloud,
  new Cloud,
  new Cloud,
  new Cloud
];
let birds = [];
let stars = [];
let parachutes = [];
let fuel = 10;
let csillagok = 0;
let frame = 0;

let vanParachute = false;

let ido = new Date();
let masodPercek = 1;

/* MAIN THREAD */
MainThread.startFrame( function() {

  frame++;

  if ( frame == 60 && clouds.length < 12 )
  {
    setTimeout( function() {
      clouds = felhoGyar( clouds );
    }, 1000);
    clouds = felhoGyar( clouds );

    birds = madarGyar( birds );

  }

  if ( ( masodPercek % 5 ) == 0 && frame == 30 )
  {
    stars = csillagGyar( stars, plane.horizontalPosition );
  }

  if ( fuel < 4 && vanParachute == false )
  {
    parachutes = uzemanyagGyar( parachutes, plane.horizontalPosition );
    vanParachute = true;
  }

  if ( frame == 60 )
  {
    frame = 0;
  }

  DEFAULTS.sections.planeContainer.innerHTML = "";
  DEFAULTS.sections.cloudContainer.innerHTML = "";
  DEFAULTS.sections.collectibleContainer.innerHTML = "";
  DEFAULTS.sections.birdContainer.innerHTML = "";

  for ( let i = 0; i < clouds.length; i++ )
  {
    if ( clouds[i].horizontalPosition >= DEFAULTS.gameWidth )
    {
      clouds.splice( i, 1 );
    }
  }

  for ( let i = 0; i < birds.length; i++ )
  {
    if ( birds[i].horizontalPosition >= DEFAULTS.gameWith )
    {
      birds.splice( i, 1 );
    }
  }

  for ( let i = 0; i < stars.length; i++ )
  {
    if ( stars[i].DOMElement == false )
    {
      stars.splice( i, 1 );
    }
  }

  for ( let i = 0; i < parachutes.length; i++ )
  {
    if ( parachutes[i].DOMElement == false )
    {
      parachutes.splice( i, 1 );
      vanParachute = false;
    }
  }
});

let started = 20;
let gotCsillag;
let gotFuel;

MainThread.updateFrame( function( delta ) {
  elementHit.checkStarCollected();
  elementHit.checkFuelCollected();
  elementHit.checkBirdHit();

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

  birds.forEach( function( element ) {
    element.move( delta );
  });

  stars.forEach( function( element ) {
    element.move( delta );
  });

  parachutes.forEach( function( element ) {
    element.move( delta );
  });
});

MainThread.renderFrame( function() {
  document.getElementById( "ido" ).innerHTML = masodPercek+" mp";
  document.getElementById( "uzemanyag" ).innerHTML = fuel+" / 20 L";
  document.getElementById( "csillag" ).innerHTML = csillagok+" stars";

  clouds.forEach( function( element ) {
    DEFAULTS.sections.cloudContainer.appendChild( element.DOMElement );
  });
  birds.forEach( function( element ) {
    if ( element.DOMElement !== false )
    {
      DEFAULTS.sections.birdContainer.appendChild( element.DOMElement );
    }
  });
  DEFAULTS.sections.planeContainer.appendChild( plane.generatePlane() );
  stars.forEach( function( element ) {
    if ( element.DOMElement !== false )
    {
      DEFAULTS.sections.collectibleContainer.appendChild( element.DOMElement );
    }
  });
  parachutes.forEach( function( element ) {
    if ( element.DOMElement !== false )
    {
      DEFAULTS.sections.collectibleContainer.appendChild( element.DOMElement );
    }
  });
  /*parachutes.forEach( function( element ) {
    DEFAULTS.sections.collectibleContainer.appendChild( element.DOMElement );
  });*/

  if ( started === false )
  {
    if ( new Date - ido >= 1000 )
    {
      masodPercek++;
      ido = new Date();

      fuel--;
    }

    if ( fuel <= 0 )
    {
      gameOver();
    }
  }
});
/* MAIN THREAD */

/* EVENT LISTENERS */
document.getElementById( "startBtn" ).addEventListener( "click", function() {
  setTimeout( function() {
    startGame();
  }, 500);
  functions.toggleStartScreen( "hide" );
});

document.getElementById( "stop" ).addEventListener( "click", function() {
  pause( MainThread.getState() );
});

let fS = 15;

function toggleFontSize()
{
  if ( fS == 15 )
  {
    fS = 12;
    return 12;
  }
  else
  {
    fS = 15;
    return 15;
  }
}

document.getElementById( "betuSize" ).addEventListener( "click", function() {
  document.getElementById( "ido" ).style.fontSize = toggleFontSize()+"px";
  document.getElementById( "uzemanyag" ).style.fontSize = toggleFontSize()+"px";
  document.getElementById( "csillag" ).style.fontSize = toggleFontSize()+"px";
});

document.getElementById( "restartBtn" ).addEventListener( "click", function() {
  setTimeout( function() {
     plane = new Plane( DEFAULTS.gameWidth, DEFAULTS.gameHeight );
     clouds = [
      new Cloud,
      new Cloud,
      new Cloud,
      new Cloud,
      new Cloud
    ];
     birds = [];
     stars = [];
     gotCsillag;
     gotFuel;
     parachutes = [];
     fuel = 10;
     csillagok = 0;
     frame = 0;

     vanParachute = false;

     ido = new Date();
     masodPercek = 1;
     started = 20;
    audio.finishMusic( "pause" );
    startGame();
  }, 500);
  audio.backgroundMusic( "stop" );
  functions.toggleEndScreen( "hide" );
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
