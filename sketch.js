//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload(){
  //load images here
  
  normDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
 

  dog = createSprite(250,250);
  
  dog.addImage("normalDog",normDog);

  dog.scale = .3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("happyDog",happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill(0);
  stroke(0);
  text("Press up arrow key to feed Phineas",100,50)
  text("food stock left" + foodS,100,100);

}

function readStock(data){

  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  } else {
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  });

}
