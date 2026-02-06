const progressFill = document.getElementById('progressFill');
const statusText = document.getElementById('statusText');
const scene = document.getElementById('scene');

// Define all assets that MUST be loaded before the home page appears
const assetsToLoad = [
    { type: 'image', src: 'assets/yenepoya_logo.png' },
    { type: 'image', src: 'assets/yenixa_logo.png' },
    { type: 'image', src: 'assets/time_travel.png' },
    { type: 'image', src: 'assets/clock.png' },
    { type: 'image', src: 'assets/rotate.png' },
    { type: 'image', src: 'assets/past_future.png' },
    { type: 'video', src: 'assets/videos/bg_video.mp4' }
];

let loadedCount = 0;
const totalAssets = assetsToLoad.length;

function updateProgress() {
    loadedCount++;
    const percentage = Math.floor((loadedCount / totalAssets) * 100);
    progressFill.style.width = percentage + "%";

    // Update terminal messages based on progress
    if (percentage < 30) statusText.textContent = "STABILIZING WORMHOLE...";
    else if (percentage < 70) statusText.textContent = "SYNCING TEMPORAL ASSETS...";
    else if (percentage < 100) statusText.textContent = "FINALIZING COORDINATES...";

    if (loadedCount === totalAssets) {
        statusText.textContent = "SYSTEM READY";
        setTimeout(completeJump, 800);
    }
}
// Dynamic trail count based on device performance
const isMobile = window.innerWidth < 768;
const trailCount = isMobile ? 80 : 150; // Fewer trails on mobile for smoother FPS

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    const rotation = Math.random() * 360;
    trail.style.setProperty('--r', `${rotation}deg`);

    // Vary the distance of the trails from the center for a "tunnel" look
    const distance = isMobile ? (30 + Math.random() * 40) : (50 + Math.random() * 100);

    // Adjusted animation speed for mobile
    const duration = isMobile ? (0.4 + Math.random() * 0.8) : (0.6 + Math.random() * 1.4);

    trail.style.animation = `travel ${duration}s linear ${Math.random() * -2}s infinite`;
    scene.appendChild(trail);
}
// Start the loading process
assetsToLoad.forEach(asset => {
    if (asset.type === 'image') {
        const img = new Image();
        img.src = asset.src;
        img.onload = updateProgress;
        img.onerror = updateProgress; // Skip if fails
    } else if (asset.type === 'video') {
        const video = document.createElement('video');
        video.src = asset.src;
        video.preload = 'auto';
        // Check if video is already buffered enough
        video.oncanplaythrough = updateProgress;
        video.onerror = updateProgress;
    }
});

// Create Wormhole Trails
for (let i = 0; i < 150; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    const rotation = Math.random() * 360;
    trail.style.setProperty('--r', `${rotation}deg`);
    const duration = 0.6 + Math.random() * 1.4;
    trail.style.animation = `travel ${duration}s linear ${Math.random() * -2}s infinite`;
    scene.appendChild(trail);
}

function completeJump() {
    document.getElementById('loaderUI').style.opacity = '0';
    document.getElementById('terminalText').style.opacity = '0';
    document.getElementById('arrivalMessage').classList.add('visible');

    setTimeout(() => {
        document.getElementById('blackHole').classList.add('active');
        setTimeout(() => {
            document.getElementById('redirectOverlay').classList.add('active');
            setTimeout(() => {
                // Change 'home.html' to the actual filename of your landing page
                window.location.href = 'template/home.html';
            }, 1000);
        }, 800);
    }, 1500);
}