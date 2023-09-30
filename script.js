const CurrentTimerContainer = document.getElementById("Current-timer-container");
const btnSet = document.getElementById("btn-set");
const audio = document.getElementById("audio");

btnSet.addEventListener("click", () => {
  // now get the values of timings from the user inputs to set the timer
  const hour = Number(document.getElementById("hour-input").value);
  const minute = Number(document.getElementById("minute-input").value);
  const second = Number(document.getElementById("second-input").value);
  console.log(typeof hour);
  const totalTimerValue = hour * 3600 + minute * 60 + second;
  if (totalTimerValue > 0) {
    // create timer container for the timers a user creates & added to the below section named CurrentTimerContainer
    let timerContainer = document.createElement("span");
    timerContainer.className = "timer-container";
    timerContainer.innerHTML = `
    <span>Left Time :</span>
    <span class="timer-display" id="timer-display"> 
      <input type="number" id="hour-show" placeholder="hh" >:
      <input type="number" id="minute-show" placeholder="mm" >:
      <input type="number" id="second-show" placeholder="ss" >
    </span>
    <button class="btn" onclick="deleteTask(this)">Delete</button>
  `;
    CurrentTimerContainer.appendChild(timerContainer);

    updateTime(totalTimerValue, timerContainer);
  }
  else{
    alert("Please enter valid time value");
  }
});

function updateTime(totalTimerValue, timerContainer) {
  let timerDisplay = timerContainer.querySelector("#timer-display");
  let hour = timerDisplay.querySelector("#hour-show");
  let minute = timerDisplay.querySelector("#minute-show");
  let second = timerDisplay.querySelector("#second-show");

  const myInterval = setInterval(() => {

    if (totalTimerValue === 0) {
      timerContainer.classList.toggle("yellow");
      timerContainer.innerHTML = `
                                  <span>Timer Is Up !</span>
                                  <button class="btn dark" onclick="deleteTask(this)">Stop</button>`;
      clearInterval(myInterval);
      audio.play();
    } 
    else {
      --totalTimerValue;
      hour.value = Math.floor(totalTimerValue / 3600);
      minute.value = Math.floor((totalTimerValue % 3600) / 60);
      second.value = totalTimerValue % 60;
    }
  }, 1000);
}

function deleteTask(deleteBtn) {
  const parentCard = deleteBtn.parentNode;
  parentCard.remove();
}
