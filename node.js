
class Node {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = '#fff';
    this.active = false;
  }

  show() {
  	noStroke();
	  fill(this.color);
    ellipse(this.x, this.y, radius,radius);
  };

  drag(){
		this.node.x = mouseX;
		this.node.y = mouseY;
  };

  clicked(mouseX,mouseY){
  	var distance = dist(mouseX, mouseY, this.x, this.y);
  	if (distance < radius) {
        this.active = true;
        this.color = 'green';
      } else {
        this.active = false;
        this.color = '#fff';
      }
  };

  dragged(element,mouseX,mouseY){
		if (this.active) {
			this.x = mouseX;
			this.y = mouseY;
		}
  };

  calcDistance(points) {
	  var sum = 0;
	  for (var i = 0; i < points.length - 1; i++) {
	    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
	    sum += d;
	  }
	  return sum;
  };

  isEqual(node) {
      if (this.x == node.x && this.y == node.y) {
          return true;
      }
      return false;
  };
		
}

