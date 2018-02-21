class KeyHook
{
  constructor()
  {

  }

  hoverEnter( callback )
  {
    let kulcsKey = 13;
    let lenyomva = 0;

    window.onkeydown = function ( e )
    {
      let key = e.keyCode ? e.keyCode : e.which;

      if ( key == kulcsKey )
      {
        let hover = true;

        while ( hover == true )
        {
          lenyomva++;
          window.onkeyup = function ( e2 )
          {
            let key2 = e2.keyCode ? e2.keyCode : e2.which;

            if ( key2 == kulcsKey )
            {
              hover = false;
            }
          }
        }
      }
    }

    console.log(lenyomva);
  }

  pressedEnter( callback )
  {
    window.onkeyup = function( e )
    {
        var key = e.keyCode ? e.keyCode : e.which;

        if ( key == 13 )
        {
            callback();
        }
    }
    return false;
  }

  pressedSpaceBar( callback )
  {
    window.onkeyup = function( e )
    {
        var key = e.keyCode ? e.keyCode : e.which;

        if ( key == 32 )
        {
            callback();
        }
    }
    return false;
  }

}
