
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "start";
var descp_bg, descp;
var start_button, start;
var baconImg, bacon_hair;
var bulletsGrp;
var score = 0;

function preload()
{
	descp_bg = loadImage("description bg.png");
	start_button = loadImage("start.png");
    baconImg=loadImage("Bacon_Hair.png")
}

function setup() {
	createCanvas(displayWidth - 10,displayHeight - 135);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	descp = createSprite(displayWidth/2,displayHeight/2)
	descp.addImage(descp_bg);
	descp.scale = 0.3;
	descp.visibilty = false;
	
	start = createSprite(displayWidth/2,displayHeight - 200)
	start.addImage(start_button);
	start.scale = 0.5;
	start.visibilty = false;
	
	console.log(displayHeight+","+width)
	Engine.run(engine);
  
  	 bacon_hair = createSprite(displayWidth/2,displayHeight/2);
	 bacon_hair.addImage(baconImg)
	 bacon_hair.scale = 0.2;
	bacon_hair.visibilty = false;

	bulletsGrp = new Group();
	
}	


function draw() {
  background(0);
  
if (gameState === "start"){
	
	fill("Red");
	textSize(30)
	text("The Bacon Hair", displayWidth/2 - 100,100);
	descp.visibilty = true;
	start.visibilty = true;
	if (mousePressedOver(start)){
		gameState = "play";
		start.destroy();
		descp.destroy();
	} 
}

if (gameState === "play"){
	background("brown");
	// w = 1526, h = 864
	bacon_hair.visibilty = true;
	var line1 = createSprite(10,364,10,729);
	var line2 = createSprite(763,10,1526 , 10);
	var line3 = createSprite(1516,364,10,729);
	var line4 = createSprite(763,750,1526,10);
	var obs1 = createSprite(displayWidth/2 - 70, height/2 + 40,30,220);
	var obs2 = createSprite(displayWidth/2 + 5, 522, 180,30)
	var obs3 = createSprite(displayWidth/2 + 80, height/2 + 45,30,200)

	if (keyDown("up")){
		bacon_hair.y -= 5;
	}
	if (keyDown("down")){
		bacon_hair.y += 5;
	}
	if (keyDown("left")){
		bacon_hair.x -= 5;
	}
	if (keyDown("right")){
		bacon_hair.x += 5;
	}

	
	bacon_hair.collide(obs1);
	bacon_hair.collide(obs2);
	bacon_hair.collide(obs3);
	bacon_hair.collide(line1);
	bacon_hair.collide(line2);
	bacon_hair.collide(line3);
	bacon_hair.collide(line4);

		if (frameCount%200 === 0){
			var bullets = createSprite(random(30,1490),random(30,720),10,10);
			bulletsGrp.add(bullets);
			bulletsGrp.setLifetimeEach(100);
		}

		if (bacon_hair.isTouching(bulletsGrp)){
			bulletsGrp.destroyEach();
			score = score + 1;
		}
}
fill("gold");
textSize(25);
text("Score:" + score, 1400, 50 );

  drawSprites();
 
}



