class Bird
{
  constructor()
  {
    let cloudsArray = this.getClouds;
    let cloud = cloudsArray[ Math.floor( Math.random() * cloudsArray.length ) ];

    this.image = cloud.image;
    this.speed = this.randomSpeed();

    let size = this.randomSize( [ cloud.width, cloud.height ] );
    this.width = size.width;
    this.height = size.height;

    this.zindex = 5;

    this.verticalPosition = this.randomVertical( size.height );
    this.horizontalPosition = this.width * -1;

    this.DOMElement = this.createCloud();
  }

  move( delta )
  {
    if ( ( this.horizontalPosition + ( ( this.speed / 10 ) * delta ) ) >= ( DEFAULTS.gameWidth + this.width ) )
    {
      this.DOMElement = false;
      return this;
    }
    else
    {
      this.horizontalPosition = this.horizontalPosition + ( delta * ( this.speed / 10) );
      this.DOMElement = this.createCloud();
      return this;
    }
  }

  randomZIndex()
  {
    return Math.floor( Math.random() * 4 )+1;
  }

  randomSpeed()
  {
    return Math.floor( Math.random() * 4 )+2;
  }

  randomSize( size )
  {
    let randomInt = ( Math.random() * 1 ) + 0.7;
    let random;
    if ( randomInt >= 1 )
    {
      random = 1;
    }
    else
    {
      random = randomInt;
    }

    return {
      width: Math.floor( ( size[0] * random ) ),
      height: Math.floor( ( size[1] * random ) )
    }
  }

  randomVertical( cloudHeight )
  {
    let windowHeight = 768;

    return Math.floor( Math.random() * ( 768 - cloudHeight ) );
  }

  get position()
  {
    return "fixed";
  }

  get getClouds()
  {
    return [
      {
        image: 'bird-1',
        width: 59,//356
        height: 34,//209
      }
    ];
  }

  createCloud()
  {
    let cloudElement = document.createElement( "img" );

    cloudElement.src = document.location.toString().replace("index.html", "").toString().replace("index.html", "") + `/assets/img/birds/png/${this.image}.png`;

    cloudElement.style.width = this.width+"px";
    cloudElement.style.height = this.height+"px";

    cloudElement.style.position = this.position;
    cloudElement.style.top = this.verticalPosition+"px";
    cloudElement.style.right = this.horizontalPosition+"px";

    cloudElement.style.zIndex = this.zindex;

    cloudElement.classList.add( "cloud" );

    return cloudElement;
  }

}
