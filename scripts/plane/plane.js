class Plane
{
  constructor( gW, gH )
  {
    this.image = document.location.toString().replace("index.html", "") + "assets/img/airplane/png/long-shadow/plane.png";
    this.width = 325;
    this.height = 104;
    this.position = "fixed";
    this.verticalPosition = 332;
    this.horizontalPosition = gW;
    this.zindex = 4;
    this.speed = 0.2;
    this.opacity = 1;

    this.horizontalStopPoints = [ 0, ( gW - this.width )+30 ];
    this.verticalStopPoints = [ 0, ( gH - this.height )-25 ];
  }

  setOpacity( op )
  {
    this.opacity = op;
  }

  checkVerticalPosition( position )
  {
    if ( position <= this.verticalStopPoints[0] || position >= this.verticalStopPoints[1] )
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  checkHorizontalPosition( position )
  {
    if ( position <= this.horizontalStopPoints[0] || position >= this.horizontalStopPoints[1] )
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  move( delta, direction, watchOut = false )
  {
    switch ( direction )
    {
      case 'up':
        if ( watchOut )
        {
          if ( this.checkVerticalPosition( this.verticalPosition - ( this.speed * delta ) ) )
          {
            this.verticalPosition = this.verticalPosition - ( this.speed * delta );
          }
        }
        else
        {
          this.verticalPosition = this.verticalPosition - ( this.speed * delta );
        }

        break;

      case 'down':
      if ( watchOut )
      {
        if ( this.checkVerticalPosition( this.verticalPosition + ( this.speed * delta ) ) )
        {
          this.verticalPosition = this.verticalPosition + ( this.speed * delta );
        }
      }
      else
      {
        this.verticalPosition = this.verticalPosition + ( this.speed * delta );
      }

        break;

      case 'left':
        if ( watchOut )
        {
          if ( this.checkHorizontalPosition( this.horizontalPosition + ( this.speed * delta ) ) )
          {
            this.horizontalPosition = this.horizontalPosition + ( this.speed * delta );
          }
        }
        else
        {
          this.horizontalPosition = this.horizontalPosition + ( this.speed * delta );
        }

        break;

      case 'right':
      if ( watchOut )
      {
        if ( this.checkHorizontalPosition( this.horizontalPosition - ( this.speed * delta ) ) )
        {
          this.horizontalPosition = this.horizontalPosition - ( this.speed * delta );
        }
      }
      else
      {
        this.horizontalPosition = this.horizontalPosition - ( this.speed * delta );
      }

        break;
    }
  }

  generatePlane()
  {
    let planeElement = document.createElement( "img" );

    planeElement.src = this.image;

    planeElement.style.width = this.width+"px";
    planeElement.style.height = this.height+"px";

    planeElement.style.position = this.position;
    planeElement.style.top = this.verticalPosition+"px";
    planeElement.style.right = this.horizontalPosition+"px";
    planeElement.style.opacity = this.opacity;

    planeElement.style.zIndex = this.zindex;

    planeElement.classList.add( "plane" );

    return planeElement;
  }
}
