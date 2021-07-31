const digitalClock = document.getElementById("digitalClock");
const alarm = document.getElementById("alarm");
const setAlarmButton = document.getElementById("setAlarmButton");
const myAudio = document.getElementById("myAudio");
const stopAlarm = document.getElementsByClassName("stopAlarm");
const page = document.getElementsByClassName("page");
const confirmStopButton = document.getElementById("confirmStopButton");
const snoozeButton = document.getElementById("snoozeButton");
let alarmOn = true;
const noon = 12;
let currentId = 0;
let clockTime = 0;
let timeNow = new Date();
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

// a function to show the current digital time on the page
const showCurrentTime = function() {
    timeNow = new Date();
    let hours = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let meridiem = "AM";
 
    // Set hours
	if (hours >= noon)
	{
        meridiem = "PM";
	};

	if (hours > noon)
	{
		hours = hours - 12;
        hours = '0' + hours;
	};
 
    if (meridiem == "AM") {
        hours = '0' + hours;
    };

    // Set Minutes
    if (minutes < 10)
    {
        minutes = "0" + minutes;
    };
 
    // Set Seconds
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    };

    // put together the string that displays the time
    clockTime = `${hours} : ${minutes} : ${seconds}  ${meridiem}`;
 
    digitalClock.innerText = clockTime;
};


function drawFace(ctx, radius) {
    let grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  };
  
  function drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius*0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius*0.85);
      ctx.rotate(-ang);
    }
  };
  
  function drawTime(ctx, radius){
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      //hour
      hour=hour%12;
      hour=(hour*Math.PI/6)+
      (minute*Math.PI/(6*60))+
      (second*Math.PI/(360*60));
      drawHand(ctx, hour, radius*0.5, radius*0.07);
      //minute
      minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
      drawHand(ctx, minute, radius*0.8, radius*0.07);
      // second
      second=(second*Math.PI/30);
      drawHand(ctx, second, radius*0.9, radius*0.02);
  };
  
  // create the analog clock
  function drawClock() {
      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
      drawTime(ctx, radius);
  };
  
  function drawHand(ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0,0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
  };

  