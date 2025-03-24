import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';
export default class AlarmClockApp extends LightningElement {

    // Impotrting the static resource
    clcockImage = AlarmClockAssets + '/alarmClock.png';

    hours = [];
    minutes = [];
    meridians = ["AM", "PM"];
    selectedHour = "";
    selectedMinute = "";
    selectedMeridian = "";
    currentTime = "";
    fullDate = "";

    get isFieldNotSelected() {
        return !(this.selectedHour && this.selectedMinute && this.selectedMeridian)
    }

    connectedCallback() {
        this.CurrentTimeHandler();
        this.createHoursOptions();
        this.createMinutesOptions();

        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        this.fullDate = `${day}/${month}/${year}`;
    }

    CurrentTimeHandler() {
        setInterval(()=> {
            let dateTime = new Date();
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let seconds = dateTime.getSeconds();
        let AmPm = "AM"

        if(hours === 0) {
            hours = 12;
        }else if (hours === 12) {
            AmPm = "PM";
          }  
        else if(hours >= 12) {
            hours = hours - 12;
            AmPm = "PM";
        }
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.currentTime = `${hours} : ${minutes} : ${seconds} ${AmPm}`
        }, 1000)
        
    }
    createHoursOptions() {
        for(let i=1; i<=12; i++) {
            let value = i < 10 ? "0" + i : i;
            this.hours.push(value);
        }
    }

    createMinutesOptions() {
        for(let i=0; i<=59; i++) {
            let value = i < 10 ? "0" + i : i;
            this.minutes.push(value);
        }
    }

    optionhandler(event) {
        const {label, value} = event.detail
        if(label === "Hour(s)") {
            this.selectedHour = value;
        } else if (label === "Minute(s)") {
            this.selectedMinute = value;
        } else if(label === "AM/PM") {
            this.selectedMeridian = value;
        }

        console.log("selectedHour" + this.selectedHour);
        console.log("selectedMinute" + this.selectedMinute);
        console.log("selectedMeridian" + this.selectedMeridian);
    }
}