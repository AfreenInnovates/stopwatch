// Define variables to store the seconds, minutes, hours, and timer reference
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;

// Get a reference to the HTML element that displays the time
const time = document.getElementById("time");

// Function to update the timer display
function updateTimer() {
  // Format the time values with leading zeros and set it as the text content of the time element
  time.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to start the timer
function start() {
  // Only start the timer if it's not already running
  if (timer === null) {
    // Set an interval to update the timer every 1000 milliseconds (1 second)
    timer = setInterval(() => {
      seconds++; // Increment the seconds

      // Check if the seconds have reached 60 (a minute)
      if (seconds === 60) {
        seconds = 0; // Reset seconds to 0
        minutes++; // Increment the minutes

        // Check if the minutes have reached 60 (an hour)
        if (minutes === 60) {
          minutes = 0; // Reset minutes to 0
          hours++; // Increment the hours
        }
      }

      // Update the timer display with the new values
      updateTimer();

      // Store the elapsed time in local storage as a JSON string
      localStorage.setItem(
        "elapsedTime",
        JSON.stringify({ hours, minutes, seconds })
      );
    }, 1000); // Run the timer update every 1000 milliseconds (1 second)
  }
}

// Function to stop the timer
function stop() {
  // Clear the interval timer to stop the ongoing updates
  clearInterval(timer);

  // Reset the timer variable to null, indicating that the timer is not running
  timer = null;
}

// Function to reset the timer to zero
function reset() {
  // Stop the timer if it's running
  stop();

  // Reset the seconds, minutes, and hours to zero
  seconds = 0;
  minutes = 0;
  hours = 0;

  // Update the timer display to show the reset time
  updateTimer();

  // Remove the elapsed time from local storage
  localStorage.removeItem("elapsedTime");
}

// Event listener that runs when the DOM content is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Retrieve the stored elapsed time from local storage
  const storedTime = localStorage.getItem("elapsedTime");

  // Check if there is stored time
  if (storedTime) {
    // Parse the stored time from the JSON string
    const {
      hours: storedHours,
      minutes: storedMinutes,
      seconds: storedSeconds,
    } = JSON.parse(storedTime);

    // Update the time variables with the stored time
    hours = storedHours;
    minutes = storedMinutes;
    seconds = storedSeconds;

    // Update the timer display with the stored time
    updateTimer();
  }
});
