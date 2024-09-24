const display = document.getElementById('clock')
const audio = new Audio('Alarm_Sound/biozard.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;


function updateTime() {
    const date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    display.innerText = `${hour} : ${minutes} : ${seconds}`;
}
function formatTime(time) {
    if ( time < 10 ){
        return '0' + time;
    }
    return time;
}

function setAlarmTime(value) {
    alarmTime = value;
    console.log('AlarmTime:', alarmTime);
}


function setAlarm() {
    if (alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);
        
        if (timeToAlarm > current) {
            if (alarmTimeout) {
                clearTimeout(alarmTimeout);
            }
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        } else {
            alert('The alarm time is in the past.');
        }
    } else {
        alert('No alarm time set.');
    }
}

function clearAlarm() {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alarmTimeout = null;
        audio.pause();
        audio.currentTime = 0; // Reset the audio playback
        alarmTime = null;
        alert('Alarm cleared');
    } else {
        alert('No alarm to clear');
    }
}
setInterval(updateTime, 1000)

