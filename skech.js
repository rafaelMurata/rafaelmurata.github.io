let nodes = [];
var radius = 15;
var totaltasks ;

function setup() {
  var canvas =createCanvas(600, 500);
  canvas.parent('canvas');
  noLoop(); 
}

function draw() {
  background(0);
  fill(255);
}
function generateRandomPoints(){
  draw();
  var maxt = random(radius);

  let tsp = new TSPSolution();
  tsp.generateRandom(maxt);
}
// Start it up
function mousePressed() {
  if(mouseX<600 & mouseY<500){
    nodes.push( createVector(mouseX, mouseY));
    ellipse(mouseX, mouseY, radius, radius);
    if(nodes.length>= 2 ){
        stroke(255);
        strokeWeight(1);
        noFill();
        beginShape();
        for (var i = 0; i < nodes.length; i++) {
          vertex(nodes[i].x, nodes[i].y) ;
        }
    endShape(CLOSE);
    }
  }
}
function clearElements(){
  draw();
  nodes=[];
}
function enableTable(){
  var optionMode = $('#aco-mode option:selected').val();

  if(optionMode=='aco'){
    $("#acoTable").css("visibility","visible");
    $("#tspTable").css("visibility","hidden");
  }else{
    $("#tspTable").css("visibility","visible");
    $("#acoTable").css("visibility","hidden");
  }
}
function run(){
  var maxi = $('#max-iterations option:selected').val();

  let tsp = new TSPSolution();
  var d = tsp.distanceNodes(nodes);
  
  recordDistance = d;
  bestEver = nodes.slice();

    var intervalID =setInterval(function(){
        maxi--
      tsp.drawVertex()
      tsp.drawBest();

        var i = floor(random(nodes.length));
        var j = floor(random(nodes.length));

        tsp.swap(nodes, i, j);

        var d = tsp.distanceNodes(nodes);
        if (d < recordDistance) {
          recordDistance = d;
          bestEver = nodes.slice();
        }
       if(maxi===0){
            clearInterval(intervalID);
            draw();
          tsp.drawCorrectElements();
      }
    }, 50);  
   
}
