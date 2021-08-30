const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bridge;
var stone;
var jointLink;
var jointPoint;
var engine;
var world;
var stones=[];
var background;
var zombie;


function preload(){
  zombie= loadImage("./assets/zombie.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
 
  zombie= createSprite(width/2,height-110);
  zombie.scale=0.1;
  zombie.velocityX=10;

  breakButton = createButton("");
  breakButton.position(width-200,height/2-50);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPress);

  ground = new Wall (0,height-10,width*2,20);
  leftWall = new Wall (135,height/2+50,600,100); 
  rightWall = new Wall (width-300,height/2+50,600,100);
  bridge = new Bridge (15,{x:width/2-400,y:height/2});
  jointPoint = new Wall (width-600,height/2,40,20);
  Matter.Composite.add(bridge.body,jointPoint);
  jointLink = new Link (bridge,jointPoint);

  for(var i= 0; i < 8; i++){
    var x = random(width/2-200,width/2+300)
    var y = random(-10,140)
    var stone = new Stone(x,y,80,80)
    stones.push(stone)
  }

}

function draw() {
  background("black");
  Engine.update(engine);


  fill("white")
  text("x:"+mouseX+","+"y:"+mouseY,mouseX,mouseY)

  ground.display();
  leftWall.display();
  rightWall.display();
  bridge.show();
  for(var stone of stones){
    stone.display();
  }

  drawSprites()
}

function handleButtonPress(){
  Link.detach();
  setTimeout(() =>{
    bridge.break();
  }, 1500);
}