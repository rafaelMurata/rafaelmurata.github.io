class TSPSolution {

  constructor(maxi){
    this.maxi = maxi;
    this.d;
    this.recordDistance;
    this.bestEver;
  }

  runTSP(){
    var _this = this;
    var   d = _this.distanceNodes(nodes);
      _this.recordDistance = d;
      _this.bestEver = nodes.slice();

        var intervalID =setInterval(function(){
           _this.maxi--
          _this.drawVertex()
          _this.drawBest();

            var i = floor(random(nodes.length));
            var j = floor(random(nodes.length));

            _this.swap(nodes, i, j);

            var d = _this.distanceNodes(nodes);
            if (d < _this.recordDistance) {
              _this.recordDistance = d;
              _this.bestEver = nodes.slice();
            }
           if(_this.maxi===0){
              clearInterval(intervalID);         
          }
        }, 50); 
  };

  distanceNodes(points) {
	  var sum = 0;
	  for (var i = 0; i < points.length - 1; i++) {
	    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
	    sum += d;
	  }
	  return sum;
  };

  drawVertex(){
  	stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < nodes.length; i++) {
      vertex(nodes[i].x, nodes[i].y);
    }
  	endShape();
	};

  drawBest(){
    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < nodes.length; i++) {
      vertex(this.bestEver[i].x, this.bestEver[i].y);
    }
    endShape();
  };

 swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  };

	drawCorrectElements(){
   stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < nodes.length; i++) {
      vertex(this.bestEver[i].x, this.bestEver[i].y);
    }
    endShape();
  };

  generateRandom(maxt){
    for (var i = 0; i < maxt; i++) {
      var v = createVector(random(width), random(height));
      nodes[i] = v;
    }
     for (var i = 0; i < nodes.length; i++) {
      ellipse(nodes[i].x, nodes[i].y, radius, radius);
    }
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < nodes.length; i++) {
      vertex(nodes[i].x, nodes[i].y);
    }
    endShape(CLOSE);
  };
}