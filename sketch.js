var stoneImage, bananaImage, StoneGroup, back, score, BananaGroup, backImage,ground,gameState,PLAY,END,monkey,player_Running,gameOver,
    gOImage
  ;


function preload() {
  backImage = loadImage("jungle2.jpg");
  player_Running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gOImage=loadImage("reset.jpg");
}



function setup() {
  
  createCanvas(400, 400);
  
  back = createSprite(0, 15, 400, 400);
  back.addAnimation("background", backImage);
  back.scale=1;
  back.velocityX=-6;
  
  gameOver=createSprite(200,200,50,50);
  gameOver.addImage("restart", gOImage);
  gameOver.scale=0.2;
  
  StoneGroup=new Group();
  BananaGroup=new Group();
  
  score=0;
  
  ground=createSprite(200,300,400,10);
  ground.visible=false
  
  PLAY=1;
  END=2;
  
  gameState=1;
  
  monkey=createSprite(35,298,20,50);
  monkey.addAnimation("monkey",player_Running);
  monkey.scale=0.1;
}

function draw() {
  background(220);
  monkey.collide(ground);
  
  
  if(gameState===PLAY){
    
  score=score+Math.round(frameCount % 50 === 0);
    gameOver.visible=false;
    
    if(keyDown("space") && monkey.y>255){
    monkey.velocityY=-14;
   
    
  }  

  monkey.velocityY=monkey.velocityY+0.8;
  
 
  
   if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
    if (back.x < 0){
      back.x = back.width/2;
    }
    
    if(monkey.isTouching(StoneGroup)) {
   gameState=END;
  
   
   
   
 }
    Size();
    spawnbanana();
    spawnobstacles();
  }  
  
  if(gameState===END){
   monkey.setFrame(1);
   ground.velocityX=0;
   monkey.velocityY=0;
   StoneGroup.setVelocityXEach(0);
   BananaGroup.setVelocityXEach(0);
   StoneGroup.setLifetimeEach(-1);
   BananaGroup.setLifetimeEach(-1);
   gameOver.visible=true;
    back.velocityX=0;
  }
 
  
  if(mousePressedOver(gameOver) && gameState===END){
    
   reset();
    
  }
  
  
  
  
  
  
 if(monkey.isTouching(BananaGroup) && gameState===PLAY){
   BananaGroup.destroyEach();
   score=(score+5);
 } 
  
  

  
  
  drawSprites();
  fill("White");
  text("Score: " +score,180,50);
}

function spawnbanana(){
  if(frameCount % 60===0){
    banana=createSprite(380,200,10,5);
    banana.y=round(random(100,210));
    banana.addAnimation("Banana",bananaImage);
    banana.scale=0.05;
    banana.velocityX=-7;
    banana.lifetime=90;
    BananaGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 300===0){
    stone=createSprite(380,200,50,50);
    stone.addAnimation("Stone",stoneImage);
    stone.y=round(random(268,268));
    stone.velocityX=-7;
    stone.scale=0.14;
    stone.lifetime=300;
    StoneGroup.add(stone);
  }
}


function reset(){
  
  StoneGroup.destroyEach();
  BananaGroup.destroyEach();
  gameState=PLAY;
  score=0;
  back.velocityX=-6;

}

function Size(){
  
  switch(score){
  
    case 10 :monkey.scale=0.105;
     break;        
    case 20:monkey.scale=0.115;
     break;
    case 30:monkey.scale=0.125;
     break;
    case 40:monkey.scale=0.135;
     break;
     default:
     break;
  
}
}

