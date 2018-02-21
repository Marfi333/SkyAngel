( function( root ) {
  var timestep = 1000 / 60,
    frameDelta = 0,
    lastFrameTimeMs = 0,
    running = false,
    fpsAlpha = 0.9,
    fpsUpdateInterval = 1000,
    lastFpsUpdate = 0,
    lastUpdateFps = 0,
    numUpdateSteps = 0,
    minFrameDelay = 0,
    started = false,
    deltaError = false,
    windowOrRoot = typeof window === 'object' ? window : root,
    requestAnimationFrame = windowOrRoot.requestAnimationFrame || ( function()
    {
        var lastTimestamp = Date.now(),
            now,
            timeout;

        return function( callback )
        {
            now = Date.now();
            timeout = Math.max( 0, timestep - ( now - lastTimestamp ) );
            lastTimestamp = now + timeout;
            return setTimeout( function()
            {
                callback( now + timeout );
            }, timeout);
        };
    })(),
    cancelAnimationFrame = windowOrRoot.cancelAnimationFrame || clearTimeout,
    rafHandle,
    starterFunction = function() {},
      begin = starterFunction,
      update = starterFunction,
      draw = starterFunction,
      end = starterFunction;

    root.MainThread = {
      resetDeltaTime: function()
      {
          var oldFrameDelta = frameDelta;
          frameDelta = 0;
          return oldFrameDelta;
      },

      startFrame: function( arg )
      {
          begin = arg || begin;
          return this;
      },

      updateFrame: function( arg )
      {
          update = arg || update;
          return this;
      },

      renderFrame: function( arg )
      {
          draw = arg || draw;
          return this;
      },

      endFrame: function( arg )
      {
          end = arg || end;
          return this;
      },

      start: function()
      {
          if ( !started ) {
              started = true;
              rafHandle = requestAnimationFrame( function( timestamp )
              {
                  draw(1);

                  running = true;
                  lastFrameTimeMs = timestamp;
                  lastFpsUpdate = timestamp;
                  lastUpdateFps = 0;

                  rafHandle = requestAnimationFrame(animate);
              });
          }
          return this;
      },

      stop: function()
      {
          running = false;
          started = false;
          cancelAnimationFrame( rafHandle );
          return this;
      },

      getState: function()
      {
          return running;
      }
  };

  function animate( timestamp )
  {
      rafHandle = requestAnimationFrame( animate );

      if ( timestamp < lastFrameTimeMs + minFrameDelay )
      {
          return;
      }

      frameDelta += timestamp - lastFrameTimeMs;
      lastFrameTimeMs = timestamp;

      begin( timestamp, frameDelta );

      if ( timestamp > lastFpsUpdate + fpsUpdateInterval )
      {
          lastFpsUpdate = timestamp;
          lastUpdateFps = 0;
      }
      lastUpdateFps++;

      numUpdateSteps = 0;
      while ( frameDelta >= timestep )
      {
          update( timestep );
          frameDelta -= timestep;

          if ( ++numUpdateSteps >= 240 )
          {
              deltaError = true;
              break;
          }
      }
      draw( frameDelta / timestep );

      deltaError = false;
  }
})( this );
