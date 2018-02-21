class Bird
{
  constructor()
  {
    this.image = this.randomBird();
    this.speed = this.randomSpeed();
    this.size = this.randomSize();
    this.zindex = this.randomZIndex();
  }

  randomZIndex()
  {
    return Math.floor( Math.random() * 4 )+1;
  }

  randomBird()
  {
    return Math.floor( Math.random() * 6 )+1;
  }

  randomSpeed()
  {
    return Math.floor( Math.random() * 3 )+1;
  }

  randomSize()
  {
    return Math.floor( Math.random() * 3 )+1;
  }
}
