function Obstacle(x, y) {
	this.x = x;
	this.y = y;
	this.size = 50;
	this.gold = Math.random() >= 0.5;

	this.show = function() {
		stroke(255);
		strokeWeight(3);
		if(!this.gold) noFill();
		else {
			fill('gold');
		}
		rectMode(CENTER);
		rect(this.x, this.y, this.size, this.size);
	}
}