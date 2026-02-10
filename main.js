const stretches = [
    {
        name: "Neck Tilt",
        description: "Gently tilt your head to one side, bringing your ear towards your shoulder. Hold for 15-20 seconds, then switch sides.",
        image: "https://picsum.photos/400/200?random=1"
    },
    {
        name: "Shoulder Rolls",
        description: "Roll your shoulders forward in a circular motion 5 times, then backward 5 times. Helps release tension in the shoulders.",
        image: "https://picsum.photos/400/200?random=2"
    },
    {
        name: "Tricep Stretch",
        description: "Reach one arm overhead, bend your elbow, and let your hand fall behind your head. Use your other hand to gently push the elbow down. Hold for 15-20 seconds per arm.",
        image: "https://picsum.photos/400/200?random=3"
    },
    {
        name: "Wrist and Finger Stretch",
        description: "Extend one arm forward with your palm up. Use your other hand to gently pull your fingers down towards your body. Hold, then pull fingers up. Repeat for both hands.",
        image: "https://picsum.photos/400/200?random=4"
    },
    {
        name: "Upper Back Stretch",
        description: "Clasp your hands together in front of you, palms facing out. Push your arms forward, rounding your upper back. Hold for 15-20 seconds.",
        image: "https://picsum.photos/400/200?random=5"
    },
    {
        name: "Seated Spinal Twist",
        description: "While seated, twist your torso to one side, using your chair for support. Hold for 15-20 seconds, then switch sides.",
        image: "https://picsum.photos/400/200?random=6"
    },
    {
        name: "Hamstring Stretch (Seated)",
        description: "Extend one leg straight out. Lean forward from your hips, keeping your back straight, trying to touch your toes. Hold for 11-20 seconds per leg.",
        image: "https://picsum.photos/400/200?random=7"
    },
    {
        name: "Hip Flexor Stretch (Seated)",
        description: "Scoot to the edge of your chair, let one leg drop back with your toes on the floor. Gently push your hips forward. Hold for 15-20 seconds per leg.",
        image: "https://picsum.photos/400/200?random=8"
    },
    {
        name: "Ankle Circles",
        description: "Lift one foot slightly off the floor and rotate your ankle in circles, 5 times clockwise and 5 times counter-clockwise. Repeat for the other foot.",
        image: "https://picsum.photos/400/200?random=9"
    },
    {
        name: "Standing Side Bend",
        description: "Stand up, raise one arm overhead, and gently bend to the opposite side, stretching your side. Hold for 15-20 seconds, then switch sides.",
        image: "https://picsum.photos/400/200?random=10"
    }
];

const STRETCH_DURATION = 5 * 60; // 5 minutes in seconds
const INTERVAL_DURATION = 30 * 60; // 30 minutes in seconds

let overallIntervalCountdown = INTERVAL_DURATION;
let stretchCountdown = STRETCH_DURATION;
let mainTimerIntervalId = null;
let stretchDisplayTimeoutId = null;
let isStretchActive = false; // Added to manage visibility of image

const stretchNameElement = document.getElementById('stretch-name');
const stretchDescriptionElement = document.getElementById('stretch-description');
const stretchImageElement = document.getElementById('stretch-image'); // Get image element
const timerLabelElement = document.getElementById('timer-label');
const timerDisplayElement = document.getElementById('timer-display');
const stretchContentElement = document.getElementById('stretch-content');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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
    stretchImageElement.src = stretch.image; // Set image source
    stretchImageElement.style.display = 'block'; // Show image
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
    stretchImageElement.style.display = 'none'; // Hide image during break
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