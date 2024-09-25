const display = document.getElementById('clock');
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
    return time < 10 ? '0' + time : time;
}

function setAlarmTime(value) {
    const parsedTime = new Date(value);
    if (!isNaN(parsedTime.getTime())) {
        alarmTime = parsedTime;
        console.log('AlarmTime:', alarmTime);
    } else {
        alert('Invalid alarm time');
    }
}

function setAlarm() {
    if (alarmTime) {
        const current = new Date();
        if (alarmTime > current) {
            if (alarmTimeout) {
                clearTimeout(alarmTimeout);
            }
            const timeout = alarmTime.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => {
                audio.play();
                alert('Alarm ringing!');
            }, timeout);
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

setInterval(updateTime, 1000);
