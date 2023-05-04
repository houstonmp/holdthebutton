# Button Wrangler

A simple hold the button game where the button moves around the screen. 


## Description

A design challenge I came up with for the local discord server that I'm a part of and made in React.js. The goal of this game is to see how long you can hold and hover over the button. The button begins in the center of the screen and starts to move around after a couple of seconds. Once you let go of the mouse or leave the button area the game is over.

### Features
  - Fully Responsive (Game is more difficult on larger screens)
  - Uses localStorage to store highscores (Lacks functionality to change your name at the moment)
  - Features various levels that increasingly make the game more difficult

If you like this project, you can check out the other submissions below!

## Demo - check it out [*here*](merry-unicorn-c978d5.netlify.app)

*Demo on Large Screen Device*  
<img src="/src/assets/buttonwrangler-github.gif" alt="Button Wrangler Large Image" width="60%" />

*Demo on Small Screen Device*  
<img src="/src/assets/buttonwrangler-github-small.gif" alt="Button Wrangler Small Image" width="30%" />



## Roadmap (Goals and ToDos)

Goals:
  - Add more rounds to the game ( Distractions, level up the speed, etc.)

ToDos
  - Change player names after they finish playing.

Known Issues:
  - Since phones and tablets use the touch events there isn't a way to track whether the user's finger is on the button. I'd like to see if I can address this in the future.
 
## My Design Process

I kept the design pretty simple for this game. All of the button movements are done with CSS classes and I change the class randomly via useState.
I had trouble with the hold button event maintaining state but I discovered that useRef is more applicable since it maintains its value regardless of where you call it. Other than that, I mostly winged the design with the colors coming from a color generator, [Coolors.co](https://coolors.co)


## Acknowledgements

 - [README Generated with readme.so](https://readme.so/editor)

## My Partners in Crime

Check out these other awesome creators I worked with!

-- Will Update Later --
