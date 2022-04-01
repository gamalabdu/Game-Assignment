
//import { withExactArgs } from "sinon/lib/sinon/mock-expectation"

// Initialize the Phaser Game object and set default game window size
export const game2 = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  init: function() {},
  preload: preload,
  create: create,
  update: update
})

// Declare shared variables at the top so all methods can access them
let story = "In this game you will play as an eager student\n looking to graduate! The professor will look to\n challenge along the way until you collect all the \n diplomas!"
let score = 0
let intro
let scoreText
let help 
let newGame
let lives = 3
let livesText
let endGame = false
let titleText
let platforms
let diplomas
let cursors
let player
let enemy
let spaceKey
let YKey
let NKey
let HKey
let pickup
let touch
let begin = false
let recreate = false
let storyText
let hMenu = false
let pauseGame = false
let nMenu = false
let gamemusic
let shiftKey

function preload () {
  // Load & Define our game assets
  game2.load.image('sky', './assets/sky.png')
  game2.load.audio('pickup', './assets/pickup.wav')
  game2.load.audio('gamemusic', './assets/game-music.wav')
  game2.load.audio('touch', './assets/touch.wav')
  game2.load.image('school', './assets/college-building.png')
  game2.load.image('ground', './assets/platform.png')
  game2.load.image('diploma', './assets/diploma.png')
  game2.load.image('professor', './assets/professor-trimmy.png')
  game2.load.spritesheet('student', './assets/student.png', 165, 320)
  cursors = game2.input.keyboard.createCursorKeys()
  spaceKey = game2.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  YKey = game2.input.keyboard.addKey(Phaser.Keyboard.Y)
  HKey = game2.input.keyboard.addKey(Phaser.Keyboard.H)
  NKey = game2.input.keyboard.addKey(Phaser.Keyboard.N)
  shiftKey = game2.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
  pickup = new Phaser.Sound(game2, 'pickup', 1, false)
  touch =  new Phaser.Sound(game2, 'touch', 1, false)
  gamemusic = new Phaser.Sound(game2,'gamemusic',.4, true)
}

function create () {

  if(endGame){
    game2.add.sprite(0, 0, 'sky')
    storyText = game2.add.text(100, 200, 'END GAME: would you like to play again?', {fontSize: '320px', fill: '#000'})
    titleText = game2.add.text(300, 400, 'Y/N', { fontSize: '320px', fill: '#000' })
    return
  }




  if(begin){

  // gamemusic.stop()
  gamemusic.play()
  //  We're going to be using physics, so enable the Arcade Physics system
  game2.physics.startSystem(Phaser.Physics.ARCADE)

  //  A simple background for our game
  game2.add.sprite(0, 0, 'sky')
  game2.add.sprite(0, 0, 'school')
  


  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game2.add.group()

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true

  // Here we create the ground.
  const ground = platforms.create(0, game2.world.height - 64, 'ground')

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2)

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true

  //  Now let's create two ledges
  let ledge = platforms.create(600, 250, 'ground') // right
  ledge.scale.setTo(.5, 1)
  ledge.body.immovable = true

  ledge = platforms.create(0, 250, 'ground') // left
  ledge.scale.setTo(.5, 1)
  ledge.body.immovable = true

  ledge = platforms.create(300, 400, 'ground') // middle
  ledge.scale.setTo(.5, 1)
  ledge.body.immovable = true

  // The player and its settings
  player = game2.add.sprite(400, game2.world.height - 300 , 'student')
  player.scale.setTo(.3, .3)

  enemy = game2.add.sprite(700, game2.world.height - 300, 'professor')
  enemy.scale.setTo(.2, .2)  
 
  //  We need to enable physics on the player
  game2.physics.arcade.enable(player)
  game2.physics.arcade.enable(enemy)

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.1
  player.body.gravity.y = 500
  player.body.collideWorldBounds = true

  enemy.body.bounce.y = .5 // 1
  enemy.body.bounce.set(1); // 1
  enemy.body.velocity.set(200, 700);
  enemy.body.gravity.y = 800
  enemy.body.collideWorldBounds = true

  //  Our two animations, walking left and right.
  player.animations.add('left', [0,1], 10, true)
  player.animations.add('right', [4,5], 10, true)

  //  Finally some diamonds to collect
  diplomas = game2.add.group()

  //  Enable physics for any object that is created in this group
  diplomas.enableBody = true

  //  Create 12 diamonds evenly spaced apart

     const diploma = diplomas.create(600, 300, 'diploma')
     diploma.scale.setTo(.08, .08)

    //  Drop em from the sky and bounce a bit
    diploma.body.gravity.y = 1000
    diploma.body.bounce.y = 0.3 + Math.random() * 0.2
  

  //  Create the score text
  scoreText = game2.add.text(16, 16, '', { fontSize: '32px', fill: '#000' })
  livesText = game2.add.text(600, 16, '', { fontSize: '32px', fill: '#000' })


  //create help and new game 
   help = game2.add.text(500, 550, 'For Help press H Key', { fontSize: '32px', fill: '#FFFFFF' })
   newGame = game2.add.text(16, 550, 'For New Game press N Key', { fontSize: '32px', fill: '#FFFFFF' })


  //  And bootstrap our controls
  
  } else {
    game2.add.sprite(0, 0, 'sky')
    intro = game2.add.text(100, 100, story, {'fontSize': 30})
    //intro.setFontSize(10)
    titleText = game2.add.text(230, 400, 'Press Shift to Start Game', { fontSize: '320px', fill: '#000' })
  }

} 



function showNScreen() {
  game2.add.sprite(0, 0, 'sky')
  storyText = game2.add.text(275, 200, 'END GAME: would you \n like to play again?', {fontSize: '320px', fill: '#000'})
  titleText = game2.add.text(275, 300, 'Yes (Y) / No(Space Bar)', { fontSize: '320px', fill: '#000' })
  score = 0
  return
}

function sleep(time){
  return new Promise(resolve => setTimeout(resolve, time))
}


function update () {
  //  We want the player to stop when not moving
  // H key - help
  // space bar - exit help menu
  // n key to restart game or decline game

  if(hMenu){
    gamemusic.stop()
    game2.add.sprite(0, 0, 'sky')
    storyText = game2.add.text(100, 200, 'To jump press up key\n to move left press the left arrow\n to move right move press the right arrow\n Try to get all scrolls without hitting the professor\n Click the space bar to get back to playing the game', {fontSize: '320px', fill: '#000'})
    titleText = game2.add.text(300, 400, '', { fontSize: '320px', fill: '#000' })
    if(spaceKey.isDown){
      hMenu = false
      create()
    }
    return
  }
  else if(pauseGame){
    if(YKey.isDown){
      pauseGame = false
      lives = 3
      score = 0
      gamemusic.stop()
      create()  
      }

    if(spaceKey.isDown){
        pauseGame = false;
        begin = false
        lives = 3
        score = 0
        gamemusic.stop()
        create()
    }

    return
    
  } else if(endGame){

    if(YKey.isDown){
      endGame = false
        lives = 3
        score = 0
        create()
    }

    else if(NKey.isDown){
      game2.add.sprite(0, 0, 'sky')
      storyText = game2.add.text(250, 300, 'Thank You For Playing!', {fontSize: '320px', fill: '#000'})
      titleText = game2.add.text(300, 400, '', { fontSize: '320px', fill: '#000' })
     
    }
    return
  } else if(NKey.isDown) {
    showNScreen()
    pauseGame = true



    return
  }
   else if(HKey.isDown){
    hMenu = true
    
    return
  }

  if(begin){
    player.body.velocity.x = 0

    //  Setup collisions for the player, diamonds, and our platforms
    game2.physics.arcade.collide(player, platforms)
    game2.physics.arcade.collide(enemy, platforms)
    game2.physics.arcade.collide(diplomas, platforms)
    // game2.physics.arcade.collide(player,enemy)

    //  Call callectionDiamond() if player overlaps with a diamond
    game2.physics.arcade.overlap(player, diplomas, collectDiploma, null, this)
    game2.physics.arcade.overlap(player, enemy, playerDeath, null, this)

    // Configure the controls!
    if (cursors.left.isDown) {
      player.body.velocity.x = -150
      player.animations.play('left')
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150
      player.animations.play('right')
    } else {
      // If no movement keys are pressed, stop the player
      player.animations.stop()
    }


    //  This allows the player to jump!
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -400
    }
    // Show an alert modal when score reaches 120
    if (score === 120) {
      alert('You win!')
      score = 0
    }
  } else {
    
 
    if(shiftKey.isDown){
      begin = true;
      score = 0
      create()
    } 
  }

}

function collectDiploma (player, diploma) {
  // Removes the diamond from the screen
  diploma.kill()
  //  And update the score
  score += 10
  scoreText.text = 'Score: ' + score
  pickup.play()
  newDiploma()
}

function newDiploma (diploma) {
  diploma = diplomas.create(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400), 'diploma')
  diploma.scale.setTo(.08, .08)
  diploma.body.gravity.y = 1000
  diploma.body.bounce.y = 0.3 + Math.random() * 0.2
}

function newPlayer () {
  player = game2.add.sprite(50, game2.world.height - 300, 'student')
  game2.physics.arcade.enable(player)
  game2.physics.arcade.collide(player, platforms)
  player.scale.setTo(.3, .3)
  player.body.bounce.y = 0.1
  player.body.gravity.y = 500
  player.animations.add('left', [0,1], 10, true)
  player.animations.add('right', [4,5], 10, true)
  player.body.velocity.x = 0
  player.body.collideWorldBounds = true

}

function newEnemy () {
  enemy = game2.add.sprite(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400), 'professor')
  game2.physics.arcade.enable(enemy)
  game2.physics.arcade.collide(enemy, platforms)
  enemy.scale.setTo(.2, .2)
  enemy.body.bounce.y = .5 // 1
  enemy.body.bounce.set(1); // 1
  enemy.body.velocity.set(200, 700);
  enemy.body.gravity.y = 800
  enemy.body.collideWorldBounds = true
}

function playerDeath () {
  player.kill()
  enemy.kill()
  lives -= 1
  if(lives == 0) {
    endGame = true
    pauseGame = false
    hMenu = false
    recreate = true
    score = 0
    gamemusic.stop()
    create()
  } else {
    livesText.text = 'Lives: ' + lives
    touch.play()
    newPlayer()
    newEnemy()
  }
}


