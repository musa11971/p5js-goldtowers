function Bird(x, y) {
	this.originalx = x;
	this.originaly = y;
	this.x = x;
	this.y = y;
	this.xspeed = 0;
	this.yspeed = 0;
	this.speed = 5;
	this.size = 20;
	this.shooting = false;

	this.show = function() {
		fill(255);
		noStroke();
		ellipseMode(CENTER);
		ellipse(this.x, this.y, this.size);
	}

	this.aim = function() {
		stroke('red');
		strokeWeight(1);
		line(bird.x, bird.y, mouseX, mouseY);
	}

	this.update = function() {
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	this.setAngle = function(ang) {
		this.angle = ang;
		this.xspeed = this.speed * cos(this.angle);
		this.yspeed = this.speed * sin(this.angle);
	}

	this.shoot = function(pointx, pointy) {
		this.shooting = true;
		var	dx = this.x - pointx,
		dy = this.y - pointy;
	
		var new_ang = Math.atan2(dy, dx);
		this.setAngle(new_ang);
	}

	this.reset = function() {
		this.angle = 0;
		this.xspeed = 0;
		this.yspeed = 0;
		this.shooting = false;
		this.x = this.originalx;
		this.y = this.originaly;
	}
}