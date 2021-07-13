var hero,heroImg;
var loseline;
var car,carImg,carGroup;
var bullet,bulletImg,bulletGroup;
var score;
var gameOver,gameOverImg
var START;
var END;
var gamestate = "START";

function preload(){

  heroImg = loadImage("heroshoots.jpg");
  carImg = loadImage("armycar.png");
  bulletImg = loadImage("bullet.png");
  gameOverImg = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  hero = createSprite(width/9,height/2,10,20);
  hero.addImage(heroImg);
  hero.scale = 0.35;
  
  gameOver = createSprite(width/2,height/2,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;
  
  loseline = createSprite(10,height/2,5,height);
  
  score = 0
  
  carGroup = new Group();
  bulletGroup = new Group();
  
}

function draw() {
  
  background("white");
  
  if(gamestate === "START"){
  
  if(keyDown(UP_ARROW)){
    hero.y = hero.y - height/16;
  }
  
  if(keyDown(DOWN_ARROW)){
    hero.y = hero.y + height/16;
  }
  
  if(keyDown("space")){
    spawnBullet();
  }
  
  textSize(15);
  text("Score : "+score,width/1.25,height/16);
  
  spawnVehicle();
  
  if(carGroup.isTouching(bulletGroup)){
    bullet.destroy();
    car.destroy();
    score = score + 1;
  }
  if(carGroup.isTouching(loseline)){
    gamestate = "END";
    bulletGroup.destroyEach();
    carGroup.destroyEach();
    hero.destroy();
    loseline.destroy();
  }
  }
  if(gamestate === "END"){
    
    gameOver.visible = true;
    
    if(keyDown("space")){
      
      gamestate = "START"
      gameOver.visible = false;
      score = 0;
      loseline = createSprite(width*0 + 10,height/2,width/80,height);
      hero = createSprite(width/9,height/2,10,20);
      hero.addImage(heroImg);
      hero.scale = 0.35;
    }
  
  }

  drawSprites();
}

function spawnVehicle(){
  if(frameCount%100 === 0){
  car = createSprite(375,Math.round(random(height/16,height - height/16)),20,20)
  car.addImage(carImg);
  car.scale = 0.5
  car.velocityX = -1.5;
  carGroup.add(car);
  }
}
function spawnBullet(){
  
  bullet = createSprite(width/6.666,hero.y-15,5,5);
  bullet.addImage(bulletImg);
  bullet.scale = 0.15;
  bullet.velocityX = 1.75;
  bullet.lifetime = 100;
  bulletGroup.add(bullet);
}