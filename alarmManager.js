// Create a function to return the HTML for each alarm
const createAlarmHtml = (id, alarm) => {
    const html = 
               `<li>
                    <section>
                            <span>Alarm &#8273; ${alarm} </span>
                            <button id="delete" data-id=${id}>Delete</button>
                    </section>
                </li>`
    return html;
};

//create a class that will be responsible for managing the alarm times in the application 
class AlarmTimes {
    constructor(currentId = '0'){
        this.alarms = [];
        this.currentId = currentId;
    }

    // This method creates an alarm
    addalarm(alarmTime) {
        this.currentId++;
        this.alarms.push({id: this.currentId , alarmTime});
    }

    //Create a method to render our alarms, so that they are visible on the page
    render() {
        let alarmsHtmlList = [];
        for(let i = 0; i < this.alarms.length; i++) {
            const currentAlarm = this.alarms[i];
            const alarmHtml = createAlarmHtml(currentAlarm.id, currentAlarm.alarmTime);
            alarmsHtmlList.push(alarmHtml);
        };
        const alarmsHtml = alarmsHtmlList.join("\n");
        const alarmList = document.querySelector("#alarmList");
        alarmList.innerHTML = alarmsHtml;
        return true;
    }

    // Create a method to save to local storage
    saveToLocal() {
        let alarmsJson = JSON.stringify(this.alarms);
        localStorage.setItem("alarmTime", alarmsJson);
        let currentId = String(this.currentId);
        localStorage.setItem("currentId", currentId);
    }

    // Create a method to load local storage
    loadFromLocal() {
        if (localStorage.getItem("alarmTime")) {
            let alarmsJson= localStorage.getItem("alarmTime");
            this.alarms = JSON.parse(alarmsJson);
        };
        if (localStorage.getItem("currentId")) {
            let currentIdString = localStorage.getItem("currentId");
            this.currentId = Number(currentIdString);
        }           
    }

     // The method delete an alarm
     deleteAlarm(id) {
        let alarmsToKeep = this.alarms.filter(alarm => alarm.id != id);
        this.alarms = alarmsToKeep;
    }
};
