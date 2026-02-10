const stretches = [
    {
        name: "Neck Tilt",
        description: "Gently tilt your head to one side, bringing your ear towards your shoulder. Hold for 15-20 seconds, then switch sides."
    },
    {
        name: "Shoulder Rolls",
        description: "Roll your shoulders forward in a circular motion 5 times, then backward 5 times. Helps release tension in the shoulders."
    },
    {
        name: "Tricep Stretch",
        description: "Reach one arm overhead, bend your elbow, and let your hand fall behind your head. Use your other hand to gently push the elbow down. Hold for 15-20 seconds per arm."
    },
    {
        name: "Wrist and Finger Stretch",
        description: "Extend one arm forward with your palm up. Use your other hand to gently pull your fingers down towards your body. Hold, then pull fingers up. Repeat for both hands."
    },
    {
        name: "Upper Back Stretch",
        description: "Clasp your hands together in front of you, palms facing out. Push your arms forward, rounding your upper back. Hold for 15-20 seconds."
    },
    {
        name: "Seated Spinal Twist",
        description: "While seated, twist your torso to one side, using your chair for support. Hold for 15-20 seconds, then switch sides."
    },
    {
        name: "Hamstring Stretch (Seated)",
        description: "Extend one leg straight out. Lean forward from your hips, keeping your back straight, trying to touch your toes. Hold for 11-20 seconds per leg."
    },
    {
        name: "Hip Flexor Stretch (Seated)",
        description: "Scoot to the edge of your chair, let one leg drop back with your toes on the floor. Gently push your hips forward. Hold for 15-20 seconds per leg."
    },
    {
        name: "Ankle Circles",
        description: "Lift one foot slightly off the floor and rotate your ankle in circles, 5 times clockwise and 5 times counter-clockwise. Repeat for the other foot."
    },
    {
        name: "Standing Side Bend",
        description: "Stand up, raise one arm overhead, and gently bend to the opposite side, stretching your side. Hold for 15-20 seconds, then switch sides."
    }
];

const STRETCH_DURATION = 5 * 60; // 5 minutes in seconds
const INTERVAL_DURATION = 30 * 60; // 30 minutes in seconds

let currentIntervalTimer = null;
let currentStretchTimer = null;
let currentRemainingTime = INTERVAL_DURATION;
let isStretchActive = false;

const stretchNameElement = document.getElementById('stretch-name');
const stretchDescriptionElement = document.getElementById('stretch-description');
const timerLabelElement = document.getElementById('timer-label');
const timerDisplayElement = document.getElementById('timer-display');
const stretchContentElement = document.getElementById('stretch-content');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplayElement.textContent = formatTime(currentRemainingTime);
    if (currentRemainingTime <= 0) {
        clearInterval(currentStretchTimer);
        currentStretchTimer = null;
        return;
    }
    currentRemainingTime--;
}

function showStretch() {
    isStretchActive = true;
    const randomIndex = Math.floor(Math.random() * stretches.length);
    const stretch = stretches[randomIndex];

    stretchNameElement.textContent = stretch.name;
    stretchDescriptionElement.textContent = stretch.description;
    timerLabelElement.textContent = "Stretch for:";
    stretchContentElement.style.opacity = 1; // Make content visible

    currentRemainingTime = STRETCH_DURATION;
    if (currentStretchTimer) clearInterval(currentStretchTimer);
    currentStretchTimer = setInterval(updateTimerDisplay, 1000); // Update every second

    // Set a timeout for when the stretch duration ends
    setTimeout(() => {
        hideStretch();
    }, STRETCH_DURATION * 1000);
}

function hideStretch() {
    isStretchActive = false;
    stretchNameElement.textContent = "Break Time!";
    stretchDescriptionElement.textContent = "Relax and get ready for the next stretch.";
    timerLabelElement.textContent = "Next stretch in:";
    stretchContentElement.style.opacity = 0.5; // Dim content during break

    // Stop the stretch timer countdown
    if (currentStretchTimer) clearInterval(currentStretchTimer);
    currentStretchTimer = null;

    // The currentRemainingTime will now be for the interval, not the stretch itself.
    // The main interval timer (currentIntervalTimer) handles the overall countdown.
    // We only need to reset currentRemainingTime for display, it will be accurately set
    // by the main interval logic before the next stretch.
}

function startOfficeStretchRoutine() {
    // Initial display immediately
    showStretch();

    // Start the main interval for showing stretches
    currentIntervalTimer = setInterval(() => {
        showStretch();
    }, INTERVAL_DURATION * 1000);

    // This handles the countdown for the "Next stretch in:" part during break time
    // and also during the stretch itself, but showing the *interval* countdown.
    // This is a bit tricky, need to ensure the timer display is correct.

    // Let's refine the timer logic:
    // The main interval will always count down from INTERVAL_DURATION.
    // When a stretch is active, the timer display shows STRETCH_DURATION counting down.
    // When break is active, the timer display shows remaining INTERVAL_DURATION.

    // Resetting currentRemainingTime for the overall interval countdown display
    currentRemainingTime = INTERVAL_DURATION;
    if (currentStretchTimer) clearInterval(currentStretchTimer); // Clear any previous timer
    currentStretchTimer = setInterval(() => {
        if (!isStretchActive) { // Only update interval countdown if not stretching
            updateTimerDisplay();
        }
        // If it's a stretch, updateTimerDisplay is called by showStretch's interval
    }, 1000);
}


// Start the routine when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', startOfficeStretchRoutine);

// Re-evaluate the timer logic for better clarity and less overlap.
// Simplified timer logic:
// One main interval (INTERVAL_DURATION) triggers showStretch().
// Inside showStretch(), a separate countdown for STRETCH_DURATION is managed.
// The main display timer will show the overall countdown to the *next* stretch.

let overallIntervalCountdown = INTERVAL_DURATION;
let stretchCountdown = STRETCH_DURATION;
let mainTimerIntervalId = null;
let stretchDisplayTimeoutId = null;

function updateMainTimerDisplay() {
    timerDisplayElement.textContent = formatTime(overallIntervalCountdown);
    timerLabelElement.textContent = "Next stretch in:";
    
    if (overallIntervalCountdown <= 0) {
        overallIntervalCountdown = INTERVAL_DURATION; // Reset for next cycle
    }
    overallIntervalCountdown--;
}

function displayRandomStretchAndTimers() {
    // Stop any existing stretch countdown
    if (stretchDisplayTimeoutId) clearTimeout(stretchDisplayTimeoutId);
    if (mainTimerIntervalId) clearInterval(mainTimerIntervalId);

    isStretchActive = true;
    const randomIndex = Math.floor(Math.random() * stretches.length);
    const stretch = stretches[randomIndex];

    stretchNameElement.textContent = stretch.name;
    stretchDescriptionElement.textContent = stretch.description;
    stretchContentElement.style.opacity = 1;

    // Start countdown for the stretch itself
    stretchCountdown = STRETCH_DURATION;
    timerLabelElement.textContent = "Stretch for:";
    mainTimerIntervalId = setInterval(() => {
        timerDisplayElement.textContent = formatTime(stretchCountdown);
        if (stretchCountdown <= 0) {
            clearInterval(mainTimerIntervalId);
            hideStretchPhase();
        }
        stretchCountdown--;
    }, 1000);

    // Schedule hiding the stretch and starting break timer
    stretchDisplayTimeoutId = setTimeout(() => {
        hideStretchPhase();
    }, STRETCH_DURATION * 1000);
}

function hideStretchPhase() {
    isStretchActive = false;
    stretchNameElement.textContent = "Break Time!";
    stretchDescriptionElement.textContent = "Relax and get ready for the next stretch.";
    stretchContentElement.style.opacity = 0.5;

    // Clear any remaining stretch timer interval
    if (mainTimerIntervalId) clearInterval(mainTimerIntervalId);

    // Start the overall interval countdown for the next stretch
    overallIntervalCountdown = INTERVAL_DURATION - STRETCH_DURATION; // Remaining time until next stretch starts
    timerLabelElement.textContent = "Next stretch in:";
    mainTimerIntervalId = setInterval(() => {
        timerDisplayElement.textContent = formatTime(overallIntervalCountdown);
        if (overallIntervalCountdown <= 0) {
            clearInterval(mainTimerIntervalId);
            displayRandomStretchAndTimers(); // Start next stretch
        }
        overallIntervalCountdown--;
    }, 1000);
}

// Initial call when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayRandomStretchAndTimers);