// Author: Peter Jensen
var shuffle = function () {

  // globals
  var svg;
  var nodes;
  var nexts;
  
  var diagrams = [{
    dimensions: [200, 100],
    objects: [ 
      {type: "box", boxStyle: "box", text: "0", textStyle: "boxText",
       pos: [80, 10], size: [10, 10],
       next: {pos: [5, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "1", textStyle: "boxText",
       pos: [90, 10], size: [10, 10],
       next: {pos: [15, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "2", textStyle: "boxText",
       pos: [100, 10], size: [10, 10],
       next: {pos: [25, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "3", textStyle: "boxText",
       pos: [110, 10], size: [10, 10],
       next: {pos: [35, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "4", textStyle: "boxText",
       pos: [80, 20], size: [10, 10],
       next: {pos: [55, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "5", textStyle: "boxText",
       pos: [90, 20], size: [10, 10],
       next: {pos: [65, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "6", textStyle: "boxText",
       pos: [100, 20], size: [10, 10],
       next: {pos: [75, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "7", textStyle: "boxText",
       pos: [110, 20], size: [10, 10],
       next: {pos: [85, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "8", textStyle: "boxText",
       pos: [80, 30], size: [10, 10],
       next: {pos: [105, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "9", textStyle: "boxText",
       pos: [90, 30], size: [10, 10],
       next: {pos: [115, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "10", textStyle: "boxText",
       pos: [100, 30], size: [10, 10],
       next: {pos: [125, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "11", textStyle: "boxText",
       pos: [110, 30], size: [10, 10],
       next: {pos: [135, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "12", textStyle: "boxText",
       pos: [80, 40], size: [10, 10],
       next: {pos: [155, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "13", textStyle: "boxText",
       pos: [90, 40], size: [10, 10],
       next: {pos: [165, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "14", textStyle: "boxText",
       pos: [100, 40], size: [10, 10],
       next: {pos: [175, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "15", textStyle: "boxText",
       pos: [110, 40], size: [10, 10],
       next: {pos: [185, 60], clone: "true", rotate: 360}},
    ]
  },
  {
    dimensions: [200, 100],
    objects: [ 
      {type: "box", boxStyle: "box", text: "0", textStyle: "boxText",
       pos: [5, 10], size: [10, 10],
       next: {pos: [30, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "1", textStyle: "boxText",
       pos: [15, 10], size: [10, 10],
       next: {pos: [40, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "2", textStyle: "boxText",
       pos: [25, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "3", textStyle: "boxText",
       pos: [35, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "4", textStyle: "boxText",
       pos: [55, 10], size: [10, 10],
       next: {pos: [50, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "5", textStyle: "boxText",
       pos: [65, 10], size: [10, 10],
       next: {pos: [60, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "6", textStyle: "boxText",
       pos: [75, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "7", textStyle: "boxText",
       pos: [85, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "8", textStyle: "boxText",
       pos: [105, 10], size: [10, 10],
       next: {pos: [130, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "9", textStyle: "boxText",
       pos: [115, 10], size: [10, 10],
       next: {pos: [140, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "10", textStyle: "boxText",
       pos: [125, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "11", textStyle: "boxText",
       pos: [135, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "12", textStyle: "boxText",
       pos: [155, 10], size: [10, 10],
       next: {pos: [150, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "13", textStyle: "boxText",
       pos: [165, 10], size: [10, 10],
       next: {pos: [160, 40], arrow: true}},
      {type: "box", boxStyle: "box", text: "14", textStyle: "boxText",
       pos: [175, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "15", textStyle: "boxText",
       pos: [185, 10], size: [10, 10]}
    ]
  },
  {
    dimensions: [200, 100],
    objects: [ 
      {type: "box", boxStyle: "box", text: "0", textStyle: "boxText",
       pos: [5, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "1", textStyle: "boxText",
       pos: [15, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "2", textStyle: "boxText",
       pos: [25, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "3", textStyle: "boxText",
       pos: [35, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "4", textStyle: "boxText",
       pos: [55, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "5", textStyle: "boxText",
       pos: [65, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "6", textStyle: "boxText",
       pos: [75, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "7", textStyle: "boxText",
       pos: [85, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "8", textStyle: "boxText",
       pos: [105, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "9", textStyle: "boxText",
       pos: [115, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "10", textStyle: "boxText",
       pos: [125, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "11", textStyle: "boxText",
       pos: [135, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "12", textStyle: "boxText",
       pos: [155, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "13", textStyle: "boxText",
       pos: [165, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "14", textStyle: "boxText",
       pos: [175, 10], size: [10, 10]},
      {type: "box", boxStyle: "box", text: "15", textStyle: "boxText",
       pos: [185, 10], size: [10, 10]},

      {type: "box", boxStyle: "box", text: "0", textStyle: "boxText",
       pos: [30, 40], size: [10, 10],
       next: {pos: [55, 70], arrow:true}},
      {type: "box", boxStyle: "box", text: "1", textStyle: "boxText",
       pos: [40, 40], size: [10, 10],
       next: {pos: [105, 70]}},
      {type: "box", boxStyle: "box", text: "4", textStyle: "boxText",
       pos: [50, 40], size: [10, 10],
       next: {pos: [65, 70], arrow: true}},
      {type: "box", boxStyle: "box", text: "5", textStyle: "boxText",
       pos: [60, 40], size: [10, 10],
       next: {pos: [115, 70]}},

      {type: "box", boxStyle: "box", text: "8", textStyle: "boxText",
       pos: [130, 40], size: [10, 10],
       next: {pos: [75, 70], arrow: true}},
      {type: "box", boxStyle: "box", text: "9", textStyle: "boxText",
       pos: [140, 40], size: [10, 10],
       next: {pos: [125, 70], arrow: false}},
      {type: "box", boxStyle: "box", text: "12", textStyle: "boxText",
       pos: [150, 40], size: [10, 10],
       next: {pos: [85, 70], arrow: true}},
      {type: "box", boxStyle: "box", text: "13", textStyle: "boxText",
       pos: [160, 40], size: [10, 10],
       next: {pos: [135, 70], arrow: false}}
    ]
  },
  {
    dimensions: [200, 100],
    objects: [ 
      {type: "box", boxStyle: "box", text: "0", textStyle: "boxText",
       pos: [5, 10], size: [10, 10],
       next: {pos: [80, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "4", textStyle: "boxText",
       pos: [15, 10], size: [10, 10],
       next: {pos: [90, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "8", textStyle: "boxText",
       pos: [25, 10], size: [10, 10],
       next: {pos: [100, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "12", textStyle: "boxText",
       pos: [35, 10], size: [10, 10],
       next: {pos: [110, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "1", textStyle: "boxText",
       pos: [55, 10], size: [10, 10],
       next: {pos: [80, 40], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "5", textStyle: "boxText",
       pos: [65, 10], size: [10, 10],
       next: {pos: [90, 40], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "9", textStyle: "boxText",
       pos: [75, 10], size: [10, 10],
       next: {pos: [100, 40], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "13", textStyle: "boxText",
       pos: [85, 10], size: [10, 10],
       next: {pos: [110, 40], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "2", textStyle: "boxText",
       pos: [105, 10], size: [10, 10],
       next: {pos: [80, 50], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "6", textStyle: "boxText",
       pos: [115, 10], size: [10, 10],
       next: {pos: [90, 50], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "10", textStyle: "boxText",
       pos: [125, 10], size: [10, 10],
       next: {pos: [100, 50], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "14", textStyle: "boxText",
       pos: [135, 10], size: [10, 10],
       next: {pos: [110, 50], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "3", textStyle: "boxText",
       pos: [155, 10], size: [10, 10],
       next: {pos: [80, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "7", textStyle: "boxText",
       pos: [165, 10], size: [10, 10],
       next: {pos: [90, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "11", textStyle: "boxText",
       pos: [175, 10], size: [10, 10],
       next: {pos: [100, 60], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "15", textStyle: "boxText",
       pos: [185, 10], size: [10, 10],
       next: {pos: [110, 60], clone: "true", rotate: 360}},
    ]
  }];


  function translateString(d) {
    return "translate(" + d.pos[0] + "," + d.pos[1] + ")";
  }

  function translateNextString(d) {
    return "translate(" + d.next.pos[0] + "," + d.next.pos[1] + ")";
  }

  function addRectsAndText(nodes) {  
    nodes.append("rect")
      .attr("width",  function(d) { return d.size[0]; })
      .attr("height", function(d) { return d.size[1]; })
      .attr("class",  function(d) { return d.boxStyle; });

    // add text
    nodes.append("text")
      .attr("x", function(d) { return d.size[1]/2; })
      .attr("y", function(d) { return d.size[1]/2; })
      .attr("width", function(d) { return d.size[0]; })
      .attr("height", function(d) { return d.size[1]; })
      .attr("class", function(d) { return d.textStyle; })
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text(function (d) { return d.text });
  }

  function addLines(nodes) {
    var lines = svg.selectAll("line")
      .data(nodes.data().filter(function(o) {return typeof o.next.arrow !== "undefined" && o.next.arrow;}))
      .enter()
        .append("line")
        .attr("x1", function(d) {return d.pos[0] + d.size[0]/2;})
        .attr("y1", function(d) {return d.pos[1] + d.size[1];})
        .attr("x2", function(d) {return d.pos[0] + d.size[0]/2;})
        .attr("y2", function(d) {return d.pos[1];})
        .attr("class", function(d) {return d.boxStyle;});
    return lines;
  }

  function createDiagram(svgContainer, diagramIndex) {
    if (typeof diagramIndex === "undefined")  {
      diagram = diagrams[2];
    }
    else {
      diagram = diagrams[diagramIndex];
    }
    
    var d3SvgContainer = d3.select(svgContainer);

    // create the svg element
    svg = d3SvgContainer
            .append("svg")
            .attr("width", d3SvgContainer.style("width"))
            .attr("height", d3SvgContainer.style("height"))
            .attr("viewBox", "0 0 " + diagram.dimensions[0] + " " + diagram.dimensions[1]);

    nodes = svg.selectAll("g").data(diagram.objects) 
              .enter()
              .append("g")
                .attr("transform", translateString);
    nexts = svg.selectAll("g.next").data(diagram.objects.filter(function(o) { return typeof o.next !== "undefined"; }))
              .enter()
              .append("g")
                .attr("class", "next")
                .attr("transform", translateString);
    addRectsAndText(nodes);
    addRectsAndText(nexts);
  }

  function startTransition() {
    var lines = addLines(nexts);
    nexts.transition().duration(2000).attr("transform", translateNextString);
    lines.transition().duration(2000)
      .attr("x2", function(d) {return d.next.pos[0]+d.size[0]/2;})
      .attr("y2", function(d) {return d.next.pos[1];});
  }

  return {
    createDiagram: createDiagram,
    startTransition: startTransition
  }

}();