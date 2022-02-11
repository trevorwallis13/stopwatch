/*
    Btns:       start/stop
                reset
                lap
    displays:   current total time (mm:ss:cs)
                current lap time (mm:ss:cs)
                laps
                    -- lap totalTimeCount
                    -- lap time

*/

//select display elements

const lapTimeDisp = document.querySelector('.lap-timer');
const totalTimeDisp = document.querySelector('.total-timer');

//select button elements

const startStopBtn = document.querySelector('.start-stop-btn');
const lapBtn = document.querySelector('.lap-btn');
const resetBtn = document.querySelector('.reset-btn');

//select lap section

const lapSection = document.querySelector('.laps');

// format time

let totalTimeCount = 0;
let lapTimeCount = 0;
let lapNumber = 1;

function formatTime(totalTimeCount) {
    let minutes = Math.floor(totalTimeCount / 6000);
    let seconds = Math.floor((totalTimeCount - (minutes * 6000)) / 100);
    let centiSeconds = totalTimeCount % 100;

    if(minutes < 10) {minutes = '0' + minutes};
    if(seconds < 10) {seconds = '0' + seconds};
    if(centiSeconds < 10) {centiSeconds = '0' + centiSeconds};


    return `${minutes}:${seconds}.${centiSeconds}`;
}

// start/stop functions

let timerInterval = null;
let lapInterval = null;

function startTimer() {
    timerInterval = setInterval(() => {
        totalTimeDisp.textContent = formatTime(totalTimeCount++);
        lapTimeDisp.textContent = formatTime(lapTimeCount++);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// button click event listeners

startStopBtn.addEventListener('click', () => {
    if(timerInterval) {
        stopTimer();
        startStopBtn.textContent = "Start";
    } else {
        startTimer();
        startStopBtn.textContent = "Stop";
    }
});

lapBtn.addEventListener('click', () => {
    console.log("Lap button clicked!");
    
    let lapTime = formatTime(lapTimeCount);
    lapTimeCount = 0;

    if(totalTimeCount > 0) {
        createLapRow(lapNumber, lapTime);
        lapNumber++;
    }
})

resetBtn.addEventListener('click', () => {
    if(timerInterval) {stopTimer()};

    totalTimeCount = 0;
    lapTimeCount = 0;
    lapNumber = 1;

    totalTimeDisp.textContent = formatTime(totalTimeCount);
    lapTimeDisp.textContent = formatTime(totalTimeCount);

    lapSection.innerText = "";
    startStopBtn.innerText = "Start";
})

// html functions

function createLapRow(lapNumber, lapTime) {
    const   lapNumberEl = document.createElement("p");
            lapNumberEl.setAttribute("class", "lap-num");
            lapNumberEl.innerText = `Lap ${lapNumber}`;

    const   lapTimeEl = document.createElement("p");
            lapTimeEl.setAttribute("class", "lap-time");
            lapTimeEl.innerText = lapTime;

    const   lapRowEl = document.createElement("div");
            lapRowEl.setAttribute("class", "lap-row");
            lapRowEl.append(lapNumberEl, lapTimeEl);

    lapSection.append(lapRowEl);
}