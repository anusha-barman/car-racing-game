class Game {
          constructor(){
        
          }
        
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
        
          }
        
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }
        
            car1 = createSprite(100,200);
            car1.addImage("car1",car1_img);
            car1.debug = true;
            car2 = createSprite(300,200);
            car2.addImage("car2",car2_img);
            car2.debug = true;
            car3 = createSprite(500,200);
            car3.addImage("car3",car3_img);
            car3.debug = true;
            car4 = createSprite(700,200);
            car4.addImage("car4",car4_img);
            car4.debug = true;
            cars = [car1, car2, car3, car4];
            finishLine = false;


          }
        
          play(){
            form.hide();
        
            Player.getPlayerInfo();
            
            if(allPlayers !== undefined){
              //var display_position = 100;
              image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
              //index of the array
              var index =0;
        
              //x and y position of the cars
              var x =250;
              var y;
        
              for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
                x = 200 + (index * 200) + allPlayers[plr].xPos;
                y = displayHeight - allPlayers[plr].distance ;
                //position the cars a little away from each other in x direction
               // x = x + 200;
                //use data form the database to display the cars in y direction
              // y = displayHeight - allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
                if (index === player.index){
                  cars[index - 1].shapeColor = "red";
                  camera.position.x = displayWidth/2;
                  camera.position.y = cars[index-1].y
                  if (cars[index-1].isTouching(obstacleG)){
                    yVel-= 0.9 
                    slidingSound.play()
                  }
                }
               
              }
        
            }
        
            
            if(player.distance < 5000){
              if(keyIsDown(38) && player.index !== null){
                  yVel += 0.9;
                  if(keyIsDown(37)){
                      xVel -= 0.2;
                  }
                  if(keyIsDown(39)){
                      xVel += 0.2;
                  }
              }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                  yVel -= 0.1;
                  xVel *= 0.9;
              }else{
                  yVel *= 0.985;
                  xVel *= 0.985;
              }
            }
        else if(finishLine ===false){
          xVel *=0.7
          yVel *=0.7
        Player.updateFinishedPlayers()
          player.place = finishedPlayers
          player.update()
          finishLine = true

        }

else{

yVel *=0.8
xVel *=0.8
}
        
          //move the car
          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
          //display sprites
          drawSprites();
        }



displayRanks(){
camera.position.x =0
camera.position.y =0

Player.getPlayerInfo()

        image(gold, 0 ,-100, 250, 250)
        image(bronze, 800,-100, 250, 250)
        image(silver,400,-100,250,250)

textAlign(CENTER)

for(var plr in allPlayers){
if(allPlayers[plr].place ===1){
  text("1st: "+ allPlayers[plr].name, 0, 90)
}
else if(allPlayers[plr].place === 2){
  text("2nd:" + allPlayers[plr].name,400,90)
}
else if (allPlayers[plr].place  === 3){
  text("3rd:" + allPlayers[plr].name,800,90)
}



}
           
      
        }
      }