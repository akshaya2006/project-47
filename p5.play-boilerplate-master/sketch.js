var player, playerImage, playerEnd;
var coin, coinImage, coinGroup;
var mushroom, mushroomImage;
var ground, groundImg;
var obsticleGroup;
var invisibleGround, edges, spawnObstacle, spawnCoin;
var gameState = "play";
var score, restart, restartImg;
var gameOver, gameOverImg;

function preload(){
  playerImage = loadAnimation("player0.png","player1.png","player2.png",
  "player3.png","player4.png","player 5.png");
  mushroomImage = loadImage("mushroom.png");
  groundImg = loadImage("background.png");
  coinImage = loadAnimation("coin0.png","coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png","coin8.png"
  ,"coin9.png","coin10.png","coin11.png","coin12.png","coin13.png","coin14.png","coin15.png");
  playerEnd = loadAnimation("player2.png");
}

function setup() {
  createCanvas(700,480);

  ground = createSprite(200,200,800,600);
  ground.addImage(groundImg);
  ground.scale=1.1;


  player = createSprite(100,450,50,50);
  player.addAnimation("running",playerImage);
  player.addAnimation("ending",playerEnd);
  player.scale = 1;
  player.debug = false;
  player.setCollider("rectangle",0,0,100,250);
 
  invisibleGround = createSprite(200, 500, 1200,20);
  invisibleGround.visible = false;
  
  edges = createEdgeSprites();  
  obstacleGroup = new Group();
  coinGroup = new Group();

   score = 0;

}
function draw() {
    background(255,255,255);  
  if (gameState==="play")
  {
    if (coinGroup.isTouching(player)){
      coinGroup.destroyEach();
      score++
    }
    ground.velocityX =-7;
    if (ground.x<200){
      ground.x = 420
    }
     if (keyDown("right")){
     player.x = player.x+2
   }
    if (keyDown("left")){
    player.x = player.x-2
   } 
   if (keyDown("space")&&player.y>=100){
    player.velocityY = -12;
   }
   player.velocityY = player.velocityY+0.5;
   
   player.collide(invisibleGround);
   player.collide(edges);
 
    
   spawnObstacle();
   spawnCoin();
   
   if (obstacleGroup.isTouching(player)){
     gameState="end"
   }
  }else if(gameState === "end"){
    player.velocityX = 0;
    player.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    player.changeAnimation("ending",playerEnd);

    if (mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();

  stroke("white");
    fill("red");
    textSize(30);
    text("Score: "+score,550,50);
}


function spawnCoin(){
  if (frameCount % 150 === 0){
    coin = createSprite(200, 150, 10, 10);
    coin.addAnimation("moving", coinImage);
    coin.velocityX = -4;
    coin.scale = 0.5;
    coin.lifetime = 850;
    coinGroup.add(coin);
    coin.debug = false;
    coin.setCollider("rectangle",0,0,120,50);
    }
    }

function spawnObstacle(){
    if (frameCount % 200 === 0){
     mushroom = createSprite(800, random(450,400), 10, 10);
     mushroom.addImage("standing", mushroomImage);
     mushroom.velocityX = -4;
     mushroom.scale = 0.2;
     mushroom.lifetime = 850;
    obstacleGroup.add(mushroom);
    mushroom.debug = false;
    mushroom.setCollider("rectangle",0,0,120,50);
}
}