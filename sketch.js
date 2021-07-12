var gameState, START = 1, PLAY = 2, END = 0;
var balloon, balloonImage;
var plane, planeImage, obstacleGroup;
var missile, missileImage, land;
var coin, coinImage, coinsGroup;
var cloudsGroup,cloud,cloudImage
var score = 0, lives = 3;
gameState = START;

function preload() {
  balloonImage = loadImage("balloon.png");
  planeImage = loadImage("airplane.png");
  missileImage = loadImage("missile.png");
  missile2Image = loadImage("missile2.png");
  coinImage = loadImage("coin.png");
  cloudImage = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 450, 10, 10);

  land = createSprite(300, 449, 600, 100);
  land.shapeColor=rgb(99, 16, 10)

  balloon = createSprite(300, 350, 10, 10);
  balloon.addImage(balloonImage);
  balloon.scale = 0.18;

  coinsGroup = new Group();
  obstacleGroup = new Group();
  cloudsGroup = new Group();
}

function draw() {
  background(168,182,255);

  if (gameState === START) {
    if (keyWentUp("space")) {
      gameState = PLAY;
    }
  } else if (gameState === PLAY) {

    camera.position.y = balloon.y - 160
    balloon.velocityY = -8

    if (frameCount % 80 === 0) {
      spawnPlane();
    }
    if (score >= 5 && frameCount % 150 === 0) {
      spawnMissile();
    }
    

    if (frameCount % 45 === 0) {
      spawnCoins();
    }
      spawnClouds();

    if (keyDown(RIGHT_ARROW) || keyDown("d")) {
      balloon.x += 7
    }

    if (keyDown(LEFT_ARROW) || keyDown("a")) {
      balloon.x -= 7
    }

    if (keyDown(DOWN_ARROW) || keyDown("s")) {
      balloon.y += 4
    }

    if (balloon.isTouching(coinsGroup)) {
      score += 1;
      coinsGroup.destroyEach();
    }
    if (balloon.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      lives = lives - 1;
    }
    if (lives === 0) {
      balloon.visible = false;
      obstacleGroup.destroyEach();
      coinsGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameState = END;
    }
  } else if (gameState === END) {
    if (keyWentUp("r")) {
      gameState = PLAY
      score = 0;
      balloon.visible = true;
      lives = 3;
    }
  }

  drawSprites();

  if (gameState === START) {
    noStroke();
    fill(1);
    textSize(20);
    text("Press Space To Start", 200, 200);
    text("Use left and right arrow keys to move", 20, 20)
  }
  if (gameState === PLAY || gameState === END) {
    noStroke();
    fill(1);
    textSize(20);
    text("Score:" + score, 120, balloon.y - 340);
    text("Lives:" + lives, 240, balloon.y - 340)
  }
  if (gameState === END) {
    noStroke();
    fill(1);
    textSize(50);
    text("GAME OVER!", 120, camera.y);
    textSize(20);
    text("Press R To Restart", 200, camera.y + 50)
  }
}

function spawnPlane() {
  num = Math.round(random(1,3));
  plane = createSprite(0, balloon.y - 560, 10, 10);
  plane.addImage("plane", planeImage);
  
  plane.velocityX = Math.round(random(4,7));

  if(num == 1){
    plane.x = 0;
    plane.velocityX = Math.round(random(5,10));
    //plane.mirrorX(1);
  }
  else if(num == 2){
    plane.x = 600;
    plane.velocityX = Math.round(random(-10,-3));
    plane.mirrorX(-1);
  }

  plane.scale = random(0.13, 0.16);
  plane.lifetime = 120;
  plane.debug = true;
  //plane.setCollider("rectangle",27,0,200,400);
  obstacleGroup.add(plane);
}

function spawnMissile() {
  var n = Math.round(random(1,5));
  console.log(n);
  missile = createSprite(0, balloon.y - 560, 10, 10);

  if(n >= 3){
  missile.addImage("missile", missileImage);
  
  missile.x = Math.round(random(15,585));
  missile.velocityY = Math.round(random(3,10));

  missile.scale = random(0.12, 0.15);
  missile.lifetime = 200;
  }
  else if(n === 1){
  missile.addImage("missile2", missile2Image);
  
  missile.x = Math.round(random(0,280));
  missile.velocityY = Math.round(random(3,12));
  missile.velocityX = Math.round(random(2,6));

  missile.scale = random(0.14, 0.17);
  missile.lifetime = 200;
  }
  else if(n === 2){
    missile.addImage("missile2", missile2Image);
    
    missile.x = Math.round(random(320,600));
    missile.velocityY = Math.round(random(3,12));
    missile.velocityX = Math.round(random(-6, -2));
  
    missile.scale = random(0.14, 0.17);
    missile.lifetime = 200;
    }

  missile.visible = true;
  obstacleGroup.add(missile);
}

function spawnCoins() {
  coin = createSprite(0, balloon.y - 360, 10, 10);
  coin.addImage("coin", coinImage);
  coin.x = random(80, 400);
  coin.scale = 0.05;
  //coin.setCollider("circle",0,0,270);
  coin.lifetime = 45
  coinsGroup.add(coin)
}

function spawnClouds() {
  if (frameCount % 16=== 0) {
     cloud = createSprite(600,balloon.y - 400,40,10);
    cloud.x = Math.round(random(10,500));
    cloud.addImage(cloudImage);
    cloud.scale = random(0.2,0.1);

    cloud.lifetime = 200;

    cloud.depth = balloon.depth;
    balloon.depth += 1;

   cloudsGroup.add(cloud);
    }
}