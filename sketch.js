var banana, BananaGroup, monkey, monkeyImage, monkeyAnimation, bananaImage, obstacle, obstacleImage, ObstaclesGroup, back, backImage, invisibleGround, score, PLAY, END, gameState;



function preload() {
  
  backImage = loadImage("jungle.jpg");
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkeyImage = loadImage("Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
}

function setup() {

  createCanvas(400, 400);
  
  back = createSprite(0, 40, 400, 400);
  back.addImage("back", backImage);
  back.velocityX = -3;
  
  monkey = createSprite(50, 350, 10, 10);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.1;
  
  monkey.setCollider("circle", 0, 0, 30);
  
  invisibleGround = createSprite(300, 380, 600, 20);
  invisibleGround.visible = false;
  
  BananaGroup = new Group();
  ObstaclesGroup = new Group();
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  score = 0;
  
  
  
  
}

function draw() {
  
  background(220);
   
  console.log(invisibleGround.x);
  console.log(monkey.y);
  console.log(invisibleGround.y);
 
  
  if(gameState === PLAY) {
    
   if(back.x < 0) {
     back.x = back.width/2;
   }
    
  
   if(keyDown("space")&&monkey.y >= 357) {
  
     monkey.velocityY = -12;
  
    } 
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
   if(BananaGroup.isTouching(monkey)) {
      
     score = score+2; 
     BananaGroup.destroyEach();
     
    }
    
  
    
     switch(score) {
    
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40: monkey.scale = 0.18;
        break;
        
      default: break;
    
    
    }
  
   Banana();
   spawnObstacles();
    
    
   if(ObstaclesGroup.isTouching(monkey)) {
      
     gameState = END;
      
    }
    
  }else if(gameState === END) {
  
     monkey.velocityY = 0;
    
    back.velocityX = 0;
    
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    monkey.addImage("monkey", monkeyImage);
    monkey.scale = 0.1;
   
    
    
}
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score: "+ score, 200, 50);
  

}

function Banana() {
 if(frameCount%300 === 0) { 
  banana = createSprite(400, 200, 10, 10);
  banana.addImage("banana", bananaImage);
  banana.y = Math.round(random(260, 300));
  banana.scale = 0.05;
  banana.velocityX = -(5+frameCount/100);;
  banana.lifetime = 110;
   
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
   
  BananaGroup.add(banana);
  
  }
}

function spawnObstacles() {
  
  if(frameCount%60 === 0) {
   obstacle = createSprite(400, 360, 10, 10);
   obstacle.addImage("obstacle", obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -(5+frameCount/100);
   obstacle.lifetime = 90;
    
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth+1;
    
   ObstaclesGroup.add(obstacle);
    
  }
}




