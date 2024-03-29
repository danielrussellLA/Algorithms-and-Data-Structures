var DWGraph = require('./directed-weighted-graph');
var PriorityQueue = require('../Queue/priority_queue.js');

// This algorithm takes in a two node names (as strings)
// This algorithm should return an array listing the nodes
// you must traverse in order to get from the source to the target
// node in the shortest path regime

// This is a method on a directed-weighted-graph

DWGraph.prototype.init = function(source) {
  var node, PQ = new PriorityQueue(), INFINITY=1/0, distances = {};
  for (node in this.nodes) {
    PQ.enqueue( node, INFINITY );
  };
  PQ.updatePriority(source, 0);
  return [PQ, distances];
};

DWGraph.prototype.djikstra = function(source) {
  var index, visited=[], min, PQ = this.init(source)[0], distances = this.init(source)[1];

  while (!PQ.isEmpty()) {
    min = PQ.dequeue();
    visited.push(min.value);
    distances[min.value] = min.priority;

  this.nodes[min.value].edges.forEach(function(value) {
    if (visited.indexOf(value[0]) === -1) {
      PQ.updatePriority( value[0], min.priority + value[1] )
    }
  });
}
return distances;
};

dwg = new DWGraph();

dwg.addNode('A');
dwg.addNode('B');
dwg.addNode('C');
dwg.addNode('D');
dwg.addNode('E');
dwg.addNode('F');

dwg.addEdge('A','B',2);
dwg.addEdge('A','D',4);
dwg.addEdge('B','E',9);
dwg.addEdge('E','F',7);
dwg.addEdge('F','D',9);
dwg.addEdge('D','C',2);
dwg.addEdge('C','A',6);
dwg.addEdge('C','B',1);
dwg.addEdge('C','E',2);
dwg.addEdge('C','F',1);

console.log('D:',dwg.djikstra('D'));
console.log('E:',dwg.djikstra('E'));
console.log('F:',dwg.djikstra('F'));


module.exports = DWGraph;
