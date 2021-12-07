
var trex ,trex_running, trex_dead;
var ground, ground_image;
var invisGround;
var cloud, cloud_image;
var obstacle, obstacle1_image, obstacle2_image, obstacle3_image,
obstacle4_image, obstacle5_image, obstace6_image;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var cloudsGroup;
var cactiGroup;
var gameOver, gameOver_image;
var retry, retry_image;
var score = 0;
var jump_sound
var die_sound
var checkpoint_sound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png")
  ground_image = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obstacle1_image = loadImage("obstacle1.png")
  obstacle2_image = loadImage("obstacle2.png")
  obstacle3_image = loadImage("obstacle3.png")
  obstacle4_image = loadImage("obstacle4.png")
  obstacle5_image = loadImage("obstacle5.png")
  obstacle6_image = loadImage("obstacle6.png")
  trex_dead = loadImage("trex_collided.png")
  gameOver_image = loadImage("gameOver.png")
  retry_image = loadImage("restart.png")

  jump_sound = loadSound("jump.mp3")
  die_sound = loadSound("die.mp3")
  checkpoint_sound = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,100,10,10)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("dead",trex_dead)
  trex.scale = 0.5
  //trex.debug = true
  trex.setCollider("rectangle",0,0,trex.width + 120,trex.height)


  //create ground
  ground = createSprite(300,180,600,20)
  ground.addImage(ground_image)
  ground.x = ground.width / 2

  //create invisible ground
  invisGround = createSprite(300,190,600,10)
  invisGround.visible = false

  var rand = Math.round(random(50,100))
  console.log(rand)
  
  

  cloudsGroup = createGroup()
  
  cactiGroup = createGroup()

//creating game over
  gameOver = createSprite(300,50,10,10)
  gameOver.addImage(gameOver_image) 
  gameOver.visible = false
    
//creating restart option
  retry = createSprite(300,100,50,50)
  retry.addImage(retry_image)
  retry.scale = 0.7
  retry.visible = false
}



function draw(){
  background(180)

  textSize(20)
  textFont("consolas")
  stroke("black")
  fill("black")
  text("Score:" + Math.round(score) ,20,20)

 if (gamestate == PLAY) {
  
  //trex jumping
    if (keyDown("space") && trex.y > 135) {
      trex.velocityY = - 11
      jump_sound.play()
    }

    //adding gravity to the t-rex
    trex.velocityY  = trex.velocityY + 0.8 

    //making ground infinte
    ground.velocityX = -(3 + score/100)
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    trex.collide(invisGround)  

    if (trex.isTouching(cactiGroup)) {
      //die_sound.play()
      //gamestate = END
      trex.velocityY = -10
      jump_sound.play()
    }

    /*if (frameCount) {
      score = score + 1
    }*/
    score = score + 0.05

    if(score % 100 == 0 && score > 0) {
      checkpoint_sound.play()
    }
  
    spawnObstacles()

    spawnClouds()

    
 } 
 else if (gamestate == END) {
    trex.velocityY = 0

    ground.velocityX = 0

    cactiGroup.setVelocityXEach(0)

    cloudsGroup.setVelocityXEach(0)

    trex.changeAnimation("dead",trex_dead)

    gameOver.visible = true

    retry.visible = true

    cactiGroup.setLifetimeEach(-1)

    cloudsGroup.setLifetimeEach(-1)

    if(mousePressedOver(retry)) {
      reset()
    }


   
 }

  
  

  
  
  //console.log(frameCount)

  
  drawSprites()
}

function spawnClouds() {
  
  if (frameCount % 60 == 0) {
    cloud = createSprite(600,100,10,10)
    cloud.velocityX = -5
    cloud.addImage(cloud_image)
    cloud.scale = 0.5
    cloud.y = Math.round(random(50,120))
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1

    cloud.lifetime = 200
    cloudsGroup.add(cloud)
  }
}

function spawnObstacles() {
  if (frameCount % 60 == 0) {
    obstacle = createSprite (600,165,10,10)
    obstacle.velocityX= -(6 + score/100)
    var rand = Math.round(random(1,6))
    switch(rand) {
      case 1: obstacle.addImage(obstacle1_image)
              break;
      case 2: obstacle.addImage(obstacle2_image)
              break;
      case 3: obstacle.addImage(obstacle3_image)
              break;
      case 4: obstacle.addImage(obstacle4_image)
              break;
      case 5: obstacle.addImage(obstacle5_image)
              break;
      case 6: obstacle.addImage(obstacle6_image)
              break;
      default:
              break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 200
    cactiGroup.add(obstacle)
  }
}

function reset() {

}

