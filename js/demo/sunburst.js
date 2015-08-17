var twoPi = 2 * Math.PI;

var svg = d3.select("#pie")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

svg.append("rect")
  .attr("width", 800)
  .attr("height", 400)
  .attr("transform", "translate(0,0)")
  .attr("fill", '#333');

for(var i=1;i<91;i++){
  var len = Math.random()*100 + 50;
  var color = "rgb(255,"+parseInt(Math.random()*100+100)+",0)";
  
  
  svg.append("path")
  .attr("d","M350,200L350,"+len+"Z")
  .attr("stroke",color)
  .attr("stroke-width",'2px')
  .style("shape-rendering","optimizeQuality")
  .attr("transform","rotate("+(i*4)+" 350,200)")
}

	svg.append("circle")
  .attr("cx",350)
  .attr("cy",200)
  .attr("r",70)
  .attr("fill","#333")
  .attr("stroke-width",2)
  .attr("stroke","rgb(255,"+parseInt(Math.random()*150+100)+",0)")
  
  svg.append("circle")
  .attr("cx",350)
  .attr("cy",200)
  .attr("r",65)
  .attr("fill","#333")
  .attr("stroke","rgb(255,"+parseInt(Math.random()*150+100)+",0)")



function arcPath(start,inner,outer,percent){
  var arc = d3.svg.arc()
	.startAngle(twoPi * start)
	.innerRadius(inner)
	.outerRadius(outer)
  .endAngle(twoPi * percent);
  
  return arc;
}