<!DOCTYPE html>
<html>

    <head>
        <title>Clock</title>
        <link rel="shortcut icon" href="#">
        <link href="https://fonts.googleapis.com/css2?family=Jacques+Francois+Shadow&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="./resources/css/style.css" rel="stylesheet" type="text/css">
    </head>

    <body>
        <section class="page"> 

            <header>
                <h1>CLOCK APPLICATION</h1>
            </header>

            <!-- Digital clock -->
            <h1 id="digitalClock"></h1>

            <!-- Analog clock -->
            <canvas id="myCanvas" width="300" height="300" style="background-color:#333"></canvas>
            <br><br>

            <!-- Choose alarm time -->
            <div class="input-container">
                <label for="alarm">Alarm</label>
                <input type="time" id="alarm">
            </div>

            <!-- Set alarm button -->
            <button type="submit" id="setAlarmButton">Set Alarm</button>

        </section>

        <!-- Alarm audio -->
        <audio id="myAudio">
            <source src="./resources/audio/alarmSound.wav" type="audio/wav" muted="muted">
            Your browser does not support the audio element.
        </audio>

        <!-- Popup box to stop the alarm  -->
        <div class="stopAlarm">
            <span> Do you want to stop or snooze the alarm?</span>
            <button id="confirmStopButton">Stop</button>
            <button id="snoozeButton">Snooze</button>
        </div>

        <!--Create the alarm cards-->
        <ul id="alarmList" class="flex-container">

        </ul>

        <!-- Javascript files-->
        <script type="text/javascript" src="./js/alarmManager.js"></script>
        <script type="text/javascript" src="./js/index.js"></script>

    </body>

</html>
