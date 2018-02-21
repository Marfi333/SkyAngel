class Audion
{
  constructor()
  {
    this.buttonSound = this.getButtonSound;
    this.finishSound = this.getFinishSound;
    this.hitSound = this.getHitSound;
    this.starSound = this.getStarSound;
    this.backgroundSound = this.getGameSound;
  }

  buttonPress()
  {
    this.buttonSound.play();
  }

  backgroundMusic( state )
  {
    this.backgroundSound.loop = true;

    if ( state == "play" )
    {
      this.backgroundSound.play();
    }
    else
    {
      this.backgroundSound.pause();
    }
  }

  hit()
  {
    this.hitSound.play();
  }

  finsih()
  {
    this.finishSound.play();
  }

  star()
  {
    this.starSound.play();
  }

  get getButtonSound()
  {
    return new Audio( document.location + '/assets/sounds/button-3.mp3' );
  }

  get getFinishSound()
  {
    return new Audio( document.location + '/assets/sounds/finish.mp3' );
  }

  get getStarSound()
  {
    return new Audio( document.location + '/assets/sounds/star.mp3' );
  }

  get getHitSound()
  {
    return new Audio( document.location + '/assets/sounds/hit.mp3' );
  }

  get getGameSound()
  {
    return new Audio( document.location + '/assets/sounds/background.mp3' );
  }
}
