class Hider
{
  constructor( { wW, wH, gW, gH } )
  {
    this.verticalHider = ( wW - gW ) / 2;
    this.horizontalHider = ( wH - gH ) / 2;

    let elements = this.createHider();

    this.sections = [
      elements.top( this.horizontalHider ),
      elements.bottom( this.horizontalHider ),
      elements.left( this.verticalHider ),
      elements.right( this.verticalHider )
    ];
  }

  createHider()
  {
    return {
      top: function(h)
      {
        let element = document.createElement( "div" );
          element.id = "topHiderElement";
          element.style.width = "100%";
          if ( h < 0 )
          {
            element.style.display = "none";
          }
          else
          {
            element.style.display = "block";
            element.style.height = `${h}px`;
          }
          element.style.position = "fixed";
          element.style.top = "0";
          element.style.left = "0";
          element.style.background = "#1e1f1f";
          element.style.zIndex = "9999";

        return element;
      },
      bottom: function(h)
      {
        let element = document.createElement( "div" );
          element.id = "bottomHiderElement";
          element.style.width = "100%";
          if ( h < 0 )
          {
            element.style.display = "none";
          }
          else
          {
            element.style.display = "block";
            element.style.height = `${h}px`;
          }
          element.style.position = "fixed";
          element.style.bottom = "0";
          element.style.left = "0";
          element.style.background = "#1e1f1f";
          element.style.zIndex = "9999";

        return element;
      },
      left: function(v)
      {
        let element = document.createElement( "div" );
          element.id = "leftHiderElement";
          element.style.height = "100%";
          if ( v < 0 )
          {
            element.style.display = "none";
          }
          else
          {
            element.style.display = "block";
            element.style.width = `${v}px`;
          }
          element.style.position = "fixed";
          element.style.top = "0";
          element.style.left = "0";
          element.style.background = "#1e1f1f";
          element.style.zIndex = "9999";

        return element;
      },
      right: function(v)
      {
        let element = document.createElement( "div" );
          element.id = "rightHiderElement";
          element.style.height = "100%";
          if ( v < 0 )
          {
            element.style.display = "none";
          }
          else
          {
            element.style.display = "block";
            element.style.width = `${v}px`;
          }
          element.style.position = "fixed";
          element.style.right = "0";
          element.style.top = "0";
          element.style.background = "#1e1f1f";
          element.style.zIndex = "9999";

        return element;
      }
    };
  }

  resizeHider()
  {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    this.verticalHider = ( windowWidth - DEFAULTS.gameWidth ) / 2;
    this.horizontalHider = ( windowHeight - DEFAULTS.gameHeight ) / 2;

    let elements = this.createHider();

    this.sections = [
      elements.top( this.horizontalHider ),
      elements.bottom( this.horizontalHider ),
      elements.left( this.verticalHider ),
      elements.right( this.verticalHider )
    ];

    return this;
  }

  toggleOverflow( state )
  {
    if ( state == true )
    {
      DEFAULTS.sections.body.style.overflow = "auto";
    }
    else
    {
      DEFAULTS.sections.body.style.verflow = "none";
    }
  }

  placeHiders()
  {
    DEFAULTS.sections.hiderContainer.innerHTML = "";

    this.sections.forEach( function( element ) {
      DEFAULTS.sections.hiderContainer.appendChild( element );
    });
  }

}
