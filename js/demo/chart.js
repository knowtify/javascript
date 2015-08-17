var parseDate = d3.time.format("%d-%b-%Y").parse;

var lineData = [
  [parseDate("1-jan-2013"), 25],
  [parseDate("1-apr-2013"), 30],
  [parseDate("1-may-2013"), 50],
  [parseDate("1-jun-2013"), 60],
  [parseDate("1-dec-2013"), 45]
];

var intermediateLineData = [
  [parseDate("1-jan-2013"), 0],
  [parseDate("1-apr-2013"), 5],
  [parseDate("1-may-2013"), 30],
  [parseDate("1-jun-2013"), 50],
  [parseDate("1-dec-2013"), 5]
];
var area1Data = [
  [parseDate("1-dec-2012"), 0],
  [parseDate("1-jan-2013"), 25],
  [parseDate("1-feb-2013"), 10],
  [parseDate("1-mar-2013"), 17],
  [parseDate("1-apr-2013"), 30],
  [parseDate("1-may-2013"), 25],
  [parseDate("1-jun-2013"), 50],
  [parseDate("1-jul-2013"), 60],
  [parseDate("1-aug-2013"), 50],
  [parseDate("1-sep-2013"), 30],
  [parseDate("1-oct-2013"), 25],
  [parseDate("1-nov-2013"), 45],
  [parseDate("1-dec-2013"), 20],
  [parseDate("1-jan-2014"), 0]
];
var area2Data = [
  [parseDate("1-dec-2012"), 0],
  [parseDate("1-jan-2013"), 10],
  [parseDate("1-feb-2013"), 7],
  [parseDate("1-mar-2013"), 12],
  [parseDate("1-apr-2013"), 25],
  [parseDate("1-may-2013"), 35],
  [parseDate("1-jun-2013"), 25],
  [parseDate("1-jul-2013"), 15],
  [parseDate("1-aug-2013"), 6],
  [parseDate("1-sep-2013"), 9],
  [parseDate("1-oct-2013"), 11],
  [parseDate("1-nov-2013"), 40],
  [parseDate("1-dec-2013"), 30],
  [parseDate("1-jan-2014"), 0]
];


var nullLineData = [
  [parseDate("1-jan-2013"), 0],
  [parseDate("1-apr-2013"), 0],
  [parseDate("1-may-2013"), 0],
  [parseDate("1-jun-2013"), 0],
  [parseDate("1-dec-2013"), 0],
];
var extremeNullData = [
  [parseDate("1-dec-2012"), 0],
  [parseDate("1-jan-2013"), 0],
  [parseDate("1-feb-2013"), 0],
  [parseDate("1-mar-2013"), 0],
  [parseDate("1-apr-2013"), 0],
  [parseDate("1-may-2013"), 0],
  [parseDate("1-jun-2013"), 0],
  [parseDate("1-jul-2013"), 0],
  [parseDate("1-aug-2013"), 0],
  [parseDate("1-sep-2013"), 0],
  [parseDate("1-oct-2013"), 0],
  [parseDate("1-nov-2013"), 0],
  [parseDate("1-dec-2013"), 0],
  [parseDate("1-jan-2014"), 0]
];


// Timing 
var start = 0;
var beginChartIn = start + 800; //After baseline comes in
var finishChartIn = beginChartIn + 1400;
var beginChartOut = finishChartIn + 1500;
var finishChartOut = beginChartOut + 1300; //begin taking baseline out
var finish = finishChartOut + 1500;


var marginBottom = 30;
var width = 800;
var height = 500;
var chartBottom = height - marginBottom;
var chartHeight = chartBottom - 10; // 10 = baseline

var svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height);

// Scaling functions
var xScale = d3.time.scale()
  .range([0, width])
  .domain(d3.extent(area1Data, function(d) { return d[0]; }));
var yScale = d3.scale.linear()
  .range([chartHeight, 0])
  .domain([0, d3.max(area1Data, function(d) { return (d[1]*1.2); /* Pad for elastic easing */ })]);


/* CREATE SVG ELEMENTS */

// Axis
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom").ticks(12)
  .tickFormat(d3.time.format("%b"));
var axisPath = svg.append("g")
  .attr("class", "x axis done")
  .attr("transform", "translate(0," + chartBottom + ")")
  .call(xAxis);

// Pink Area
var area1 = d3.svg.area()
  .x(function(d) { return xScale(d[0]); })
  .y0(chartHeight)
  .y1(function(d) { return yScale(d[1]); });
var area1Path = svg.append("path")
  .attr("class", "area area1");
var area1LineR = svg.append("line")
  .attr("class", "basline area1Baseline rightBaseline");
var area1LineL = svg.append("line")
  .attr("class", "basline area1Baseline leftBaseline");

// Orange Area
var area2 = d3.svg.area()
    .x(function(d) { return xScale(d[0]); })
    .y0(chartHeight)
    .y1(function(d) { return yScale(d[1]); });
var area2Path = svg.append("path")
  .attr("class", "area area2");
var area2LineR = svg.append("line")
  .attr("class", "basline area2Baseline rightBaseline");
var area2LineL = svg.append("line")
  .attr("class", "basline area2Baseline leftBaseline");

// Line Graph
var line = d3.svg.line()
  .x(function(d,i){
    return xScale(d[0]);
  })
  .y(function(d,i){
    return yScale(d[1]);
  });
var linePath = svg.append("svg:path")
  .attr("class", "line");

// Line that covers whole area to stop moz element reflection from thinking that the svg is shrinking when the graph shrinks. 
svg.append("line")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", width)
  .attr("y2", height)
  .style("stroke", "blue")
  .style("stroke-width", "5px")
  .style("opacity", "0")



/*
    THE FOLLOWING FUNCTION ACTUALLY PREFORMS THE ANIMATION
    CALL ON A LOOP TO MAKE THE ANIMATION LOOP
*/

var beginAnimation = function() {

  area1Path
    .attr("d", area1(extremeNullData))
    .transition()
      .delay(beginChartIn + 200)
      .duration(700)
      .ease("elastic", 1, 0.9)
    .attr("d", area1(area1Data))
    .transition()
      .delay(beginChartOut + 300)
      .duration(500)
      .ease("cubic")
    .attr("d", area1(extremeNullData));	
  area1LineR
    .attr("x1", (width/2))
    .attr("x2", (width/2))
    .attr("y1", (height-marginBottom-5))
    .attr("y2", (height-marginBottom-5))
    .transition()
      .delay(start)
      .duration(500)
    .attr("x1", 0)
    .transition()
      .delay(finishChartOut+300)
      .duration(500)
    .attr("x1", (width/2));
  area1LineL
    .attr("x1", (width/2))
    .attr("x2", (width/2))
    .attr("y1", (height-marginBottom-5))
    .attr("y2", (height-marginBottom-5))
    .transition()
      .delay(start)
      .duration(500)
    .attr("x2", width)
    .transition()
      .delay(finishChartOut+300)
      .duration(500)
    .attr("x2", (width/2));


  area2Path
    .attr("d", area2(extremeNullData))
    .transition()
      .delay(beginChartIn + 200)
      .duration(700)
      .ease("elastic", 1, 0.9)
    .attr("d", area2(area2Data))
    .transition()
      .delay(beginChartOut)
      .duration(500)
      .ease("cubic")
    .attr("d", area2(extremeNullData));
  area2LineR
    .attr("x1", (width/2))
    .attr("x2", (width/2))
    .attr("y1", (height-marginBottom-5))
    .attr("y2", (height-marginBottom-5))
    .transition()
      .delay(start + 300)
      .duration(500)
    .attr("x1", 0)
    .transition()
      .delay(finishChartOut)
      .duration(500)
    .attr("x1", (width/2));
  area2LineL
    .attr("x1", (width/2))
    .attr("x2", (width/2))
    .attr("y1", (height-marginBottom-5))
    .attr("y2", (height-marginBottom-5))
    .transition()
      .delay(start + 300)
      .duration(500)
    .attr("x2", width)
    .transition()
      .delay(finishChartOut)
      .duration(500)
    .attr("x2", (width/2));

  linePath
    .attr("d", line(nullLineData))
    .transition()
      .delay(beginChartIn+200)
      .duration(600)
      .ease("linear", 1, 0.4)
    .attr("d", line(intermediateLineData))
    .attr("class", "line")
    .transition()
      .delay(beginChartIn+800)
      .duration(600)
      .ease("elastic", 1, 0.4)
    .attr("d", line(lineData))
    .transition()
      .delay(beginChartOut+600)
      .duration(500)
      .ease("cubic")
    .attr("d", line(nullLineData))
    
    .transition()
      .delay(finishChartOut)
    .attr("class", "line done");

  axisPath
    .transition()
      .delay(start)
      .duration(500)
    .attr("class", "x axis")
    .transition()
      .delay(finishChartOut+800)
      .duration(500)
    .attr("class", "x axis done");

}

beginAnimation();
setInterval(beginAnimation, finish);