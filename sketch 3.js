var PLAY = 1;
var END = 0;
var gameState = PLAY;
var x1 = 0;
var x2;
var ground, ground_image
var girl, girl_running, girl_collided, girlImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var Group, garbage1, garbage2, garbage3, garbage4
var jumpSound, dieSound, checkpointSound ,level3sound;
var score,scoreImage,scoreBoard;
var gameOver, restart, gameOverImage, restartImage;
var level=1,levelImage,levelBoard;
var winText,winText_img
function preload() {
  ground_image = loadImage("smart-city.gif");
  girl_running = loadAnimation("road sweeper3.png");
 obstacle2 = loadImage("sing bord3.png");
  obstacle1 = loadImage("road divider1.png");
  garbage1 = loadImage("landfillObstacle.png");
  garbage2 = loadImage("garbage3.png");
  // winText_img = loadImage("win.png"); 
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  level3sound=loadSound("level3 sound.wav")
  gameOverImage = loadImage("go1.png");
  restartImage = loadImage("RS1.png");

  girl_collided = loadImage("Dead (30).png");
  girlImage = loadImage("road sweeper3.png");

  scoreImage = loadImage("Score.png");
  
  levelImage = loadImage("Level3.png");
}

function setup() {
  //resizeCanvas(windowWidth, windowHeight);
  // background()

  createCanvas(windowWidth, windowHeight);



  x2 = width;
  ground = createSprite(0, 0, 600, 1000);

  ground.addImage("ground_image", ground_image);
  ground.scale = 1.7;

  ground.velocityX = -1

  girl = createSprite(300, 480, 900, 10);
  girl.addAnimation("girl_running", girl_running);
  girl.addImage("girl_collided", girl_collided);
  girl.addImage("girlImage", girlImage);
  girl.scale = 0.3;
  // girl.velocityX=2;
  // girl.debug = true;
  girl.setCollider("circle", 0, 0, 340);

  // winText = createSprite(windowWidth/2, windowHeight/2);
  // winText.addImage(winText_img);
  // winText.scale = 0.55;
  // winText.visible = false;




  invisible_ground = createSprite(400, 550, 600, 10);
  invisible_ground.visible = false;

  gameOver = createSprite(windowWidth/2, windowHeight/2);
  gameOver.addImage(gameOverImage);

  restart = createSprite(windowWidth/2, windowHeight/2 - 150,200,200);
  restart.addImage(restartImage);
  restart.scale=0.60;

  scoreBoard = createSprite(100, 80);
  scoreBoard.addImage(scoreImage);
  scoreBoard.scale=0.50;

  levelBoard = createSprite(0.9* windowWidth, 85);
  levelBoard.addImage(levelImage);
  levelBoard.scale=0.50;

  obstaclesGroup = new Group();
  garbageGroup = new Group();


  score = 0;
}


function draw() {

  background(0);
  //Gravity
  girl.velocityY = girl.velocityY + 0.8;
  girl.collide(invisible_ground);

  //Gravity


  if (gameState === PLAY) 
  {
    gameOver.visible = false;
    restart.visible = false;
level3sound.play()

    spawnObstacles();
    spawngarbag();


    ground.velocityX = -(4 + 3 * score / 100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

 
    if ((keyDown("space") && girl.y >= 380)) {
      girl.velocityY = -19;
      jumpSound.play();
    }

    if (girl.isTouching(obstaclesGroup)) {
      gameState = END;
      dieSound.play();
    }


    for(var i = 0; i < garbageGroup.length; i++){
   
      if(girl.isTouching(garbageGroup.get(i))){
        garbageGroup.get(i).destroy();
        score = score + 10;   
       
  checkPointSound.play();
      }
     }
     if (score >90) {
      window.location = ("message on swachh Bharat3.html")
    }
  }


  else if (gameState === END) {
    gameOver.visible = true;
  
    restart.visible = true;
    ground.velocityX = 0;
    girl.velocityY = 0
    girl.changeImage("girlImage", girlImage);


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
      reset();
    }
  }
    
  drawSprites();
  fill("black");
  textSize(25);
  text("Score: " + score, 50, 85);
  text("Level: " + "3", 0.87* windowWidth , 85);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  girl.changeAnimation("girl_running", girl_running);
  obstaclesGroup.destroyEach();
  score = 0;

}
//write this code after & outside draw() function NOT INSIDE
// function goToNextLevel() {
// window.location=("LEVEL 2.html")
// }

function spawnObstacles() {
  if (frameCount % 101 === 0) {
    var obstacle = createSprite(600, 450, 10, 40);
    obstacle.velocityX = -6;//+ score/100);

    //generate random obstacles
    var rand = Math.round(random(1,2));

    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;

      case 2: obstacle.addImage(obstacle2);
     
      break;

      default:
        break;
      
    }
    //garbages.addImage(garbage1);
   obstacle.scale = 0.9;
    obstaclesGroup.add(obstacle);
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0,30);
  }

}


function spawngarbag() {
  if (frameCount % 50 === 0) {
    var garbages = createSprite(800, 450, 10, 40);
    garbages.velocityX = -6;//+ score/100);

    //generate random obstacles
    //var rand = Math.round(random(1, 6));

    var rand = Math.round(random(1,2));

    switch(rand){
      case 1: garbages.addImage(garbage1);
      break;

      case 2: garbages.addImage(garbage2);
     
      break;

      default:
        break;
      
    }
    //garbages.addImage(garbage1);
    garbages.scale = 0.90;
    garbageGroup.add(garbages);
    //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages.setCollider("circle", 0, 0, 70);
  }
}


