var backgroundImage; 

var player1, player1Img, player2, player2Img, playerWinImg, playerHitImg; 

var leftNet, leftNetImg, rightNet, rightNetImg; 

var puck, puckImg; 

var edges; 

var gameState = "serve"; 

var boundary1, boundary2, boundary3, boundary4, boundary5, boundary6; 

var p1score = 0;
var p2score = 0;

function preload(){ 
  backgroundImage = loadImage("images/bg_img.jpg"); 
  leftNetImg = loadImage("images/left_net.png"); 
  rightNetImg = loadImage("images/right-net.png"); 
  puckImg = loadImage("images/puck.png"); 
  player1Img = loadAnimation("images/P_1hit.png", "images/p_right.png"); 
  player2Img = loadAnimation("images/P_1hit.png", "images/p_left.png"); 
  playerWinImg = loadAnimation("images/p_winhit.png"); 
  playerHitImg = loadAnimation("images/p_2hit.png"); 
}

function setup() {
  createCanvas(1000, 600);

  player1 = createSprite(200, 300, 20, 20); 
  player1.addAnimation("player1",player1Img); 
  player1.addAnimation("player_1", playerHitImg); 
  player1.addAnimation("player.1", playerWinImg); 
 // player1.debug = true;

  player2 = createSprite(800, 300, 20, 20); 
  player2.addAnimation("player2", player2Img); 
  player2.addAnimation("player_2", playerHitImg); 
  player2.addAnimation("player.2", playerWinImg); 
  //player2.debug = true; 

  leftNet = createSprite(50, 300, 20, 20); 
  leftNet.addImage("leftNet",leftNetImg); 
  leftNet.scale = 0.4; 

  rightNet = createSprite(950, 300, 20, 20); 
  rightNet.addImage("rightNet",rightNetImg); 
  rightNet.scale = 0.5

  puck= createSprite(500, 300, 20, 20); 
  puck.addImage("puck",puckImg); 
  puck.scale = 0.1; 
  //puck.debug = true;

  edges = createEdgeSprites(); 

  boundary1 = createSprite(10, 100, 10, 200); 
  boundary2 = createSprite(10, 300, 10, 200);
  boundary3 = createSprite(10, 500, 10, 200); 
  boundary4 = createSprite(990, 100, 10, 200); 
  boundary5 = createSprite(990, 300, 10, 200); 
  boundary6 = createSprite(990, 500, 10, 200); 

  //making boundaries invisible 
  boundary1.visible = false; 
  boundary2.visible = false; 
  boundary3.visible = false; 
  boundary4.visible = false; 
  boundary5.visible = false; 
  boundary6.visible = false; 
}

function draw() {
  background(backgroundImage); 
  
  fill("black");
  textSize(30);

   //place info text in the center
   if (gameState === "serve") {
    text("Press Space to Serve",400,250);
  }

  //releasing the puck and starting with the gameState 
  if(keyDown("space") && gameState === "serve"){
    puck.velocityX = 3; 
    puck.velocityY = 4; 
    gameState = "play"; 
  }
  
  //scores
  text("Player1: "+p1score, 50,50);
  text("Player2: "+p2score, 800, 50); 
  
  //controlling player 1 
  if(keyDown("a")){ 
    player1.x = player1.x-5; 
  }

  if(keyDown("s")){ 
    player1.y = player1.y+5; 
  }

  if(keyDown("w")){ 
    player1.y = player1.y-5; 
  }

  if(keyDown("d")){ 
    player1.x = player1.x+5; 
  }

  //controlling player 2 
  if(keyDown("up")){ 
    player2.y = player2.y-5; 
  }

  if(keyDown("down")){ 
    player2.y = player2.y+5; 
  }

  if(keyDown("left")){ 
    player2.x = player2.x-5; 
  }

  if(keyDown("right")){ 
    player2.x = player2.x+5; 
  }

  if(puck.isTouching(boundary1) || puck.isTouching(boundary3)){
    p1score--; 
    reset();
    gameState = "serve";
  }

  if(puck.isTouching(boundary4) || puck.isTouching(boundary6)){
    p1score--; 
    reset(); 
    gameState = "serve"; 
  }

  if(puck.isTouching(boundary2)){
    p2score = p2score + 2; 
    reset();
    gameState = "serve"; 
  }

  if(puck.isTouching(boundary5)){ 
    p1score = p1score +2; 
    reset(); 
    gameState = "serve"; 
  }

  player1.collide(edges); 
  player2.collide(edges); 

  puck.bounceOff(edges[2]); 
  puck.bounceOff(edges[3]); 
  
  //puck bouncing off players 
  //puck.bounceOff(player1); 
  //puck.bounceOff(player2);

  if(puck.isTouching(player1)){
    puck.velocityX = (-1) * puck.velocityX;
    puck.velocityY = (-1) * puck.velocityY;
  }
  
  if(puck.isTouching(player2)){
    puck.velocityX = (-1) * puck.velocityX;
    puck.velocityY = (-1) * puck.velocityY;
  }

  if(p1score === 2 || p2score === 2){ 
    gameState = "over"; 
    text("Game Over!",450,200);
    text("Press 'R' to Restart",400,250);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    p1score = 0;
    p2score = 0;
  }
  
  
  
  drawSprites();
}

function reset() {
  puck.x = 500; 
  puck.y = 300; 
  puck.velocityX = 0;
  puck.velocityY = 0;
  player1.x = 200; 
  player2.x = 800; 
  player1.y = 300; 
  player2.y = 300; 
}

