const canvas = document.getElementById('dnaHeartCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center of the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Parameters
const heartScale = 15; // Controls the size of the heart
const dnaPoints = 100; // Number of DNA points around the heart
const beatSpeed = 0.1; // Speed of the heartbeat
const strandWaveAmplitude = 30; // DNA strand oscillation amplitude

let frame = 0; // Animation frame counter

// Function to calculate heart shape points
function heartShape(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * heartScale, y: y * heartScale };
}

// Function to create a gradient for the heart
function createHeartGradient() {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, heartScale * 2);
    gradient.addColorStop(0, '#ff3f3f'); // Light red at the center
    gradient.addColorStop(1, '#d10000'); // Darker red at the edges
    return gradient;
}

// Animation function
function animateHeart() {
    // Fill the background with black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);

    // Heartbeat effect: modulate heart size
    const pulse = 1 + Math.sin(frame * beatSpeed) * 0.1; // Stronger pulse for dramatic effect

    // Draw the heart with gradient and glow effect
    const gradient = createHeartGradient();
    ctx.beginPath();
    ctx.moveTo(heartShape(0).x * pulse, heartShape(0).y * pulse);

    for (let t = 0; t <= Math.PI * 2; t += Math.PI / 50) {
        const heartPoint = heartShape(t);
        ctx.lineTo(heartPoint.x * pulse, heartPoint.y * pulse);
    }
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 20; // Glow effect
    ctx.shadowColor = 'rgba(255, 0, 0, 0.7)';
    ctx.fill();

    // Display the message "Cherno I love you" above the heart
    ctx.font = '32px sans-serif';  // Smaller font size
    ctx.fillStyle = '#ffffff';  // Ensures the text is white
    ctx.textAlign = 'center';
    ctx.fillText('Cherno I love you', 0, -heartScale * 2 - 20); // Positioned above the heart

    // Draw DNA points along the heart
    for (let i = 0; i < dnaPoints; i++) {
        const angle = (Math.PI * 2 * i) / dnaPoints;
        const heartPoint = heartShape(angle);

        // Adjust the point size based on the heartbeat effect
        const x = heartPoint.x * pulse;
        const y = heartPoint.y * pulse;

        // DNA strand oscillation
        const offset = Math.sin(frame * 0.1 + i) * strandWaveAmplitude;

        // Left DNA strand
        ctx.beginPath();
        ctx.arc(x - offset, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ff5555';
        ctx.fill();

        // Right DNA strand
        ctx.beginPath();
        ctx.arc(x + offset, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#55aaff';
        ctx.fill();
    }

    frame++; // Increment frame for animation
    ctx.restore();

    // Loop the animation
    requestAnimationFrame(animateHeart);
}

// Start animation
animateHeart();