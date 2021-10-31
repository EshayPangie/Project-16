//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife,
  fruit,
  monster,
  fruitGroup,
  monsterGroup,
  score,
  r,
  randomFruit,
  position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var gameOverSound, knifeSwoosh;

function preload() {
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
}

function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;

  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  // Score variables and Groups
  score = 0;

  gameOver_sprite = createSprite(300, 300, 20, 20);
  gameOver_sprite.addImage("gameOver", gameOverImage);
  gameOver_sprite.scale = 1.9;

  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    fruits();
    Monster();

    gameOver_sprite.visible = false;

    knife.y = World.mouseY;
    knife.x = World.mouseX;

    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      score = score + 1;
    }
    if (monsterGroup.isTouching(knife)) {
      monsterGroup.destroyEach();
      // knife.changeImage("gameOver.png")
      gameState = END;
    }
  }

  if (gameState == END) {
    gameOver_sprite.visible = true;
    monsterGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    monsterGroup.setLifetimeEach(-100);
    fruitGroup.setLifetimeEach(-100);
  }

  drawSprites();
  textSize(25);
  text("Score : " + score, 250, 50);
}

function Monster() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 550));
    monster.velocityX = -(8 + score / 10);
    monster.setLifetime = 50;

    monsterGroup.add(monster);
  }
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.x = 0;
    fruit.velocityX = 6;

    // //Increase the velocity of fruit after score 4
    //   if(score == 4){
    //     fruit.velocityX= (7+(score/4));
    //     fruit.velocityY= (7+(score));
    //     fruit.velocity= (7+(score/4));
    //     fruit.velocityX= (7);
    //   }

    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 550));

    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}
