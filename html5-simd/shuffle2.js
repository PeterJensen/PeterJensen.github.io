// Author: Peter Jensen
var shuffle = function () {

  // globals
  var svg;
  
  var testDiagram = {
    dimensions: [200, 200],
    objects: [ 
      {type: "box", boxStyle: "box", text: "0", textStyle: "boxText",
       pos: [10, 10], size: [10, 10],
       next: {pos: [110, 10], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "1", textStyle: "boxText",
       pos: [20, 10], size: [10, 10],
       next: {pos: [110, 20], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "2", textStyle: "boxText",
       pos: [30, 10], size: [10, 10],
       next: {pos: [110, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "3", textStyle: "boxText",
       pos: [40, 10], size: [10, 10],
       next: {pos: [110, 40], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "4", textStyle: "boxText",
       pos: [10, 20], size: [10, 10],
       next: {pos: [120, 10], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "5", textStyle: "boxText",
       pos: [20, 20], size: [10, 10],
       next: {pos: [120, 20], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "6", textStyle: "boxText",
       pos: [30, 20], size: [10, 10],
       next: {pos: [120, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "7", textStyle: "boxText",
       pos: [40, 20], size: [10, 10],
       next: {pos: [120, 40], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "8", textStyle: "boxText",
       pos: [10, 30], size: [10, 10],
       next: {pos: [130, 10], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "9", textStyle: "boxText",
       pos: [20, 30], size: [10, 10],
       next: {pos: [130, 20], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "10", textStyle: "boxText",
       pos: [30, 30], size: [10, 10],
       next: {pos: [130, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "11", textStyle: "boxText",
       pos: [40, 30], size: [10, 10],
       next: {pos: [130, 40], clone: "true", rotate: 90}},
      {type: "box", boxStyle: "box", text: "12", textStyle: "boxText",
       pos: [10, 40], size: [10, 10],
       next: {pos: [140, 10], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "13", textStyle: "boxText",
       pos: [20, 40], size: [10, 10],
       next: {pos: [140, 20], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "14", textStyle: "boxText",
       pos: [30, 40], size: [10, 10],
       next: {pos: [140, 30], clone: "true", rotate: 360}},
      {type: "box", boxStyle: "box", text: "15", textStyle: "boxText",
       pos: [40, 40], size: [10, 10],
       next: {pos: [140, 40], clone: "true", rotate: 360}},
    ]
  }

  function clone(elem) {
    var node = elem.node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  function createBoxBase(obj, appendTo) {
    var box   = appendTo.append("g");
    var rect = box.append("rect")
                .attr("width", obj.size[0])
                .attr("height", obj.size[1])
                .attr("class", obj.boxStyle);
    if (typeof obj.text !== "undefined") {
      box.append("text")
        .attr("x", obj.size[0]/2)
        .attr("y", obj.size[1]/2)
        .attr("width", obj.size[0])
        .attr("height", obj.size[1])
        .attr("class", obj.textStyle)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(obj.text);
    }
    return box;
  }
  
  function addBox(obj) {
    var box = createBoxBase(obj, svg).attr("transform", "translate(" + obj.pos[0] + "," + obj.pos[1] + ")");
    if (typeof obj.next !== "undefined") {
      var outerBox = svg.append("g").attr("transform", "translate(" + obj.pos[0] + "," + obj.pos[1] + ")");
      var innerBox = createBoxBase(obj, outerBox);
      if (typeof obj.next.rotate !== "undefined") {
        innerBox.transition().duration(2000).attr("transform", "rotate(" + obj.next.rotate + "," + obj.size[0]/2 + "," + obj.size[1]/2 + ")");
      }
      if (typeof obj.next.pos !== "undefined") {
        outerBox.transition().duration(2000).attr("transform", "translate(" + obj.next.pos[0] + "," + obj.next.pos[1] + ")");
      }
    }
  }

  function addObject(obj) {
    switch (obj.type) {
      case "box":
        addBox(obj);
        break;
    }
  }
  
  function createDiagram(svgContainer, diagram) {
    if (typeof diagram === "undefined")  {
      diagram = testDiagram;
    }
    
    var d3SvgContainer = d3.select(svgContainer);

    var diagramDimension = [200, 200];
    
    var state    = 0;
    var maxState = 3;

    var diagramNodes = [
      {type: "box", cx:100,  cy:10, x: 100, y: 100, w: 40, h: 10, state:0},
      {type: "box", cx:130,  cy:40,  x: 100, y: 100, w: 40, h: 10, state:1},
      {type: "box", cx:70,   cy:40,  x: 100, y: 100, w: 40, h: 10, state:1},
      {type: "box", cx:40,   cy:70,  x: 100, y: 100, w: 40, h: 10, state:2},
      {type: "box", cx:100,  cy:70,  x: 100, y: 100, w: 40, h: 10, state:3}];
    
    var diagramLinks = [
      {type: "link", source: diagramNodes[0], target: diagramNodes[1]},
      {type: "link", source: diagramNodes[0], target: diagramNodes[2]},
      {type: "link", source: diagramNodes[2], target: diagramNodes[3]},
      {type: "link", source: diagramNodes[2], target: diagramNodes[4]}];

    var force = d3.layout.force()
                  .nodes(diagramNodes)
//                  .links(diagramLinks)
                  .size(diagramDimension)
                  .gravity(0)
                  .charge(0)
//                  .linkDistance(50)
//                  .charge(-300)
//                  .gravity(1)
                  .on("tick", tick).start();

    // create the svg element
    svg = d3SvgContainer
            .append("svg")
            .attr("width", d3SvgContainer.style("width"))
            .attr("height", d3SvgContainer.style("height"))
            .attr("viewBox", "0 0 " + diagramDimension[0] + " " + diagramDimension[1]);

    function posTranslate(d) {
      console.log(d.index + ":" + d.x + "," + d.y);
      return "translate(" + (d.x - d.w/2) + "," + (d.y - d.h/2) + ")";
    }
    function sizeWidth(d) {
      return d.w;
    }
    function sizeHeight(d) {
      return d.h;
    }

    var svgNodes = svg.selectAll("g").data(diagramNodes)
      .enter()
        .append("g")
        .attr("transform", posTranslate)
        .attr("class", function (d) { return (d.state <= state) ? "visible" : "invisible"; })
        .call(force.drag)
        .on("mousedown", function() { d3.event.stopPropagation(); });
    svgNodes
        .append("rect")
          .attr("width", sizeWidth)
          .attr("height", sizeHeight)
          .attr("class", "box");

    var svgLinks = svg.selectAll("line").data(diagramLinks)
      .enter()
        .append("line")
          .attr("x1", function(d) { return d.source.cx;})
          .attr("y1", function(d) { return d.source.cy + d.source.h/2;})
          .attr("x2", function(d) { return d.target.cx;})
          .attr("y2", function(d) { return d.target.cy - d.source.h/2;})
          .classed("invisible", function(d) { return d.target.state > state || d.source.state > state;})
          .classed("visible", function(d) { return d.target.state <= state && d.source.state <= state;})
          .classed("box", true);

    function gravity(alpha) {
      return function(d) {
        d.x += (d.cx - d.x) * alpha;
        d.y += (d.cy - d.y) * alpha;
      };
    }

    function updateLinks() {
      svgLinks
        .attr("x1", function(d) { return d.source.x;})
        .attr("y1", function(d) { return d.source.y + d.source.h/2;})
        .attr("x2", function(d) { return d.target.x;})
        .attr("y2", function(d) { return d.target.y - d.source.h/2;})
    }

    function tick(e) {
      svgNodes
        .each(gravity(0.3*e.alpha))
        .attr("transform", posTranslate);
      updateLinks();
    }
    
    function click(e) {
      state = (state >= maxState) ? 0 : state+1;
      svgNodes
        .classed("invisible", function(d) { return d.state > state;})
        .classed("visible", function(d) { return d.state <= state;})
        .each(function (d) { if (d.state === state) { d.x += 0; d.y += 10; }})
        .attr("transform", posTranslate);
      svgLinks
        .classed("invisible", function(d) { return d.target.state > state || d.source.state > state;})
        .classed("visible", function(d) { return d.target.state <= state && d.source.state <= state;});
      updateLinks();
      force.resume();
    }

    d3SvgContainer.on("mousedown", click);
    
//    for (var o in diagram.objects) {
//      addObject(diagram.objects[o]);
//    }
  }

  return {
    createDiagram: createDiagram
  }

}();