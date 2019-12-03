var GAME_WIDTH = 720;
var GAME_HEIGHT = 400;
var GAME_SCALE = 2.25;
// var HORIZON_Y = GAME_HEIGHT/GAME_SCALE/2;

var gameport = document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH,
                                           GAME_HEIGHT,
                                           {backgroundColor: 0x99D5FF});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

// Scene objects get loaded in the ready function
var keyUp, keyDown, keyRight, keyLeft, playerTouch = false, ridingBoat = false;
var onWater1, onIsland1, onWater2, onIsland2, onWater3, onIsland3, onWater4, onIsland4;
var world;
var bool;
var entity_layer;
var quadrant = 0, count = 0;

//add start screen to scene graph
var start_screen = new PIXI.Container();
stage.addChild(start_screen);

//background for start
var start_screen_bg = new PIXI.Sprite(
  PIXI.Texture.fromImage("title_screen.png") );

//button to enter game
var start_screen_button = new PIXI.Sprite(
  PIXI.Texture.fromImage("play_button.png") );

//add start button to start
start_screen_bg.addChild(start_screen_button);
start_screen_button.position.x = 30;
start_screen_button.position.y = 325;

//add start screen background to start screen
start_screen.addChild(start_screen_bg);

//add start screen to scene graph
var end_screen = new PIXI.Container();

var end_screen_bg = new PIXI.Sprite(
  PIXI.Texture.fromImage("endScreen.png") );

end_screen.addChild(end_screen_bg);

//functon to switch screen when start button is clicked on
function mouseStartHandler(e)
{
  stage.removeChild(start_screen);
  stage.addChild(world);

  //set scale for game to zoom in
  stage.scale.x = GAME_SCALE;
  stage.scale.y = GAME_SCALE;

  //boolean to update camera set to true
  bool = true;
}


//call mousehandler when screen clicked on
start_screen_button.interactive = true;
start_screen_button.on('mousedown', mouseStartHandler);

function gameloop() {
        movePlayer();
        moveBoat();
}

//method checks if player is trying to get on boat
function isBoatTouching() {
  if( Math.abs( player.position.x - boat.position.x ) < 20 &&
      Math.abs( player.position.y - boat.position.y ) < 20 ) {
      playerTouch = true;
      ridingBoat = true;
    }
  else{
    playerTouch = false;
    ridingBoat= false;
  }

}

//method tells which quadrant the character is currently in
function findQuadrant()
{
  if( player.position.x < 488 && player.position.y < 626)
  {
    quadrant = 0;
  }
  else if( player.position.x > 488 && player.position.y < 626)
  {
    quadrant = 1;
  }
  else if( player.position.x < 488 && player.position.y > 626)
  {
    quadrant = 2;
  }
  else if( player.position.x > 488 && player.position.y > 626)
  {
    quadrant = 3;
  }
}

// movePlayer function handles characters movement within an islands bounds
function movePlayer() {
  isBoatTouching();
  findQuadrant();
  pickUpTreasure1();
  pickUpTreasure2();
  pickUpTreasure3();
  // moveEnemy();


  //all booleans check current characters position relative to bounds of island
  onIsland1 = ( player.position.x >= 166 &&  player.position.x <= 346) && (player.position.y >= 210 && player.position.y <= 406);
  onIsland2 = ( player.position.x >= 838 &&  player.position.x <= 1084) && (player.position.y >= 130 && player.position.y <= 308);
  onIsland3 = ( player.position.x >= 116 &&  player.position.x <= 314) && (player.position.y >= 852 && player.position.y <= 1044);
  onIsland4 = ( player.position.x >= 792 &&  player.position.x <= 1036) && (player.position.y >= 898 && player.position.y <= 1078);

  //if in first island bounds and either not riding on boat or within island bounds.
  if( (quadrant == 0) && (!ridingBoat || onIsland1))
  {
    //move up
      if(keyUp && player.position.y > 210) {
          player.position.y -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move down
      if(keyDown && player.position.y < 400) {
          player.position.y += 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move left
      if(keyLeft && player.position.x > 166) {
          player.position.x -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move right
      if(keyRight && player.position.x < 346) {
          player.position.x += 2;
          console.log(player.position.x + ", " + player.position.y);
      }
  }

  //if in second island bounds and either not riding on boat or within island bounds.
  else if( (quadrant == 1) && (!ridingBoat || onIsland2))
  {
      //move up
      if(keyUp && player.position.y > 130) {
          player.position.y -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move down
      if(keyDown && player.position.y < 302) {
          player.position.y += 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move left
      if(keyLeft && player.position.x > 838) {
          player.position.x -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move right
      if(keyRight && player.position.x < 1084) {
          player.position.x += 2;
          console.log(player.position.x + ", " + player.position.y);
      }
  }

  //if in third island bounds and either not riding on boat or within island bounds.
  else if( (quadrant == 2) && (!ridingBoat || onIsland3))
  {
      //move up
      if(keyUp && player.position.y > 852) {
          player.position.y -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move down
      if(keyDown && player.position.y < 1038) {
          player.position.y += 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move left
      if(keyLeft && player.position.x > 116) {
          player.position.x -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move right
      if(keyRight && player.position.x < 314) {
          player.position.x += 2;
          console.log(player.position.x + ", " + player.position.y);
      }
  }

  //if in second island bounds and either not riding on boat or within island bounds.
  else if( (quadrant == 3) && (!ridingBoat || onIsland4))
  {
      //move up
      if(keyUp && player.position.y > 898) {
          player.position.y -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move down
      if(keyDown && player.position.y < 1072) {
          player.position.y += 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move left
      if(keyLeft && player.position.x > 792) {
          player.position.x -= 2;
          console.log(player.position.x + ", " + player.position.y);
      }

      //move right
      if(keyRight && player.position.x < 1036) {
          player.position.x += 2;
          console.log(player.position.x + ", " + player.position.y);
      }
  }
}

// moveBoat function handles characters movement and boat movement outside of island bounds
function moveBoat() {
    isBoatTouching();

    //on Water boolean makes sure boat position outside of all island bounds
    onWater = (( boat.position.x <= 196 ||  boat.position.x >= 344) || (boat.position.y <= 240 || boat.position.y >= 386)) //island1
              &&  (( boat.position.x <= 868 ||  boat.position.x >= 1082) || (boat.position.y <= 170 || boat.position.y >= 288)) //island2
              && (( boat.position.x <= 146 ||  boat.position.x >= 312) || (boat.position.y <= 882 || boat.position.y >= 1024)) //island3
              && (( boat.position.x <= 792 ||  boat.position.x >= 1034) || (boat.position.y <= 898 || boat.position.y >= 1058)); //island4

    //move up
    if(keyUp && boat.position.y > 112 && playerTouch) {
        if( onWater ) {
            player.position.y -= 2;
            boat.position.y -= 2;
            console.log("Boat: " + boat.position.x + ", " + boat.position.y);
        }
    }

    //move down
    if(keyDown && player.position.y < 1136 && playerTouch) {
        if(onWater) {
            player.position.y += 2;
            boat.position.y += 2;
            console.log("Boat: " + boat.position.x + ", " + boat.position.y);
        }
    }

    //move left
    if(keyLeft && player.position.x > 112 && playerTouch) {
        if( onWater) {
            player.position.x -= 2;
            boat.position.x -= 2;
            console.log("Boat: " + boat.position.x + ", " + boat.position.y);

        }
    }

    //move right
    if(keyRight && player.position.x < 1136 && playerTouch) {
        if( onWater ) {
            player.position.x += 2;
            boat.position.x += 2;

            console.log("Boat: " + boat.position.x + ", " + boat.position.y);
        }
    }
}


// Function: moveEnemy()
// Desc: Move enemy slightly closer to the player
function moveEnemy() {

  onIsland1 = ( player.position.x >= 166 &&  player.position.x <= 346) && (player.position.y >= 210 && player.position.y <= 406);
  onIsland2 = ( player.position.x >= 838 &&  player.position.x <= 1084) && (player.position.y >= 130 && player.position.y <= 308);
  onIsland3 = ( player.position.x >= 116 &&  player.position.x <= 314) && (player.position.y >= 852 && player.position.y <= 1044);
  onIsland4 = ( player.position.x >= 792 &&  player.position.x <= 1036) && (player.position.y >= 898 && player.position.y <= 1078);

  if( player.onIsland1 )
  {
    createjs.Tween.get(monster.position.position).to({x: player.position.x, y: player.position.y}, 500);
  }

  elif( player.onIsland2 )
  {
    createjs.Tween.get(monster.position.position).to({x: player.position.x, y: player.position.y}, 500);

  }

  elif( player.onIsland3 )
  {
    createjs.Tween.get(monster.position.position).to({x: player.position.x, y: player.position.y}, 500);

  }





  // // move the enemy right
  // if(monster.position.x < player.position.x) {
  //   monster.position.x = monster.position.x + 1;;
  // }
  // // move the enemy left
  // else if(monster.position.x > player.position.x) {
  //   monster.position.x = monster.position.x - 1;
  // }
  // // move the enemy down
  // if(monster.position.y < player.position.y) {
  //   monster.position.y = monster.position.y + 1;
  // }
  // // move the enemy up
  // else if(monster.position.y > player.position.y) {
  //   monster.position.y = monster.position.y - 1;
  // }
}

//function to collect trophy
function pickUpTreasure1() {
  if( Math.abs( player.position.x - treasure1.position.x ) < 20 &&
      Math.abs( player.position.y - treasure1.position.y ) < 20 ) {
        //off map so it doesn't get double counted
        treasure1.position.x = 2000;
        treasure1.position.y = 2000;
        entity_layer.removeChild(treasure1);
        count++;
    }
}

//function to collect trophy
function pickUpTreasure2() {
  if( Math.abs( player.position.x - treasure2.position.x ) < 20 &&
      Math.abs( player.position.y - treasure2.position.y ) < 20 ) {
        //off map so it doesn't get double counted
        treasure2.position.x = 2000;
        treasure2.position.y = 2000;
        entity_layer.removeChild(treasure2);
        count++;
    }
}

//function to collect trophy
function pickUpTreasure3() {
  if( Math.abs( player.position.x - treasure3.position.x ) < 20 &&
      Math.abs( player.position.y - treasure3.position.y ) < 20 ) {
        //off map so it doesn't get double counted
        treasure3.position.x = 2000;
        treasure3.position.y = 2000;
        entity_layer.removeChild(treasure3);
        count++;
    }
}
// keydown handler booleans for button presses for moving player
function keydownEventHandler(e) {
    // key movement for player up, down, left, right
  if (e.keyCode == 87) { // W key
    keyUp = true;
  }
  if (e.keyCode == 83) { // S key
    keyDown = true;
  }
  if (e.keyCode == 65) { // A key
    keyLeft = true;
  }
  if (e.keyCode == 68) { // D key
    keyRight = true;
  }
}

// key up handlers for player not moving
function keyupEventHandler(e) {
  if (e.keyCode == 87) { // W key
    keyUp = false;
  }
  if (e.keyCode == 83) { // S key
    keyDown = false;
  }
  if (e.keyCode == 65) { // A key
    keyLeft = false;
  }
  if (e.keyCode == 68) { // D key
    keyRight = false;
  }
}

// event listeners for key press and key up
document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader
  .add('map_json', 'map.json')
  .add('map', 'map.png')
  .add('assets.json')
  .add('assets_boat.json')
  .add('assets_treasure.json')
  .load(ready);

function ready() {
  var tu = new TileUtilities(PIXI);
  world = tu.makeTiledWorld("map_json", "map.png");

  // create frames for character sprite
  var frames = [];
  for( var i = 1; i <=4; i++)
  {
    frames.push(PIXI.Texture.fromFrame("astro" + i + ".png"));
  }

  var frames2 = [];
  for( var i = 1; i <=3; i++)
  {
    frames2.push(PIXI.Texture.fromFrame("boat_petty" + i + ".png"));
  }

  var frames3 = [];
  for(var i = 1; i <= 2; i++)
  {
    frames3.push(PIXI.Texture.fromFrame("monster" + i + ".png"));
  }

  var frames4 = [];
  for(var i = 1; i <= 2; i++)
  {
    frames4.push(PIXI.Texture.fromFrame("treasure" + i + ".png"));
  }

  var frames5 = [];
  for(var i = 3; i <= 4; i++)
  {
    frames5.push(PIXI.Texture.fromFrame("treasure" + i + ".png"));
  }

  var frames6 = [];
  for(var i = 5; i <= 6; i++)
  {
    frames6.push(PIXI.Texture.fromFrame("treasure" + i + ".png"));
  }

  player = new PIXI.extras.MovieClip(frames);
  player.animationSpeed = .1;

  // orient player
  player.scale.set(2, 2);
  player.animationSpeed = .07;
  player.position.x = 240;
  player.position.y = 220;

  player.play();

  boat = new PIXI.extras.MovieClip(frames2);
  boat.animationSpeed = .1;
  boat.scale.set(0.15, 0.15);
  boat.position.x = 346;
  boat.position.y = 200;

  boat.play();

  monster = new PIXI.extras.MovieClip(frames3);
  monster.animationSpeed = .03;
  monster.scale.set(3, 3);
  monster.position.x = 320;
  monster.position.y = 220;

  monster.play();

  treasure1 = new PIXI.extras.MovieClip(frames4);
  treasure1.animationSpeed = .03;
  treasure1.scale.set(3, 3);
  treasure1.position.x = 200;
  treasure1.position.y = 950;

  treasure1.play();

  treasure2 = new PIXI.extras.MovieClip(frames5);
  treasure2.animationSpeed = .03;
  treasure2.scale.set(3, 3);
  treasure2.position.x = 950;
  treasure2.position.y = 240;

  treasure2.play();

  treasure3 = new PIXI.extras.MovieClip(frames6);
  treasure3.animationSpeed = .03;
  treasure3.scale.set(3, 3);
  treasure3.position.x = 850;
  treasure3.position.y = 950;

  treasure3.play();


  entity_layer = world.getObject("GameObjects");
  entity_layer.addChild(player);
  entity_layer.addChild(boat);
  entity_layer.addChild(monster);
  entity_layer.addChild(treasure1);
  entity_layer.addChild(treasure2);
  entity_layer.addChild(treasure3);


  animate();
  update();

  // boolean to stop update camera
  bool = false;
}

// function to animate player and move camera
function animate(timestamp) {
  requestAnimationFrame(animate);
  update_camera();
  renderer.render(stage);

  if( count == 3 )
  {
    stage.removeChild(world);
    stage.addChild(end_screen);
  }
}

// update function to control player movement in game loop
function update(){
    setInterval(gameloop, 20);
}

function update_camera() {
    // conditional to prevent updating camera on start screen
  if( bool )
  {
    stage.x = -player.x*GAME_SCALE + GAME_WIDTH/2 - player.width/2*GAME_SCALE;
    stage.y = -player.y*GAME_SCALE + GAME_HEIGHT/2 + player.height/2*GAME_SCALE;
    stage.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
    stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
  }
}
