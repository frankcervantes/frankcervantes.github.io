var player1;
var player2;
var gravity = 0.2
var	bounceFactor = 0.2;
var platformGap = -150;
var lost = false;
var _W = 87;
var _A = 65;
var _S = 83;
var _D = 68;
var _SPACE = 32;
var _M = 77;
var TOP_PADDING = 190;
var VERTICAL_SPACE = 155
var HOR_SPACE = 120
var gameStart = false;
var platforms = [];
var ladders = [];
var bullets = [];
var gameOver = false;
var gameOverText = '';
var timer;
var shieldTimer;

function setup() {
	createCanvas(700, 1120);
	player1 = new Player();
	player2 = new Enemy();
	// GENERATE LADDERS AND PLATFORMS
	for(var i=0;i<=5;i++){
		var randomNum = Math.round(random(1,3));
		//GENERATE LADDERS WHEN THERE ARE NO GAPS IN THE PLATFORM
		if(randomNum == 1){
			platforms.push(new Platform(0,i*VERTICAL_SPACE + TOP_PADDING))
			if(Math.round(random(1,2)) == 2){
				ladders.push(new Ladder(Math.round(random(0,185-40)),i*VERTICAL_SPACE + TOP_PADDING));
			}else{
				ladders.push(new Ladder(Math.round(random(555,width-40)),i*VERTICAL_SPACE + TOP_PADDING));
			}
		}
		//GENERATE LADDERS WHEN THERE ARE GAPS IN THE PLATFORM
		else{
			var randomNum = Math.round(random(185,455));
			// console.log(randomNum)
			platforms.push(new Platform(0,i*VERTICAL_SPACE + TOP_PADDING,randomNum));
			platforms.push(new Platform(randomNum + HOR_SPACE,i*VERTICAL_SPACE + TOP_PADDING,width-(randomNum + HOR_SPACE)));
			if(Math.round(random(1,2)) == 2){
				ladders.push(new Ladder(Math.round(random(0,185-40)),i*VERTICAL_SPACE + TOP_PADDING));
			}else{
				ladders.push(new Ladder(Math.round(random(555,width-40)),i*VERTICAL_SPACE + TOP_PADDING));
			}
		}
	}
}


function draw() {
	background(0);
	for(var i=0;i<platforms.length; i++){
		platforms[i].display()
	}
	for(var i=0;i<ladders.length; i++){
		ladders[i].display()
	}
	for(var i=0;i<bullets.length; i++){
		bullets[i].display();
		bullets[i].move();
		if(bullets[i].y > height){
			bullets.splice(i,1)
			break;
		}
	}
	console.log(player1.shieldOn)
	if(gameOver == false){
		timer = millis() / 1000;
		text(int(timer), 10, 10);
		shieldTimer = millis()/ 1000;
		player1.display();
		player1.bounds();
		player1.move();
		player1.platformCollision();
		player1.climbLadder();
		player1.shield()

		player2.display();
		player2.bounds();
		player2.move();
		player2.platformCollision();
		player2.shoot();

		//Apply gravity to player1 + player2
		applyGravity(player1)
		applyGravity(player2);

		resolve();
	}else{
		document.getElementById("restart").innerHTML = "Restart?"

	}
	document.getElementById("time").innerHTML = int(timer)
}

function applyGravity(player){
	player.y += player.vy;
	player.vy += gravity;

	if(player.y + player.diameter > height) {
		player.y = height - player.diameter;
		player.vy *= -bounceFactor;
	}
}

function Platform(x,y,width = 700){
	this.width = width;
	this.height = 20;
	this.x = x;
	this.y = y;
	this.display = function(){
	    fill(125,120,240);
	    rect(this.x, this.y, this.width, this.height);
	}
	this.setY = function(y){
		this.y = y;
	}
	this.setStar = function(value){
		this.hasStar = value;
	}
}

function Ladder(x,y){
	this.x = x;
	this.y = y;
	this.width = 40;
	this.height = VERTICAL_SPACE;
	this.display = function(){
	    fill(150,207,100);
	    rect(this.x, this.y, this.width, this.height);
	}
}

//Player class
function Player() {
	this.x = 10;
	this.y = height-100;
	this.vx = 0;
	this.vy = 1;
	this.diameter = 60;
	this.speed = 4;
	this.score = 0;
	this.lastShootTime = 3000;  
   	this.shootRate = 3000;
   	this.shieldOn = false;
	this.display = function() {
		noStroke();
		fill(100,240,255);
		rect(this.x, this.y, this.diameter, this.diameter);
		if(this.shieldOn){
			fill(255,240,100)
			rect(this.x, this.y, this.diameter, this.diameter);
		}
	}
	//Prevents player from escaping screen
	this.bounds = function(){
		if(this.x > width-this.diameter/2 - 30){
			this.x = width -this.diameter/2 - 30;
		}
		if(this.x < 0 + this.diameter/2 - 30){
			this.x = 0 + this.diameter/2 - 30;
		}
		if(this.y < 0 + this.diameter/2 - 30){
			this.y = 0 + this.diameter/2 - 30
		}
		if(this.y > height-this.diameter/2 - 30){
			this.y = height - this.diameter/2 - 30
		}
	}
	//Player controls
	this.move = function(){
		if (keyIsDown(UP_ARROW)){
			this.y -= this.speed;
		}
	    if (keyIsDown(LEFT_ARROW))
	      this.x -= this.speed;
	    if (keyIsDown(RIGHT_ARROW))
	      this.x += this.speed;
	}
	this.platformCollision = function() {
		for(var i = 0;i<platforms.length;i++){
			if((this.x + this.diameter> platforms[i].x && this.x< platforms[i].x + platforms[i].width)){
				if((this.y + this.diameter > platforms[i].y) && this.y + this.diameter < platforms[i].y + platforms[i].height ) {
					this.y = platforms[i].y - this.diameter;
					this.vy *= -bounceFactor;
				}
			}
		}
	}
	this.climbLadder = function(){
		for(var i=0;i<ladders.length;i++){
			if(ladderPlayerCollision(this,ladders[i])){
				if (keyIsDown(UP_ARROW))
					this.y-=2;
			}
		}
	}
	this.shield = function(){
		if(keyIsDown(_M) && int(millis()/1000) < 10){
			this.shieldOn = true;
		}else{
			this.shieldOn = false;	
		}

	}
}




function ladderPlayerCollision(rect1,rect2){
	if (rect1.x < rect2.x + rect2.width &&
	   rect1.x + rect1.diameter > rect2.x &&
	   rect1.y < rect2.y + rect2.height &&
	   rect1.diameter + rect1.y > rect2.y) {
	    return true;
	}
}

function Enemy(){
	this.x = 10;
	this.y = 0;
	this.vx = 0;
	this.vy = 1;
	this.diameter = 60;
	this.speed = 4;
	this.score = 0;
	this.lastShootTime = 1000;  
   	this.shootRate = 1000;
	this.display = function() {
		noStroke();
		fill(255,100,100);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
	//Prevents player from escaping screen
	this.bounds = function(){
		if(this.x > width-this.diameter/2){
			this.x = width -this.diameter/2;
		}
		if(this.x < 0 + this.diameter/2){
			this.x = 0 + this.diameter/2;
		}
		if(this.y < 0 + this.diameter/2){
			this.y = 0 + this.diameter/2
		}
		if(this.y > height-this.diameter/2){
			this.y = height - this.diameter/2
		}
	}
	//Player controls
	this.move = function(){
		if (keyIsDown(_W))
			this.y -= this.speed;
	    if (keyIsDown(_A))
	      	this.x -= this.speed;
	    if (keyIsDown(_D))
	      	this.x += this.speed;
	}
	this.platformCollision = function() {
		for(var i = 0;i<platforms.length;i++){
			if((this.x > platforms[i].x && this.x < platforms[i].x + platforms[i].width)){
				if((this.y + this.diameter/2 > platforms[i].y) && this.y + this.diameter/2 < platforms[i].y + platforms[i].height ) {
					this.y = platforms[i].y - this.diameter/2;
					this.vy *= -bounceFactor;
				}
			}
		}
	}
	this.shoot = function(){
		if(keyIsDown(_SPACE)){
			//Control players fire rate
			var now = Date.now();
			if (now - this.lastShootTime  < this.shootRate)  return;
			this.lastShootTime = now;
			bullets.push(new Projectile(this.x+this.diameter/2,this.y))
		}
	}
}


function Projectile(x,y){
	this.x = x;
	this.y = y;
	this.width = 30;
	this.height = 30; 
	//Render bullet on to the screen and depending if it's called by an enemy 
	//or player it will appear differently (ie. blue bullet for player, red bullet for enemy)
	this.display = function(){
		noStroke();
		fill(230,200,150);
		rect(this.x, this.y, this.width, this.height);
	}
	//Bullet movement. Bullet moves up or down depending if it's called by an enemy or player. 
	this.move = function(){
		this.y += 5;
	}
}
function bulletPlayerCollision(rect1,rect2){
	if (rect1.x < rect2.x + rect2.width &&
	   rect1.x + rect1.diameter > rect2.x &&
	   rect1.y < rect2.y + rect2.height &&
	   rect1.diameter + rect1.y > rect2.y) {
	    return true;
	}
}
function playerEnemyCollision(rect1,rect2){
	if (rect1.x < rect2.x + rect2.diameter &&
	   rect1.x + rect1.diameter > rect2.x &&
	   rect1.y < rect2.y + rect2.diameter &&
	   rect1.diameter + rect1.y > rect2.y) {
	    return true;
	}
}



function resolve(){
	if(playerEnemyCollision(player1,player2)){
		gameOver = true;
		gameOverText += 'Game Over, PLAYER1 WINS!'
		document.getElementById("results").innerHTML = gameOverText
	}
	if(int(timer) == 60){
		gameOver = true;
		gameOverText += 'Game Over, time, PLAYER2 WINS!'
		document.getElementById("results").innerHTML = gameOverText
	}
	if(player2.y > platforms[0].y + 30){
		gameOver = true;
		gameOverText += 'Game Over, player 2 fell, PLAYER1 WINS!'
		document.getElementById("results").innerHTML = gameOverText
	}
	for(var i=0;i<bullets.length; i++){
		if(bulletPlayerCollision(player1,bullets[i]) && player1.shieldOn == false){
			bullets.splice(i,1)
			gameOver = true;
			gameOverText += 'Game Over, HIT, PLAYER2 WINS!'
			document.getElementById("results").innerHTML = gameOverText
			break;
		}
	}
}