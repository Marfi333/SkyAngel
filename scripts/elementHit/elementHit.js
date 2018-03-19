class ElementHit
{
  constructor()
  {

  }

  checkStarCollected()
  {
    let planeRight = plane.horizontalPosition;
    let planeLeft = plane.horizontalPosition + plane.width;

    let planeTop = plane.verticalPosition;
    let planeBottom = plane.verticalPosition + plane.height;

    var BreakErr = {};

    try
    {
      stars.forEach( function( element ) {
        let starRight = element.collectibleHorizontalPosition;
        let starLeft = element.collectibleHorizontalPosition + element.width;

        let starTop = element.collectibleVerticalPosition;
        let starBottom = element.collectibleVerticalPosition + element.height;

        if (
          planeRight < starRight + element.width &&
          planeRight + plane.width > starRight &&
          planeTop < starTop + element.height &&
          planeTop + plane.height > starTop &&
          element !== gotCsillag
         )
         {
          gotCsillag = element;
          BreakErr.obj = element;
          throw BreakErr;
         }
      });
    }
    catch( e )
    {
      for ( let i = 0; i < stars.length; i++ )
      {
        if ( stars[i] == e.obj )
        {
          setTimeout( function() {
            stars.splice( i, 1 );
            audio.star();
            csillagok+= 1;
            return true;
          }, 200);
        }
      }
    }

    return false;
  }

  checkFuelCollected()
  {
    let planeRight = plane.horizontalPosition;
    let planeLeft = plane.horizontalPosition + plane.width;

    let planeTop = plane.verticalPosition;
    let planeBottom = plane.verticalPosition + plane.height;

    var BreakErrUzem = {};

    try
    {
      parachutes.forEach( function( element ) {
        let starRight = element.collectibleHorizontalPosition;
        let starLeft = element.collectibleHorizontalPosition + element.width;

        let starTop = element.collectibleVerticalPosition;
        let starBottom = element.collectibleVerticalPosition + element.height;

        if (
          planeRight < starRight + element.width &&
          planeRight + plane.width > starRight &&
          planeTop < starTop + element.height &&
          planeTop + plane.height > starTop &&
          element !== gotFuel
         )
         {
          gotFuel = element;
          BreakErrUzem.obj = element;
          throw BreakErrUzem;
         }
      });
    }
    catch( e )
    {
      for ( let i = 0; i < parachutes.length; i++ )
      {
        if ( parachutes[i] == e.obj )
        {
          setTimeout( function() {
            parachutes.splice( i, 1 );
            audio.star();
            if ( fuel + 10 <= 20 )
            {
              fuel+= 10;
            }
            else
            {
              fuel = 20;
            }
            vanParachute = false;
            return true;
          }, 200);
        }
      }
    }

    return false;
  }

  checkBirdHit()
  {
    let planeRight = plane.horizontalPosition+10;
    let planeLeft = plane.horizontalPosition + plane.width-10;

    let planeTop = plane.verticalPosition+10;
    let planeBottom = plane.verticalPosition + plane.height-10;

    var BreakErrUzem = {};

    try
    {
      birds.forEach( function( element ) {
        let starRight = element.horizontalPosition;

        let starTop = element.verticalPosition;

        if (
          planeRight < starRight + element.width &&
          planeRight + plane.width > starRight &&
          planeTop < starTop + element.height &&
          planeTop + plane.height > starTop &&
          element !== gotFuel
         )
         {
          gotFuel = element;
          BreakErrUzem.obj = element;
          throw BreakErrUzem;
         }
      });
    }
    catch( e )
    {
      for ( let i = 0; i < birds.length; i++ )
      {
        if ( birds[i] == e.obj )
        {
          setTimeout( function() {
            birds.splice( 0, -1 );
            audio.hit();
            gameOver();
            return true;
          }, 200);
        }
      }
    }

    return false;
  }
}
