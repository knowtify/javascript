var twoPi = 2 * Math.PI;

var svg = d3.select("#pie")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg.append("rect")
  .attr("width", w)
  .attr("height", h)
  .attr("transform", "translate(0,0)")
  .attr("fill", '#333');

/*
for(var i=1;i<91;i++){
  var len = parseInt(Math.random()*100 + 50);
  var len = (parseInt(Math.random()*20)*8)+18;
  var color = "rgb(255,0,"+parseInt(Math.random()*100+100)+")";
  
  
  svg.append("path")
  .attr("d","M350,200L350,"+len+"Z")
  .attr("stroke",color)
  .attr("stroke-width",2)
  .attr("transform","rotate("+(i*4)+" 350,200)")
  .style("stroke-dasharray", ("4,4"))
}
*/

var color = "rgb(255,0,"+parseInt(Math.random()*100+50)+")";
var from = Math.random();
var to = Math.random();

for(var i=0;i<20;i++){
  from = to;
  to = Math.random();
  var inner = (i+1)*8+20;
  var width = 2;
  
  drawArc(from,to,inner,width);
}

/*
svg.append("path")
.attr("transform","translate(350,200)")
.attr("fill",color)
.attr("stroke","transparent")
.attr("d", arcPath(0,40,44,percent));


svg.append("path")
.attr("d","M350,160L350,148Z")
.attr("stroke",color)
.attr("stroke-width",4);

var percent = Math.random();

svg.append("path")
.attr("transform","translate(350,200)")
.attr("fill",color)
.attr("stroke","transparent")
.attr("d", arcPath(0,48,52,percent));

svg.append("path")
.attr("d","M350,152L350,140Z")
.attr("stroke",color)
.attr("stroke-width",4)
.attr("transform","rotate("+(percent*360)+" 350,200)")

var new_percent = Math.random();

svg.append("path")
.attr("transform","translate(350,200)")
.attr("fill",color)
.attr("stroke","transparent")
.attr("d", arcPath(percent,56,60,new_percent));
*/


function drawArc(from,to,inner,width){
  svg.append("path")
	.attr("transform","translate(350,250)")
	.attr("fill",color)
	.attr("stroke","transparent")
	.attr("d", arcPath(from,inner,inner+width,to));

	svg.append("path")
	.attr("d","M350,"+(250-inner)+"L350,"+(250-(inner+10))+"Z")
	.attr("stroke",color)
	.attr("stroke-width",width)
	.attr("transform","rotate("+(to*360)+" 350,250)")
}

function arcPath(start,inner,outer,percent){
  var arc = d3.svg.arc()
	.startAngle(twoPi * start)
	.innerRadius(inner)
	.outerRadius(outer)
  .endAngle(twoPi * percent);
  
  return arc;
}