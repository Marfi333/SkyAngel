class ElementHit
{
  constructor()
  {

  }

  checkStarCollected( stars, plane )
  {
    let planeRight = plane.horizontalPosition;
    let planeLeft = plane.horizontalPosition + plane.width;

    let planeTop = plane.verticalPosition;
    let planeBottom = plane.verticalPosition + plane.height;

    stars.forEach( function( element ) {
      let starRight = element.collectibleHorizontalPosition;
      let starLeft = element.collectibleHorizontalPosition + element.width;

      let starTop = element.collectibleVerticalPosition;
      let starBottom = element.collectibleVerticalPosition + element.height;

      if ( ( planeRight <= starLeft && planeRight >= starRight ) && ( planeTop <= starBottom && planeBottom >= starTop ) )
      {
        return element;
      }
    });

    return false;
  }

  checkFuelCollected( fuels, plane )
  {

  }

  checkBirdHit( birds, plane )
  {

  }
}
