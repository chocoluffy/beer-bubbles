// Forked from https://github.com/soulwire/sketch.js/blob/master/examples/particles.html

// @todo rename particle to bubble? (or create new bubble class or options for the background ones)
// In need of a refactor / tidy up.

// ----------------------------------------
// Particle
// ----------------------------------------

function Particle( x, y, radius ) {
    this.init( x, y, radius );
}

Particle.prototype = {

    init: function( x, y, radius ) {
        this.alive = true;

        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random( TWO_PI );
        this.drag = 0.92;
        //this.color = '#fff';
        this.hue;

        this.x = x || 0.0;
        this.y = y || 0.0;

        this.vx = 0.0;
        this.vy = 0.0;
    },

    move: function(bubble) {
        //if (!bubble) {
            this.x += this.vx;
            this.y += this.vy;

            this.vx *= this.drag;
            this.vy *= this.drag;

            this.theta += random( -0.5, 0.5 ) * this.wander;
            this.vx += sin( this.theta ) * 0.1;
            this.vy += cos( this.theta ) * 0.1;

        if (!bubble) {
            this.radius *= 0.96;
            this.alive = this.radius > 0.5;
        }
       // } else {

        //}
    },

    draw: function( ctx ) {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        ctx.fillStyle = 'hsla(' + this.hue + ', 0%, 100%, .35)';
        ctx.fill();
    },

    update: function () {
        // @todo randomly generate x and y's within the screen
        // @todo when one gets to the top, go back to the bottom

        console.log('particle update');
        //  Check Bounds
        if (this.x < - this.maxRadius || this.x > demo.width + this.maxRadius || this.y < - this.maxRadius) {
            this.x = random( demo.width )
            this.y = random( demo.height + this.maxRadius, demo.height * 2 )
            this.vx = 0
            this.vy = -random( 1, 10 ) / 5
        }
    }
};

// ----------------------------------------
// Example
// ----------------------------------------

//var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
var MAX_PARTICLES = 800,
    MAX_BACKGROUND_PARTICLES = 1000,

    // Group of particles that spawn on mouse move, follow the mouse then disappear (die).
    particles = [],
    pool = [],

    // Group of small particles that bubble up continually from bottom to top of screen
    backgroundParticles = [],
    backgroundPool = [],
    demo;


demo = Sketch.create({
    container: document.getElementById( 'container' )
});

demo.setup = function() {
    var i, x, y, z;

    // Set off some initial particles before mouse move detected. Spawned in middle of screen.
    for ( i = 0; i < 20; i++ ) {
        // Start in center of screen (X and Y)
        x = ( demo.width * 0.5 ) + random( -100, 100 );
        y = ( demo.height * 0.5 ) + random( -100, 100 );
        demo.spawn( x, y );
    }

    // Set off the background particles that are continual for life of demo. Spawned at bottom of screen across the page.
    for ( z = 0; z < MAX_BACKGROUND_PARTICLES; z++ ) {

        // Start in middle of X (give or take 300)
        x = ( demo.width * 0.5 ) + random( -300, 300 );

        // Start at bottom of Y (between 0 and 100 away from bottom)
        y = ( demo.height ) + random( 0, 100 );
        demo.spawnBackground( x, y );
    }
};

// Spawn the mouse responsive particle trail.
// A trial spawns then the particles get smaller and smaller until they disappear.
demo.spawn = function( x, y ) {
    var radius = random( 5, 40 ),
        particle;

    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );

    particle = pool.length ? pool.pop() : new Particle();
    particle.init( x, y, radius );

    particle.wander = random( 0.5, 2.0 );
    //particle.color = random( COLOURS );
    particle.hue = random( 30, 50 );
    particle.drag = random( 0.9, 0.99 );

    theta = random( TWO_PI );
    force = random( 2, 8 );

    particle.vx = sin( theta ) * force;
    particle.vy = cos( theta ) * force;

    particles.push( particle );
};

// Spawn the everlasting small background particles that bubble up from bottom to top continually for life of demo.
demo.spawnBackground = function (x, y) {
    var radius = 2,
        backgroundParticle;

    if ( backgroundParticles.length >= MAX_BACKGROUND_PARTICLES )
        backgroundPool.push( backgroundParticles.shift() );

    backgroundParticle = backgroundPool.length ? backgroundPool.pop() : new Particle();
    backgroundParticle.init( x, y, radius );

    backgroundParticle.wander = random( 0.5, 2.0 );
    //particle.color = random( COLOURS );
    backgroundParticle.hue = random( 30, 50 );
    backgroundParticle.drag = random( 0.9, 0.99 );

    theta = random( TWO_PI );
    force = random( 2, 8 );

    backgroundParticle.vx = sin( theta ) * force;
    backgroundParticle.vy = cos( theta ) * force;

    backgroundParticles.push( backgroundParticle );
}

demo.update = function() {
    var i,
        x,
        z = backgroundParticles.length,
        particle,
        backgroundParticle;

    // Setup mouse responsive particles
    for (i = particles.length - 1; i >= 0; i-- ) {

        particle = particles[i];

        if ( particle.alive ) particle.move();
        else pool.push( particles.splice( i, 1 )[0] );
    }

    // @todo Ensure background bubbles always update to remain on screen

    // Setup background particles.
    for (x = backgroundParticles.length - 1; x >= 0; x-- ) {

        backgroundParticle = backgroundParticles[x];

        // The background particles remain alive and at one size (unlike the mouse responsive particles)
        // Set the bubble flag (without it particles "die" when too small)
        if ( backgroundParticle.alive ) backgroundParticle.move(true);
        else backgroundPool.push( backgroundParticles.splice( x, 1 )[0] );
    }
};

demo.draw = function() {
    demo.globalCompositeOperation  = 'lighter';

    // Draw mouse responsive particles
    for ( var i = particles.length - 1; i >= 0; i-- ) {
        particles[i].draw( demo );
    }

    // Draw small background particles
    for ( var x = backgroundParticles.length - 1; x >= 0; x-- ) {
        backgroundParticles[x].draw( demo );
    }
};

// Spawn the mouse responsive particle trial.
demo.mousemove = function() {
    var particle, theta, force, touch, max, i, j, n;

    for ( i = 0, n = demo.touches.length; i < n; i++ ) {

        touch = demo.touches[i], max = random( 1, 4 );
        for ( j = 0; j < max; j++ ) {
          demo.spawn( touch.x, touch.y );
        }
    }
};