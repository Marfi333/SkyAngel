class Collectible
{
  constructor( type, planePosition )
  {
    this.planePosition = planePosition;

    this.stars = [
      {
        image: 'stars/png/star-1',
        width: 39, //269
        height: 36 //256
      },
      {
        image: 'stars/png/star-5',
        width: 39,
        height: 36
      },
      {
        image: 'stars/png/star-7',
        width: 39,
        height: 36
      }
    ];

    this.parachutes = [
      {
        image: 'parachutes/png/parachute-3',
        width: 86, //603
        height: 72 //507
      }
    ];

    this.speeds = {
      star: 0.2,
      parachute: 0.2
    };

    this.zindex = 4;

    this.DOMElement;

    if ( type === "star" )
    {
      this.createStar();
    }
    else if ( type === "parachute" )
    {
      this.createParachute();
    }
  }

  createStar()
  {
    this.collectibleType = 'star';
    let star = this.stars[ Math.floor( Math.random() * this.stars.length ) ];
    this.collectibleImage = star.image;
    this.collectibleHorizontalPosition = this.randomHorizontal( star.width );
    this.collectibleVerticalPosition = ( 0 - star.height );
    this.width = star.width;
    this.height = star.height;

    this.createCollectible();
  }

  createParachute()
  {
    this.collectibleType = 'parachute';
    let parachute = this.parachutes[ Math.floor( Math.random() * this.parachutes.length ) ];
    this.collectibleImage = parachute.image;
    this.collectibleHorizontalPosition = this.randomHorizontal( parachute.width );
    this.collectibleVerticalPosition = ( 0 - parachute.height );
    this.width = parachute.width;
    this.height = parachute.height;

    this.createCollectible();
  }

  randomHorizontal( width )
  {
    return ( Math.floor( Math.random() * ( this.planePosition.width + width) ) + width );
  }

  move( delta )
  {
    if ( ( this.collectibleVerticalPosition + ( delta * this.speeds.parachute ) ) >= DEFAULTS.gameHeight )
    {
      this.DOMElement = false;
      return this;
    }
    else
    {
      this.collectibleVerticalPosition += ( delta * this.speeds.parachute );
      this.createCollectible();
      return this;
    }
  }

  createCollectible()
  {
    let collectible = document.createElement( "img" );
    collectible.src = document.location.toString().replace("index.html", "") + "assets/img/" + this.collectibleImage + ".png";

    collectible.style.width = this.width+"px";
    collectible.style.height = this.height+"px";

    collectible.style.position = "fixed";
    collectible.style.top = this.collectibleVerticalPosition+"px";
    collectible.style.right = this.collectibleHorizontalPosition+"px";

    collectible.style.zIndex = this.zindex;

    collectible.classList.add( this.collectibleType );

    this.DOMElement = collectible;
  }
}
