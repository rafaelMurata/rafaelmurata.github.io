class AntColony {
  constructor(colony_size,alphaColony,betaColoy,evaporation,pheromone_d,maxi,min_scalar) {
    this.graph = new Graph();
    this.colony = [];
    // Set default params
    this.colonySize = colony_size;
    this.alpha = alphaColony; //pheromone importance
    this.beta = betaColoy; //distance priority
    this.evaporation = evaporation; //evaporation
    this.q = pheromone_d; //total amount of pheromone
    this.initPheromone = this.q;
    this.maxIterations = maxi;
    this.minScalingFactor = min_scalar;
    this.iteration = 0;

    this.bestRoute = null;
    this.globalBest = null;

    this.createGraphAndCitys();

  }

  createAnts() {
    this.colony = [];
        for (var i = 0; i < this.colonySize; i++) {
            this.colony.push(new Ant( i, this.graph,this.alpha,this.beta,this.q));
        }
  };
  
  createGraphAndCitys(){
      for (var i =  0 ; i < nodes.length; i ++) {
           this.graph.nodes.push(new Node(nodes[i].x,nodes[i].y));
      }
      this.graph.generateNodesEdges();
  };
  
  reset () {
      this.iteration = 0;
      this.globalBest = null;
      this.resetAnts();
      this.setInitialPheromone(this.initPheromone);
      this.graph.resetPheromone();
  };

  setInitialPheromone() {
      var edges = this.graph.getEdges;
      for (var edgeIndex in edges) {
          edges[edgeIndex].setInitialPheromone(this.initPheromone);
      }
  };

  ready () {
      if (this.graph.getnodesSize <= 1) {
          return false;
      }
      return true;
  };

  run () {
    var _this = this;

    _this.iteration = 0;
    _this.iteration =setInterval(function(){
       _this.maxIterations--
       _this.prepare();
       if(_this.maxIterations===0){
          clearInterval(_this.iteration);
          _this.drawBestTour();
        }
    }, 50);
  };

  prepare () {
    this.moveAnts();
    this.updateTrails();
    this.getGlobalBest();
  };

  moveAnts(){
  
     for (var antIndex in this.colony) {
        this.colony[antIndex].run();
    }
  };

  drawBestTour() {
      var bestAnt = this.getGlobalBest();
      var bestTour = bestAnt.getTour;

      for (var i = 0; i < bestTour.size() -1; i++) {
          stroke(255, 0, 255);
          strokeWeight(4);
          noFill();
          beginShape();
          line(bestTour.getTour(i).x, bestTour.getTour(i).y,bestTour.getTour(i+1).x,bestTour.getTour(i+1).y);
          endShape();
      }
  };

  getGlobalBest() {
      var bestAnt = this.getBestRoute();

      if (this.globalBest == null || this.globalBest.getTour.tourDistance >= bestAnt.getTour.tourDistance) {
          this.globalBest = bestAnt;
      }  

    return this.globalBest;
  };

  getBestRoute() {

      if (this.bestRoute == null) {
          var best = this.colony[0];

          for (var antIndex in this.colony) {
              if (best.getTour.tourDistance >= this.colony[antIndex].getTour.tourDistance ){
                  this.bestRoute = this.colony[antIndex];
              }
          }
      }
    return this.bestRoute;
  };

  updateTrails() {
        var edges = this.graph.getEdges;
        for (var edgeIndex in edges) {
            var pheromone = edges[edgeIndex].getPheromone();
            edges[edgeIndex].setPheromone(pheromone * ( this.evaporation));
        }
        for (var antIndex in this.colony) {
            this.colony[antIndex].addTrailsPheromone();
        }
        
  };

  resetAnts() {
      this.createAnts();
      this.bestRoute = null;
  };
}

class Graph {

  constructor(){
    this.nodes = [];
    this.edges = {};
  }

  generateNodesEdges(){
    this.edges = {};
    for (var i = 0; i < this.nodes.length; i++) {
        for (var j = i; j < this.nodes.length; j++) {
            this.addEdge(this.nodes[i], this.nodes[j]);
        }
    }
  };
  
  addEdge(node1, node2) {
    this.edges[node1 + '-' + node2] = new Edge(node1, node2);
  };
  
  resetPheromone () {
    for (var edgeIndex in this.edges) {
        this.edges[edgeIndex].resetPheromone();
    }
  };
  
  getEdge (node1, node2) {
    return this.edges[node1 + '-' + node2];
  };

  get getEdges() { 
    return this.edges; 
  };

  get getnodesSize() {
      return this.nodes.length;
  };

  getNode (index) {
      return this.nodes[index];
  };

  get getNodes() {
      return this.nodes;
  };

  size() {
      return this.nodes.length;
  };
    
}

class Edge {
  constructor(node1, node2){
    this.node1 = node1;
    this.node2 = node2;
    this.initPheromone = 1;
    this.pheromone = this.initPheromone;
    this.distance = this.distanceNodes(node1,node2);
  }

   distanceNodes(node1,node2) {
    return dist(node1.x, node1.y, node2.x, node2.y);
  };

  setInitialPheromone (pheromone) {
        this.initPheromone = pheromone;
  };
  setPheromone () {
        this.pheromone = this.initPheromone;
  };
  resetPheromone() {
        this.pheromone = this.initPheromone;
  };
  getPheromone() { 
    return this.pheromone; 
  };
  getDistance() { 
    return this.distance; 
  };

}

class Tour {
  constructor(graph) {
    this.graph = graph;
    this.tour = [];
    this.distance = null;
  }

  toString () {
      return this.x + ',' + this.y;
  };

  size() { 
    return this.tour.length; 
  };

  addCity (city) {
        this.distance = null;
        this.tour.push(city);
  };

  getTour(tourIndex) {
        return this.tour[tourIndex];
  };

  contains(city) {
      for (var tourIndex in this.tour) {
          if (city.isEqual(this.tour[tourIndex])) {
              return true;
          }
      }
    return false;
  };
    
  get tourDistance() {
    if (this.distance == null) {
        let distance = 0.0;

        for (var i = 0; i < this.tour.length-1; i++) {
              var edge = this.graph.getEdge(this.tour[i + 1], this.tour[i+1]);
              distance += edge.getDistance();
        }
        
      this.distance = distance;
      }
    return this.distance;
  };

}

class Ant {
  constructor(id, graph, alpha,beta,q){
      this.antID = id;
      this.graph = graph;
      this.alpha = alpha;
      this.beta = beta;
      this.q = q;
      this.tour = null;
  }

  run () {
      this.reset();
      while (!this.checkTour()) {
          this.visitNextNode();
      }
  };

  init () {
      this.tour = new Tour(this.graph);
      var randCityIndex = Math.floor(Math.random() * this.graph.getnodesSize);
      this.currentCity = this.graph.getNode(randCityIndex);
      this.tour.addCity(this.currentCity);
  };

  reset() {
      this.tour = null;
  };

  visitNextNode() {
      if (this.tour == null) {
          this.init();
      }

      var nodes = this.graph.getNodes;

      let cityProbabilities = [];
      cityProbabilities = this.calculateProbabilities(nodes,cityProbabilities);

      this.updateCities(nodes,cityProbabilities);
     
  };

  updateCities(nodes,cityProbabilities){
    var r = Math.random();
    var total = 0.0;
    for (var cityIndex in nodes) {
        if (!this.tour.contains(nodes[cityIndex])) {
            total += cityProbabilities[cityIndex];
            if (total >= r) {
                this.currentCity = nodes[cityIndex];
                this.tour.addCity(nodes[cityIndex]);
                return;
            }
        }
    }
  };

  calculateProbabilities(nodes,cityProbabilities){
      for (var cityIndex in nodes) {
        if (!this.tour.contains(nodes[cityIndex])) {
            var edge = this.graph.getEdge(this.currentCity, nodes[cityIndex]);
            if (this.alpha == 1) {
                var finalPheromoneWeight = edge.getPheromone();
            } else {
                var finalPheromoneWeight = Math.pow(edge.getPheromone(), this.alpha);
            }
            cityProbabilities[cityIndex] = finalPheromoneWeight * Math.pow(1.0 / edge.getDistance(), this.beta);
        }
      }
    return cityProbabilities;
  };

  addTrailsPheromone(contribution) {
    var fromCity ;
    var toCity ;

      if (contribution == undefined) {
          contribution = 1;
      }

      var extraPheromone = (this.q * contribution) / this.tour.tourDistance;
      for (var i = 0; i < this.tour.size()-1; i++) {
        fromCity = this.tour.getTour(i);
        toCity = this.tour.getTour(i+1);
        var edge = this.graph.getEdge(fromCity, toCity);
        var pheromone = edge.getPheromone();
        edge.setPheromone(pheromone + extraPheromone);   
        this.drawAntJourney(fromCity.x,fromCity.y,toCity.x,toCity.y);
      }
  };

  drawAntJourney(fromCityX,fromCityY,toCityX,toCityY,){
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    line(fromCityX, fromCityY,toCityX,toCityY);
    endShape();
  };

  checkTour() {
      if (this.tour == null) {
          return false;
      }
    return (this.tour.size() >= this.graph.size());
  };

  get getTour() {
      return this.tour;
  };
}