const alarmTime = new AlarmTimes();
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

alarmTime.loadFromLocal();
alarmTime.render();

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
 
    if (meridiem == "AM" && hours < 10) {
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

  setInterval(drawClock, 1000);
  setInterval(showCurrentTime, 1000);

  // The method checks the alarm times and plays the alarm sound 
function checkAlarm() {
    let hoursNow = digitalClock.innerText[0] + digitalClock.innerText[1];
    let minutesNow = digitalClock.innerText[5] + digitalClock.innerText[6];
    let meridiemNow = digitalClock.innerText[13] + digitalClock.innerText[14];
    const alarmsArray = alarmTime.alarms;
    for(let i = 0; i < alarmsArray.length; i++) {
        const currentAlarm = alarmsArray[i];
        if(currentAlarm.alarmTime == `${hoursNow}:${minutesNow} ${meridiemNow}` && alarmOn) {
            myAudio.play();
        };
    };    
};
setInterval(checkAlarm, 1000);

// event listeners 
setAlarmButton.addEventListener('click', function() {
    const alarmValue = alarm.value;
    let hoursAlarm = `${alarmValue[0]}${alarmValue[1]}`;
    const minutesAlarm = `${alarmValue[3]}${alarmValue[4]}`
    let meridiemAlarm = 'AM';
    if (alarmValue === '') {
        alarm.style.border = "1px solid red";
        alert("Please select a time.");
        return false;
    } else {
        alarm.style.border = "1px solid grey";
    };
    if (hoursAlarm >= noon)
    {
        meridiemAlarm = "PM";
    };
    if (hoursAlarm > noon)
    {
        hoursAlarm = hoursAlarm - 12;
        hoursAlarm = '0' + hoursAlarm;
    };
    const alarmDisplay = `${hoursAlarm}:${minutesAlarm} ${meridiemAlarm}`;
    alarmTime.addalarm(alarmDisplay);
    alarmTime.saveToLocal();
    alarmTime.render();
    alarm.value = '';
});

alarmList.addEventListener('click', function(event) {
    let element = event.target;
    let dataId = element.getAttribute("data-id");
    alarmTime.deleteAlarm(dataId);
    alarmTime.saveToLocal();
    alarmTime.render();   
});

const pauseAudio = function() {
    myAudio.pause();
    alarmOn = false;
    myAudio.currentTime = 0;
    stopAlarm[0].style.opacity = "0";
    for(let i = 0; i < page.length; i++) {
        page[i].style.opacity = "1";
    };
    const secondsNow = digitalClock.innerText[10] + digitalClock.innerText[11];
    setTimeout(() => {
        alarmOn = true;
    }, 60000 - secondsNow*1000);
};

function toPause() {
    for(let i = 0; i < page.length; i++) {
        page[i].style.opacity = "0.2";
    };    
    stopAlarm[0].style.opacity = "1";
    confirmStopButton.onclick = pauseAudio;
    snoozeButton.onclick = function() {
        pauseAudio();
        const newSnoozedDate = new Date(timeNow.getTime() + 5*60000);
        let hoursSnoozed = newSnoozedDate.getHours();
        let minutesSnoozed = newSnoozedDate.getMinutes(); 
        let meridiemSnoozed = 'AM';
        if (hoursSnoozed >= noon)
        {
            meridiemSnoozed = "PM";
        };
        if (hoursSnoozed > noon)
        {
            hoursSnoozed = hoursSnoozed - 12;
            hoursSnoozed = '0' + hoursSnoozed;
        };
	if (meridiemSnoozed == "AM" && hoursSnoozed < 10) {
            hoursSnoozed = '0' + hoursSnoozed;
        };
        if (minutesSnoozed < 10)
        {
            minutesSnoozed = "0" + minutesSnoozed;
        };
	const alarmSnoozed = `${hoursSnoozed}:${minutesSnoozed} ${meridiemSnoozed}`;
	alarmTime.addalarm(alarmSnoozed);
	alarmTime.saveToLocal();
	alarmTime.render();
    };
};

myAudio.addEventListener('play',toPause);
