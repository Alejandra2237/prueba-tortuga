var PLAY = 1;
var END = 0;
var gameState = PLAY;
var inicio = 5;

var jugador, jugador_running, jugador_img;
var fondo, fondoGround, fondoImage, cloudImage;

var obstaclesGroup, obstacle, cloud, cloudsGroup;
var JumpSound, DieSound;

var score=0;
var hight=0;

var gameOver, overGroup, restart;
var img, img1, img2, img3, img4;



function preload(){
  
  jugador_img = loadImage("tortuga.png");
  
  fondoImage = loadImage("mar3.png");
  cloudImage = loadImage("cloud.png");

  
  obstacle1 = loadImage("bolsa.png");


  
  gameOverImg = loadImage("over.png");
  restartImg = loadImage("restart.png");
  img=loadImage("img.png");
  img1=loadImage("img1.png");
  img2=loadImage("img2.png");
  img3=loadImage("img3.png");
  img4=loadImage("img4.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  gameState = inicio;
  
  jugador = createSprite(50,height/2,20,50);
  jugador.debug=false;
  jugador.setCollider("rectangle",-20,0,200,160);
  

  
  jugador.addImage("collided", jugador_img);
  jugador.scale = 0.28;
  
  
  
  fondo = createSprite(width/2,height/2+186,width,20);
  fondo.addImage("fondo",fondoImage);
  fondo.x = fondo.width/2+50;
  fondo.scale=1.3
  
   gameOver = createSprite(width/2,height/2-70);

  gameOver.scale=0.01;
  
  restart = createSprite(width/2,height/2-10);
  restart.addImage(restartImg);
  
  gameOver.scale = 3.0;
  restart.scale = 0.8;

  gameOver.visible = false;
  restart.visible = false;
  
  fondoGround = createSprite(width/2,height-10,width,15);
  fondoGround.visible = false;
  
 
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  
  jugador.depth = fondo.depth;
  jugador.depth = jugador.depth + 1;
  
  
  
  
 
  
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("skyblue");
  textSize(15);
  fill("orange")
  text("Puntuación: "+ score, width-200,50);
  text("Max puntuación: "+ hight,0,50)
  
  if (gameState===inicio){
    if (keyDown("SPACE")){
      gameState = PLAY;
      
    }
    
    textSize(width/40);
     fill("green")
  text("Presiona la tecla espacio o toca la pantalla para empezar",width/4-30,height/2-50)
    textSize(width/50);
    
    if (touches.length > 0){
      gameState = PLAY;
      touches = [];
      
    }
  }
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    fondo.velocityX = -(10 + 3*score/100);
  
   if((touches.length > 0 && jugador.y  >= height/2+50)) {
     jugador.velocityY = -4;
      JumpSound.play();
       touches = [];
    }
    
    spawnObstacles();
    spawnClouds();
    
    if (keyDown("up_arrow") && jugador.y  >= height/2+50) {
      
     jugador.velocityY = -4;
      //JumpSound.play();
    }
    
     if (keyDown("down_arrow") && jugador.y  >= height/2) {
      
     jugador.velocityY = +6;
      
    }
    
    
    
    
    if (keyDown("Down")){
      jugador.velocityY = jugador.velocityY + 3;
    }

  
    
    
  //><
    jugador.velocityY = jugador.velocityY + 0.4;
  
    if (fondo.x < 160){
      //fondo.x = fondo.width/2;
      fondo.x = width/1.15;
    }
  
    jugador.collide(fondoGround);
    
      
    }
  
  if(obstaclesGroup.isTouching(jugador)){
        gameState = END; 
    }
    
   
  
     if (gameState === END) {
      obstaclesGroup.setVelocityXEach(0);
       
       
      fondo.velocityX = 0;
      jugador.velocityY = 0;
    
    cloudsGroup.setVelocityXEach(0);

    restart.depth = gameOver.depth;
  restart.depth = restart.depth + 1;
    
    gameOver.visible = true;
    restart.visible = true;
    
    if (score>hight){
      
          hight=score;

    }
       if(score <=100){
         gameOver.addImage(img);
         gameOver.scale=1.01;
       }
       if(score >100  && score <=400){
         gameOver.addImage(img1);
         gameOver.scale=1.01;
       }
       if(score >400  && score <=800){
         gameOver.addImage(img2);
         gameOver.scale=1.01;
       }
       if(score >800  && score <=1200){
         gameOver.addImage(img3);
         gameOver.scale=1.01;
       }
       if(score >1200){
         gameOver.addImage(img4);
         gameOver.scale=1.01;
       }
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    
    if(touches.length>0 || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
 
  
  
  
  drawSprites();
}


function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height,40,10);
    cloud.y = Math.round(random(80,height/2-20));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = width+5;
    
    cloud.depth = gameOver.depth;
  gameOver.depth = gameOver.depth + 1;
  
    cloudsGroup.add(cloud);
  }
  
}


function spawnObstacles(){ 
if (frameCount % 40 === 0) {
 
    var obstacle = createSprite(width,height,10,40);
    obstacle.y = Math.round(random(height-50,height/2+50));
  obstacle.addImage(obstacle1);

  obstacle.debug=false;
  obstacle.setCollider("rectangle",0,0,100,170);
  
  obstacle.velocityX = -(10.5 + 3*score/100);
              
    obstacle.scale = 0.3;
    obstacle.lifetime = width+5;
    
    obstaclesGroup.add(obstacle);
  
  obstacle.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
  
    
  }
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  jugador.y = height/2+50;
  
  //jugador.changeAnimation("running",trex_running);
  
 
  
  score = 0;
    
}
