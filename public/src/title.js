import {game2} from './game.js'

// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  })
  
  // Declare shared variables at the top so all methods can access them
  let story = "In this game you will play as an eager student\n looking to gßraduate! The professor will look to\n challenge along the way until you collect all the \n diplomas!";
  let cursors;
  let spaceKey;
  function preload () {
    // Load & Define our game assets
    game.load.image('sky', './assets/sky.png')
    game.load.audio('pickup', './assets/pickup.wav')
    game.load.audio('touch', './assets/touch.wav')
    game.load.image('school', './assets/college-building.png')
    game.load.image('ground', './assets/platform.png')
    game.load.image('diploma', './assets/diploma.png')
    game.load.image('professor', './assets/professor-trimmy.png')
    game.load.spritesheet('student', './assets/student.png', 165, 320)
    cursors = game.input.keyboard.createCursorKeys()
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }
  
  function create () {
      game.add.sprite(0, 0, 'sky')
      intro = game.add.text(100, 100, story, {'fontSize': 30})
      titleText = game.add.text(230, 400, 'Press Space to Start Game', { fontSize: '320px', fill: '#000' })
  } 
  

  function update () {
    //  We want the player to stop when not moving

  
    if(spaceKey.isDown){
        //create()
    }
  
  }
  
  
  