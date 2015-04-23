# Beer Bubbles
Beer bubbles is an interactive animation for a page full of beer bubbles, using [Sketch.js](https://github.com/soulwire/sketch.js)

Created as a quirky addition to [Beerbot](http://beerbot.sys.vendhq.com), Vend HQ's kegbot interface.

Beerbot & this project are works in progress :)

# Building & Running

```
$ npm install
$ gulp
```

# Backstory

This was created as a quirky addition to [Beerbot](http://beerbot.sys.vendhq.com), Vend HQ's kegbot interface that displays beer at varying levels. The beer needed bubbles, so creating some sweet interactive JavaScript bubbles seemed like a cool idea.

I was originally inspired by this [Bubble Sketch.js Test](http://codepen.io/jackrugile/pen/IjKLt/) codepen, so I updated the colours and bubbliness to be more beerlike in this [Beer Bubbles](http://codepen.io/sehsarah/pen/RPbJOd) fork of mine.

After playing with that initial trial a bit and gathering some feedback from the other Beerbot hackers, we decided we wanted the bubbles to follow the mouse in a more liquid way. I remembered this [Particle Sketch.js Demo](http://soulwire.github.io/sketch.js/examples/particles.html) which felt pretty close to what I was after, so decided to merge those two ideas together.

This is what I came up with.

# Future

This is definitely WIP. Need to update the bubble physics, tidy up the build system & would be good to have configuration options etc. See issues for more.

This might lead to an API for all bubbles, e.g. water. And may in future include sound.

# Demo

![beerbot](https://cloud.githubusercontent.com/assets/1064684/7295418/d12bbb36-ea09-11e4-8aa0-59bae3023735.gif)

# Credits

Inspired by / forked
- [@soulwire](https://github.com/soulwire)'s [Sketch.js](https://github.com/soulwire/sketch.js) [Particle Demo](http://soulwire.github.io/sketch.js/examples/particles.html) 
- [Jack Rugile](http://codepen.io/jackrugile/)'s Pen [Bubble Sketch.js Test](http://codepen.io/jackrugile/pen/IjKLt/).
