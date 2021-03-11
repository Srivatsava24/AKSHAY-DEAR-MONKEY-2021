//Creating variables
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var jungleBackground, jungleBackgroundImage;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;


//Creating preload function
function preload(){
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyCollide = loadAnimation("Monkey_01.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  jungleBackgroundImage = loadImage("jungle.jpg");
 
}

//Creating setup function
function setup(){
  
  // Creating the canvas
 createCanvas(850,560);
  
  //Creating groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
   
  //Creating the jungle
  jungleBackground=createSprite(0,0,800,290);
  jungleBackground.addImage(jungleBackgroundImage);
  jungleBackground.scale=1.5;
  jungleBackground.velocityX=-8;
  
  //Creating Monkey
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.15;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
     
  //Creating Ground
  ground = createSprite(300,280,1500,10);
  ground.scale = 1;
  ground.visible = false;
}

//Creating function draw
function draw(){
  
  //Painting background
  background("skyblue");

  //Making jungle and monkey visible.
    jungleBackground.visible = true;
    monkey.visible = true;

    if (gameState === PLAY){
    
    obstacles();
    bananas();
  
  //Creating score
    score = score + Math.round(getFrameRate()/60);
    
  // Making ground move
    ground.velocityX = -(20+score*1.9/100);
  
  //Making monkey to jump when space is pressed
    if(keyDown("space")&& monkey.y >= 205) {
      monkey.velocityY = -13; 
    }
  
  //Making monkey to move.
    monkey.velocityY = monkey.velocityY + 0.8
  
  //Making ground to move continuously
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  //Making jungle to move continuously
    if(jungleBackground.x<250){
    jungleBackground.x=jungleBackground.width/2;
  }
  
  // If banana is touching monkey size should increase.
    if (bananaGroup.isTouching(monkey)){
     bananaScore = bananaScore+1
      bananaGroup.destroyEach();
      var size = Math.round(random(10, 13));

  switch (size){
    case 10: monkey.scale = 0.12;
      break;
        case 11: monkey.scale = 0.14;
      break;
        case 12: monkey.scale = 0.16;
      break;
        case 13: monkey.scale = 0.18;
      break;
      default: break;
  }
    }

    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
    
  if (gameState === END){
    ground.velocityX = 0;

    jungleBackground.visible = false;
    monkey.visible = false;
    banana.visible = false;
    obstacle.visible = false;
    
    monkey.y = 245;
    monkey.scale = 0.1;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    fill("red");
    textSize(30);
    textStyle(BOLD);
    text("Game Over", 340, 170);
    
    fill("green");
    textSize(20);
    textStyle(BOLD);
    text("Press 'R' to play again", 320, 220);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }

  drawSprites(); 

  // Displaying SURVIVAL TIME
  fill("white");
  textSize(25);
  textFont("Algerian");
  text("Survival Time: "+score, 460, 30);
  
  // Displaying FOOD COLLECTED
  fill("white");
  textSize(25);
  text("Food Collected: "+ bananaScore,10,30);

  fill("white");
  textSize(50);
  textStyle(BOLD);
  text("AKSHAY'S DEAR MONKEY 2021",50,420);
  
 //Making monkey to collide with the ground.
  monkey.collide(ground);
}

//Creating bananas
function bananas(){
  if (frameCount%110 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(6 +score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);  
  
  }
}

//Creating obstacles
function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(6+score*1.5/100);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  } 
}
