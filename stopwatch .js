document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start');
    const resetButton = document.querySelector('.reset');
    const lapButton = document.querySelector('.lap');
    const lapClearButton = document.querySelector('.lap-clear-button');
    const minElement = document.querySelector('.min');
    const secElement = document.querySelector('.sec');
    const msecElement = document.querySelector('.msec');
    const lapsContainer = document.querySelector('.laps');

    let interval;
    let running = false;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    startButton.addEventListener('click', toggleTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', recordLap);
    lapClearButton.addEventListener('click', clearLaps);

    function toggleTimer() {
        if (running) {
            stopTimer();
            startButton.textContent = 'Start';
        } else {
            startTimer();
            startButton.textContent = 'Stop';
        }
    }

    function startTimer() {
        if (!running) {
            running = true;
            interval = setInterval(updateTime, 10);
        }
    }

    function stopTimer() {
        if (running) {
            running = false;
            clearInterval(interval);
        }
    }

    function resetTimer() {
        stopTimer();
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
        startButton.textContent = 'Start';
        lapsContainer.innerHTML = '';
        lapClearButton.classList.add('d-none');
    }

    function updateTime() {
        milliseconds += 1;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds += 1;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }
        updateDisplay();
    }

    function updateDisplay() {
        minElement.textContent = pad(minutes) + ':';
        secElement.textContent = pad(seconds) + ':';
        msecElement.textContent = pad(milliseconds);
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function recordLap() {
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        const lapNumber = lapsContainer.children.length + 1;
        lapItem.innerHTML = `<span class="number">#${lapNumber}</span>
                             <span class="time-stamp">${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}</span>`;
        lapsContainer.appendChild(lapItem);
        lapClearButton.classList.remove('d-none');
    }

    function clearLaps() {
        lapsContainer.innerHTML = '';
        lapClearButton.classList.add('d-none');
    }
});
