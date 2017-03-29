var bird;
var obstacles = [];
var score = 0;
var ammo = 1;
var totalobs = 0;

function setup() {
	createCanvas(900, 600);

	// Create bird
	bird = new Bird(0.20 * width, height/2);

	// Create pilars
	createPilar(10, 0.90 * width);
	createPilar(8, 0.80 * width);
	createPilar(6, 0.70 * width);
	createPilar(4, 0.60 * width);
}

function createPilar(count, x) {
	var counter = 0;
	for(var i = 0; i < count; i++) {
		var obs = new Obstacle(x, 0);
		var y;

		if(counter) y = height - (counter * obs.size) - obs.size/2;
		else y = height - obs.size/2;
		obs.y = y;

		obstacles.push(obs);
		totalobs++;
		counter++;
	}
}

function draw() {
	background(51);

	// Show obstacles
	for(var i = obstacles.length-1; i >= 0; i--) {
		obstacles[i].show();
	}

	// Show bird & aim laser
	bird.update();
	if(!gameOver() && !win()) bird.show();
	if(!bird.shooting && !gameOver() && !win()) bird.aim();

	// Draw score
	textAlign(CENTER);
	fill(255);
	textSize(32);
	stroke(255);
	strokeWeight(3);
	text(score + "/" + totalobs, width/2, 50);

	// Draw ammo
	text(ammo + " ammo", width/2, 82);

	// Draw game over
	if(gameOver()) {
		fill('red');
		stroke('red');
		text("Game Over", width/2, 144);
		textSize(25);
		noStroke();
		fill(255);
		text("[space] to reset", width/2, 169);
	}

	// Draw win screen
	if(win()) {
		fill('lime');
		stroke('lime');
		text("You win!", width/2, 144);
		textSize(25);
		noStroke();
		fill(255);
		text("[space] to reset", width/2, 169);
	}

	// Bird collisions obstacles
	for(var i = obstacles.length-1; i >= 0; i--) {
		var ob = obstacles[i];
		if(bird.x + bird.size/2 > ob.x - ob.size/2 && bird.x - bird.size/2 < ob.x + ob.size/2) {
			if(bird.y - bird.size/2 < ob.y + ob.size/2 && bird.y + bird.size/2 > ob.y - ob.size/2) {
				if(ob.gold) ammo += 2;
				obstacles.splice(i, 1);
				score++;
				bird.reset();
			}
		}
	}

	// Bird collisions out of canvas
	if(bird.x < 0 || bird.x > width || bird.y < 0 || bird.y > height) {
		bird.reset();
	}
}

function gameOver() {
	if(!bird.shooting && !ammo && obstacles.length) return true;
	else return false;
}

function win() {
	if(!bird.shooting && !obstacles.length && !gameOver()) return true;
	else return false;
}

function keyPressed(){
	if(keyCode == 32 && (gameOver() || win())) {
		location.reload();
	}
}

function mouseClicked() {
	if(!gameOver() && !bird.shooting && ammo && !win()) {
		bird.shoot(mouseX, mouseY);
		ammo--;
	}
}