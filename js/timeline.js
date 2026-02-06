const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');

const events = [
    { thematic: "The Eternal Ascendant", name: "Best Manager", participants: "Solo", category: "Management", color: "#05D0FF", desc: "More than an event, Best Manager is a crucible of skill and grit where only the sharpest individual survives. Take the leap, transcend your limits, and prove you have what it takes to own the universe.", logo: "../assets/logos/best_manager.png" },
    { thematic: "TECH TYCOON", name: "IT Manager", participants: "Solo", category: "Technology", color: "#FFAC72", desc: "The IT Manager Competition is an intensive simulation of high-stakes leadership. It challenges individuals to master communication, problem-solving, and strategic decision-making in a fast-paced professional environment.", logo: "../assets/logos/it_manager.png" },
    { thematic: "Rift In Reality", name: "Web Development", participants: "Team (2)", category: "Technology", color: "#05D0FF", desc: "The Web Development event is a competitive, skill-oriented program designed to evaluate participants on modern web design fundamentals, creativity, and problem-solving ability using core web technologies.", logo: "../assets/logos/web.png" },
    { thematic: "The Human Epix", name: "HR Challenge", participants: "Team (2)", category: "Management", color: "#FFAC72", desc: " Step into a temporal vortex where you manage the most volatile asset in the universe: people, across the past, present, and future of Indian industry. The Human Epix tests your ability to adapt, legislate, and survive the ultimate corporate evolution.", logo: "../assets/logos/hr.png" },
    { thematic: "Nexus Odyssey", name: "Marketing", participants: "Team (2)", category: "Business", color: "#05D0FF", desc: "NEXUS ODYSSEY is a two-person marketing challenge across time, from ancient trade routes to AI-driven futures. Adapt your strategies across eras to prove your marketing genius is truly timeless.", logo: "../assets/logos/marketing.png" },
    { thematic: "Capital Paradox", name: "FINANCE TAXATION", participants: "Team (2)", category: "Business", color: "#FFAC72", desc: "Control the global flow of assets. Navigate high-stakes financial risk and temporal stock simulations.", logo: "../assets/logos/finance.png" },
    { thematic: "Chronopreneur", name: "Team Entrepreneurship", participants: "Team (2)", category: "Entrepreneurship", color: "#05D0FF", desc: "ChronoPreneur is a high-stakes, two-player challenge where business acumen meets real-time pressure. Survive intense surprise rounds and master the clock to prove your team’s strategic agility.", logo: "../assets/logos/entreprenorship.png" },
    { thematic: "Renewed From Ruins", name: "Best From Waste", participants: "Team (2)", category: "Creativity", color: "#FFAC72", desc: "In Renewed from Ruins, teams of two have two hours to transform discarded relics into value-driven treasures. Under the Vintage Revival theme, you'll blend creative ingenuity with sustainability to prove that old is gold.", logo: "../assets/logos/best.png" },
    { thematic: "Soul In Focus", name: "Photo/Videography", participants: "Solo", category: "Arts", color: "#05D0FF", desc: "Soul in Focus is an intensive mobile-only challenge that captures the raw emotions and hidden stories of campus life. From stills to cinematic shorts, it dares you to prove that powerful storytelling comes from the soul, not the equipment.", logo: "../assets/logos/photo.png" },
    { thematic: "ChronoQuest", name: "Quiz", participants: "Team (2)", category: "Academic", color: "#FFAC72", desc: "The Yenixa 2026 Quiz is a multi-stage intellectual battle, moving from fast-paced Kahoot heats to strategic bidding wars. Face the final buzzer round where quick reflexes and precise knowledge determine the winner of the grand cash prize.", logo: "../assets/logos/quiz.png" },
    { thematic: "TimeLoop", name: "Coding", participants: "Team (2)", category: "Technology", color: "#05D0FF", desc: "TimeLoop Code is a high-intensity programming challenge where duos battle complex algorithms and data structures under strict time constraints. Using C, C++, or Python on provided systems, teams must synchronize their logic to solve intricate problems.", logo: "../assets/logos/coding.png" },
    { thematic: "Re-Coded Bits", name: "E-Sports Arena", participants: "Team (2)", category: "Gaming", color: "#FFAC72", desc: "Prepare for ultimate digital dominance in our Esports Arena, featuring high-octane showdowns across both Mobile and PC platforms. Whether you're dominating the battlefield in BGMI or outmaneuvering opponents in Valorant and FC 24, this is your chance to showcase elite gaming skills and claim the championship title.", logo: "../assets/logos/esports.png" },
    { thematic: "Palimpsest", name: "Mock Press", participants: "Solo", category: "Communication", color: "#05D0FF", desc: "Palimpsest is an interactive acting experience where characters evolve, rules shift, and no two journeys look the same.Each round introduces a new layer, encouraging creativity, adaptability, and thoughtful choices—without expecting perfection.", logo: "../assets/logos/mock_press.png" },
    { thematic: "Fireless Flavors In Time", name: "Cooking Without Fire", participants: "Team (3)", category: "Culinary", color: "#FFAC72", desc: "To showcase their creativity, plating skills, and taste innovation, all without using fire.", logo: "../assets/logos/cooking.png" },
    { thematic: "TimeShift", name: "Surprise Event", participants: "Team (2)", category: "Strategy", color: "#05D0FF", desc: "Time Shift is a high-energy tournament for teams of two that tests teamwork, adaptability, and mental agility through surprise challenges. Strategy and coordination are essential, as only the most synchronized and resilient teams will survive the rounds to claim victory.", logo: "../assets/logos/surprice.png" },
    { thematic: "The Midnight Equation", name: "Mystery Case", participants: "Team (3)", category: "Mystery", color: "#FFAC72", desc: "This event is basically about a individuals critical and logical thinking. The team work also matter a lot on how they crack the hurdles and path their path to reach their goal.", logo: "../assets/logos/mistory.png" },
    { thematic: "Chrono Couture", name: "Face Painting & Ramp Walk", participants: "Team (2)", category: "Arts", color: "#05D0FF", desc: "Merge artistic mastery with stage presence in CHRONO COUTURE, a two-round challenge where Time Travel comes to life. Transform your canvas in an intensive face painting session, then command the stage in a coordinated ramp walk that blends costume, concept, and confidence.", logo: "../assets/logos/face_painting.png" }
];
const numPoints = events.length;
const centerImageSize = 600;
const centerImg = new Image();
centerImg.src = '../assets/time_travel.png';

let targetRotation = 0;
let currentRotation = 0;
let currentIdx = -1;

function updateUI(idx) {
    if (idx === currentIdx) return;
    currentIdx = idx;
    const event = events[idx];

    document.getElementById('eventName').style.color = event.color;
    document.getElementById('eventName').textContent = event.thematic;
    document.getElementById('eventSubtitle').textContent = `[ ${event.name} ]`;
    // Removed category from the description
    document.getElementById('eventDescription').innerHTML = `${event.desc}<br><br><strong>Format:</strong> ${event.participants}`;
    document.getElementById('eventLogo').src = event.logo;

    const btn = document.querySelector('.view-more');
    btn.style.background = `linear-gradient(135deg, ${event.color} 0%, ${event.color}aa 100%)`;

    const overlay = document.getElementById('contentOverlay');
    overlay.classList.remove('fade-in');
    void overlay.offsetWidth;
    overlay.classList.add('fade-in');
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function draw() {
    currentRotation += (targetRotation - currentRotation) * 0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dial parameters same as previous/desktop to maintain consistency
    const cx = canvas.width / 2;
    const cy = canvas.height * 1.1; // Original center
    const radius = (centerImageSize / 2) - 10; // Original radius
    const segment = (Math.PI * 2) / numPoints;

    let activeIdx = Math.round(currentRotation / segment) % numPoints;
    if (activeIdx < 0) activeIdx += numPoints;
    updateUI(activeIdx);

    // Draw Central Image
    if (centerImg.complete) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-currentRotation);
        ctx.drawImage(centerImg, -centerImageSize / 2, -centerImageSize / 2, centerImageSize, centerImageSize);
        ctx.restore();
    }

    // Draw Event Names on Wheel
    events.forEach((event, i) => {
        const angle = (i * segment) - (Math.PI / 2) - currentRotation;
        const normalizedAngle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
        const distFromTop = Math.abs(normalizedAngle + Math.PI / 2);
        const highlight = Math.max(0, 1 - distFromTop * 2.5);

        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        if (y < canvas.height + 200) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            const fontSize = (14 + highlight * 10); // Maintain desktop size for dial text
            ctx.font = `bold ${fontSize}px 'Font2'`;
            ctx.fillStyle = highlight > 0.3 ? event.color : `rgba(255,255,255,${0.2 + highlight})`;
            ctx.fillText('   ' + event.name.toUpperCase(), 10, 0);
            ctx.restore();
        }
    });

    requestAnimationFrame(draw);
}

function viewEventDetails() {
    if (currentIdx >= 0 && currentIdx < events.length) {
        const event = events[currentIdx];

        // Create event data object with all needed information
        const eventData = {
            thematic: event.thematic,
            name: event.name,
            participants: event.participants,
            category: event.category,
            color: event.color,
            desc: event.desc,
            logo: event.logo
        };

        // Store event data in localStorage
        localStorage.setItem('selectedEvent', JSON.stringify(eventData));

        // Redirect to details page
        window.location.href = 'event-details.html';
    }
}
// Variable to track total movement (combining vertical and horizontal)
let totalScroll = 0;

window.addEventListener('wheel', (e) => {
    // Combine both vertical (deltaY) and horizontal (deltaX) scrolling
    totalScroll += e.deltaY + e.deltaX;
    
    // Clamp the scroll so it doesn't go below 0 or above a max limit
    const maxLimit = 5000; // Adjust this based on how fast you want the wheel to spin
    totalScroll = Math.max(0, Math.min(totalScroll, maxLimit));
    
    targetRotation = (totalScroll / maxLimit) * (Math.PI * 2);
}, { passive: true });

// Mobile Touch Support (Swiping)
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    // Calculate movement in both directions
    const dx = touchStartX - touchEndX;
    const dy = touchStartY - touchEndY;
    
    totalScroll += (dx + dy) * 1.5; // Multiplier for sensitivity
    
    const maxLimit = 5000;
    totalScroll = Math.max(0, Math.min(totalScroll, maxLimit));
    
    targetRotation = (totalScroll / maxLimit) * (Math.PI * 2);
    
    // Update starts for continuous movement
    touchStartX = touchEndX;
    touchStartY = touchEndY;
});
window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetRotation = (window.scrollY / maxScroll) * (Math.PI * 2);
});
let isDragging = false;
let startAngle = 0;
let lastRotation = 0;

// Helper to get the angle of the mouse/touch relative to the wheel center
function getAngle(x, y) {
    const cx = canvas.width / 2;
    const cy = canvas.height * 1.1; // Matching your 'cy' in the draw function
    return Math.atan2(y - cy, x - cx);
}

// Interaction Start
function handleStart(e) {
    isDragging = true;
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    startAngle = getAngle(x, y) + currentRotation;
}

// Interaction Move
function handleMove(e) {
    if (!isDragging) return;
    
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    
    const currentMouseAngle = getAngle(x, y);
    targetRotation = startAngle - currentMouseAngle;
}

// Interaction End
function handleEnd() {
    isDragging = false;
}

// Event Listeners for Mouse
canvas.addEventListener('mousedown', handleStart);
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);

// Event Listeners for Touch (Mobile)
canvas.addEventListener('touchstart', handleStart, { passive: false });
window.addEventListener('touchmove', (e) => {
    handleMove(e);
    if(isDragging) e.preventDefault(); // Stop page from bouncing
}, { passive: false });
window.addEventListener('touchend', handleEnd);

// Keep the Wheel Scroll for convenience
window.addEventListener('wheel', (e) => {
    targetRotation += e.deltaY * 0.002;
}, { passive: true });
window.addEventListener('resize', resize);
centerImg.onload = () => { resize(); draw(); updateUI(0); };
resize();