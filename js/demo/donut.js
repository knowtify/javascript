var width = 1000,
    height = 1000,
    radius = 400;

var dataset = {  apples: [5345, 2877,9479, 1967, 2437] };

var canvas = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

canvas.append("rect")
  .attr("width", 1000)
  .attr("height", 1000)
  .attr("transform", "translate(0,0)")
  .attr("fill", '#f2f2f2');

var color = d3.scale.ordinal()
            .domain(d3.range(0,5))
            .range(["#6EC1A5","#9FBEA6","#F5D3A3","#FF9F88","#FB7878"]);

// Pie chart using pie layout(data generator)
var pie = d3.layout.pie()
    .sort(null);

var arc1 = d3.svg.arc()
    .innerRadius(radius - 80)
    .outerRadius(radius);

var path = canvas.append("g").selectAll("path").data(pie(dataset.apples)).enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc1)
    .attr("transform", "translate(" + 500+ "," + 500 + ")");

//Without pie layout --- manually calculating
function cumulative(data,i){
    var result=0;
    for (var j=0;j<i;j++){
        result+=data[j];
    }
    return result;
}
/*
var arc2 = d3.svg.arc()
    .startAngle(function(d,i){return (cumulative(dataset.apples,i))/d3.sum(dataset.apples)*2*Math.PI;})
    .endAngle(function(d,i){return (cumulative(dataset.apples,i+1))/d3.sum(dataset.apples)*2*Math.PI;})
    .innerRadius(radius - 20)
    .outerRadius(radius);

var path2 = canvas.append("g").selectAll("path").data(dataset.apples).enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc2)
    .attr("transform", "translate(" + 300+ "," + 100 + ")");
*/