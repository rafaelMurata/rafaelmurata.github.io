// Define variables.
var radius = 15;
var widthScreen=600;
var heightScreen = 500;
var w;
var h;

let nodes = [];
// Set up canvas.
function setup() {
  // Create canvas using width/height of window.
   var canvas =createCanvas(widthScreen, heightScreen);
   canvas.parent('canvas');
   ellipseMode(RADIUS);
   w = width-20;
   h = height-20;
	
	 if (nodes.length == 0) {
		var tasksNumber = $('#tasksNumber option:selected').val();
		var sum = 50;

		for (var i = 0; i < tasksNumber; i++) {
			let node = new Node(0+sum, 250);
			nodes.push(node);
			node.show();
			sum=sum + 50;
		}
	}
}

// Draw on the canvas.
function draw() {
	background(128);
	strokeWeight(5);
	stroke(0);
	fill(255);
	translate(10,10);
	noFill();
	rectMode(CENTER);
	rect(w/2,h/2,w,h/3.0);
	rect(w/2,h/2,w,h);
	
	for (let i = 0; i < nodes.length; i++) {
	    nodes[i].show();
	  }
	if(btnStartIsPress){
		document.getElementById('start-search-btn').click() ; 
	}
}

function changeTaskNumber(){
	nodes=[];
	setup();
	draw();
}

// Run when the mouse/touch is down.
function mousePressed(e) {
	if (mouseX<600 & mouseY<500) {
		for (var i = 0; i < nodes.length; i++) {
		    nodes[i].clicked(mouseX, mouseY);
		    nodes[i].show();
		  }
	}else{
		return;
	}
  // Prevent default functionality.
  return false;
}


// Run when the mouse/touch is dragging.
function mouseDragged() {
	if (mouseX<600 & mouseY<500) {
		for (var i = 0; i < nodes.length; i++) {
		    nodes[i].dragged(this,mouseX, mouseY);
		    nodes[i].show();
		  }
	}
  // Prevent default functionality.
  return false;
}

function clearElements(){
	location.reload();
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
function draw_startEnd(){
	tasks.push(createVector(300, 30));

    tasks.push(createVector(300, 480));

	for (var i = 0; i < tasks.length; i++) {
	    ellipse(tasks[i].x, tasks[i].y, radius, radius);
	  }

	$("#draw-circle").prop('disabled',true);
}

function enableTableMode(){
	var optionMode = $('#erp-mode option:selected').val();

	if(optionMode=='free'){
		$("#configMode").css("visibility","hidden");
	}else{
		$("#configMode").css("visibility","visible");
	}
}
