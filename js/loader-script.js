const progressFill = document.getElementById('progressFill');
const statusText = document.getElementById('statusText');
const scene = document.getElementById('scene');

// Assets to track
const assets = [
    'assets/yenepoya_logo.webp',
    'assets/Yenixa logo.webp',
    'assets/time_travel.webp',
    'assets/clock.webp',
    'assets/past_future.webp'
];

let loadedCount = 0;
const totalAssets = assets.length;

function updateProgress() {
    loadedCount++;
    const percentage = Math.floor((loadedCount / totalAssets) * 100);
    progressFill.style.width = percentage + "%";
    
    if (percentage < 30) statusText.textContent = "STABILIZING WORMHOLE...";
    else if (percentage < 60) statusText.textContent = "BUFFERING CHRONO-DATA...";
    else if (percentage < 90) statusText.textContent = "SYNCHRONIZING TIMELINE...";
    else statusText.textContent = "READY FOR ARRIVAL";

    if (loadedCount === totalAssets) {
        setTimeout(completeJump, 1000);
    }
}

// Start Loading Images
assets.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = updateProgress;
    img.onerror = updateProgress; // Continue even if one fails
});

// Particle Effect Generation
for (let i = 0; i < 150; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    const rotation = Math.random() * 360;
    trail.style.setProperty('--r', `${rotation}deg`);
    trail.style.animation = `travel ${0.6 + Math.random() * 1.4}s linear ${Math.random() * -2}s infinite`;
    scene.appendChild(trail);
}

function completeJump() {
    document.getElementById('loaderUI').style.opacity = '0';
    document.getElementById('arrivalMessage').classList.add('visible');
    document.getElementById('blackHole').classList.add('active');
    
    setTimeout(() => {
        document.getElementById('redirectOverlay').classList.add('active');
        setTimeout(() => {
            window.location.href = 'template/home.html'; // Path to your main content
        }, 1000);
    }, 2000);
}