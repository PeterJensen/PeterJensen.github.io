// Author: Peter Jensen
var shuffle = function () {

  // globals
  var svg;
  var nodes;
  var nexts;
  
  var testDiagram = {
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
      var outerBox = svg.append("g").attr("transform", "translate(" + obj.pos[0] + "," + obj.pos[1] + ")").attr("class", "clone");
      var innerBox = createBoxBase(obj, outerBox);
//      if (typeof obj.next.rotate !== "undefined") {
//        var t1 = innerBox.transition().duration(1000).attr("transform", "rotate(" + (obj.next.rotate/2) + "," + obj.size[0]/2 + "," + obj.size[1]/2 + ")");
//        t1.transition().duration(1000).attr("transform", "rotate(" + obj.next.rotate + "," + obj.size[0]/2 + "," + obj.size[1]/2 + ")");
//      }
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

  function createDiagram(svgContainer, diagram) {
    if (typeof diagram === "undefined")  {
      diagram = testDiagram;
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
    nexts = svg.selectAll("g.next").data(diagram.objects)
              .enter()
              .append("g")
                .attr("class", "next")
                .attr("transform", translateString);
    addRectsAndText(nodes);
    addRectsAndText(nexts);
  }

  function startTransition() {
    nexts.transition().duration(2000).attr("transform", translateNextString);
  }

  return {
    createDiagram: createDiagram,
    startTransition: startTransition
  }

}();