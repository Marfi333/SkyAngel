class Cloud
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

    this.zindex = this.randomZIndex();

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
    let sebessegTomb = [ 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3 ];
    return sebessegTomb[ Math.floor( Math.random() * sebessegTomb.length ) ];
  }

  randomSize( size )
  {
    let randomInt = ( Math.random() * 1 ) + 0.4;
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
        image: 'cloud-1',
        width: 213,
        height: 116,
      },
      {
        image: 'cloud-2',
        width: 213,
        height: 115
      },
      {
        image: 'cloud-3',
        width: 228,
        height: 121
      },
      {
        image: 'cloud-4',
        width: 213,
        height: 115
      },
      {
        image: 'cloud-5',
        width: 213,
        height: 116
      },
      {
        image: 'cloud-6',
        width: 233,
        height: 126
      },
      {
        image: 'cloud-7',
        width: 203,
        height: 102
      },
      {
        image: 'cloud-8',
        width: 213,
        height: 124
      },
      {
        image: 'cloud-9',
        width: 222,
        height: 117
      },
      {
        image: 'cloud-10',
        width: 225,
        height: 107
      },
      {
        image: 'cloud-11',
        width: 238,
        height: 115
      },
      {
        image: 'cloud-12',
        width: 215,
        height: 106
      }
    ];
  }

  createCloud()
  {
    let cloudElement = document.createElement( "img" );

    cloudElement.src = document.location.toString().replace("index.html", "") + `/assets/img/clouds/png/long-shadow/${this.image}.png`;

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
