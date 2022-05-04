import kaboom from "kaboom"

kaboom({
  background: [134, 135, 247], //making the bg a nice blue
  width: 728,
  height: 455,
});

loadSprite("bkg", "sprites/bkg.jpeg");

scene("start", () => {
  
  add([
    text("Welcome to OSAMU! press ENTER to start!", {size: 24}),
    pos(vec2(298,120)),
    origin("center"),
    color(255,255,255),
  ]);

  onKeyRelease("enter", () => {
    go("game");
  })
});

go("start"); //runs start-menu scene

//load in the sprite from a spritesheet and define animations
loadSpriteAtlas("sprites/Player1Sprites.png", {
  "Player": { 
    "x": 0, // KEEP THESE 0! otherwise there's gfx glitches
    "y": 0,
    "width": 96,  
    "height": 120,
    "sliceX": 3, 
    "sliceY": 3,
    "anims": {
      "idle": 0,
      "run": { from:0, to: 1, loop: true, speed: 3},
      "jump": {from:4, to:5},
      "crouch": {from:5, to:6},
    }, 
  }, 
}) 

//MAIN GAME SCENE
scene("game", () => {
  
  add([
    sprite("bkg", "sprites/bkg.jpeg", {width: width(), height:
      height() })
  ]);
  
  const SPEED = 300
  gravity(1600)

//Player 
  const player = add([
    sprite("Player", {frame:0}),
    pos(center()),//returns the center point vec2(width() / 2, height() / 2)
    area({ width: 32, height: 40}), //enables collision detection
    body(), // allows response to gravity
    origin("center"), //Set the orgin to the center for minimum jank
    scale(4, 4),
    "player"
    ])

//player controls
onKeyDown("right", () => {
  if (!player.isGrounded()) {
    player.play("jump")
  } else if (player.curAnim() != "run") {
    player.play("run")
  }
  player.flipX(false)
  player.move(SPEED, 0)
})

onKeyDown("left", () => {
  if (!player.isGrounded()) {
    player.play("jump")
  } else if (player.curAnim() != "run") {
    player.play("run")
  } 
  player.flipX(true)
  player.move(-SPEED, 0)
})

onKeyPress("up", () => {
  if(player.isGrounded()) {
    player.jump()
  }
})

onKeyPress("down", () => {
  if(player.isGrounded()) {
    player.play("crouch")
  }
})

onKeyPress("f", (c) => {
    fullscreen(!isFullscreen())
})

  
//playing platform
const platform = add([
  rect(width(), 5),
  outline(1),
  area(),
  pos(0,height() - 5),
  solid(),
])
//left wall barrier
add([
  pos(-20,1),
  rect(5,728),
  area(),
  solid(),
])
  
//right wall barrier
add([
  pos(740,1),
  rect(5, 728),
  area(),
  solid(),
])
  
function start() {
  go("game", {
  })
}
});
