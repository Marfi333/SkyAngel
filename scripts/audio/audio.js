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
    else if ( state == "pause" )
    {
      this.backgroundSound.pause();
    }
    else if ( state == "stop" )
    {
      this.backgroundSound = this.getGameSound;
    }
  }

  hit()
  {
    this.hitSound.play();
  }

  finishMusic( state )
  {
    if ( state == "play" )
    {
      this.finishSound.play();
    }
    else
    {
      this.finishSound.pause();
    }
  }

  star()
  {
    this.starSound.play();
  }

  get getButtonSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + '/assets/sounds/button-3.mp3' );
  }

  get getFinishSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + '/assets/sounds/finish.mp3' );
  }

  get getStarSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + '/assets/sounds/star.mp3' );
  }

  get getHitSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + '/assets/sounds/hit.mp3' );
  }

  get getGameSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + '/assets/sounds/background.mp3' );
  }
}
