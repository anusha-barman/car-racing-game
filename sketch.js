var canvas, backgroundImage;

var gameState = 0,finishedPlayers = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var track, car1_img, car2_img, car3_img, car4_img;
var f2
var obstacle
var slidingSound
var finishLine


function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  f2 = loadImage("images/f1.png")
  slidingSound = loadSound("sound/sliding.mp3");

  gold = loadImage("images/gold.png")
  bronze = loadImage("images/bronze.png")
  silver = loadImage("images/silver.png")

  
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
 // finishedPlayers = 0;
  yVel = 0;
  xVel = 0;

  xSet = false;
  game = new Game();
  game.getState();
  game.start();
  obstacleG = createGroup()


 for(var i=0; i<5; i++){
  w = random(200,900)
  h = random(-height*4, height -300)

 
  obstacle = createSprite(w,h)
  obstacle.addImage('f1', f2)
obstacleG.add(obstacle)

  }

}


function draw(){
   //start the game
   background(200, 200, 255);

   //start the game
   if (playerCount === 4 ) {
     game.update(1);
   }
 
   //start the game for real
   if (gameState === 1) {
     game.play();
   }
   if (gameState === 2 && finishedPlayers === 4) {
    game.displayRanks()
    // console.log("End");
   }
  if(finishedPlayers === 4){
    game.update(2)
  }
  
  
  
  }
 
  
