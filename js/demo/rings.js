var svg = d3.select("#main").append("svg")
    .attr("width", 800)
    .attr("height", 300);

svg.append("rect")
  .attr("width", 800)
  .attr("height", 300)
  .attr("transform", "translate(0,0)")
  .attr("fill", '#bd006f');

var millisecondsArc = d3.svg.arc()
      .innerRadius(30)
      .outerRadius(40) 
      .startAngle(0) 
      .endAngle(0); 

var secondsArc = d3.svg.arc()
      .innerRadius(40)
      .outerRadius(60) 
      .startAngle(0) 
      .endAngle(0); 
var minuteArc = d3.svg.arc()
      .innerRadius(60)
      .outerRadius(80)
      .startAngle(0) 
      .endAngle(0); 
var hourArc = d3.svg.arc()
      .innerRadius(80)
      .outerRadius(100)
      .startAngle(0) 
      .endAngle(0); 

var milliLoop = false;
var milliReversed = false;
var secondsLoop = false;
var secondsReversed = false;
var minuteLoop = false;
var hourLoop = false;

svg.append("path")
    .attr("id", "milliseconds")
    .attr("d", millisecondsArc)
    .attr("transform", "translate(400,150)")
    .attr("fill", "rgba(255,255,255, .1)");

svg.append("path")
    .attr("id", "seconds")
    .attr("d", secondsArc)
    .attr("transform", "translate(400,150)")
    .attr("fill", "rgba(255,255,255, .3)");

svg.append("path")
    .attr("id", "minutes")
    .attr("d", minuteArc)
    .attr("transform", "translate(400,150)")
    .attr("fill", "rgba(255,255,255, .5)");

svg.append("path")
    .attr("id", "hours")
    .attr("d", hourArc)
    .attr("transform", "translate(400,150)")
    .attr("fill", "rgba(255,255,255, .7)");

/* color variables */
var dawn = "rgb(251,242,219)";
var noon = "rgb(253, 184, 19)";
var dusk = "rgb(255,0,100)";
var night = "rgb(0,0,40)";

var drawClock = function drawClock(){
  var time = new Date();

  var milliseconds = time.getMilliseconds();
  var millisecondAngle = 360 * (milliseconds/999);
  var millisecondRadians = degToRad(millisecondAngle);

  var seconds = time.getSeconds();
  var secondAngle = 360 * (seconds/59);
  var secondRadians = degToRad(secondAngle);

  var minutes = time.getMinutes();
  var minAngle = 360 * ((minutes + (seconds / 59))/59);
  var minRadians = degToRad(minAngle);

  var hours = time.getHours();
  var hourAngle = 360 * ((hours + (minutes/60))/24);
  var hourRadians = degToRad(hourAngle);

   // just reversed direction
  if(milliLoop && milliseconds < 500 && milliLoop > 500 && milliReversed != true){
     millisecondsArc.endAngle(2*Math.PI).startAngle(millisecondRadians);
     milliReversed = true;
  }
  else if(milliReversed === true){
     if(milliLoop && milliseconds < 500 && milliLoop > 500){
      milliReversed = false;
      millisecondsArc.startAngle(0).endAngle(millisecondRadians);
     }
    else{
      millisecondsArc.endAngle(2*Math.PI).startAngle(millisecondRadians);
    }
       
  }
  else{
   millisecondsArc.startAngle(0).endAngle(millisecondRadians);
  }
  milliLoop = milliseconds;

  // loop around second doughnut. This could probably be simplified
  if(secondsLoop !== false && seconds < 30 && secondsLoop > 30 && secondsLoop != seconds && secondsReversed != true){
     secondsArc.endAngle(2*Math.PI).startAngle(secondRadians);
    secondsReversed = true;
  }
  else if(secondsReversed === true){
     if(seconds < 30 && secondsLoop > 30 && secondsLoop != seconds){
      secondsReversed = false;
      secondsArc.startAngle(0).endAngle(secondRadians);
     }
    else{
      secondsArc.endAngle(2*Math.PI).startAngle(secondRadians);
    }
       
  }
  else{
   secondsArc.startAngle(0).endAngle(secondRadians);
  }
  secondsLoop = seconds;
  
  minuteArc.endAngle(minRadians); 
  hourArc.endAngle(hourRadians); 

  svg.select("#milliseconds").attr("d", millisecondsArc);   svg.select("#seconds").attr("d", secondsArc);
  svg.select("#minutes").attr("d", minuteArc);
  svg.select("#hours").attr("d", hourArc);

}

function degToRad(degrees){
  return degrees * (Math.PI/180);
}

drawClock();
//setInterval(drawClock,1);