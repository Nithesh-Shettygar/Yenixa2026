document.addEventListener('DOMContentLoaded', function () {
    // Animate Logos
    const logos = document.querySelectorAll('.logo');
    setTimeout(() => logos.forEach(l => l.classList.add('animate')), 300);

    // Card Entrance Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(s => observer.observe(s));
    // Time Travel Portal Animation
    // Time Travel Portal Animation - Only animates image, not text
    // Time Travel Portal Animation with Black Background
    // Reset the portal state when the user navigates back to this page
    window.addEventListener('pageshow', function (event) {
        const trigger = document.getElementById('timeLeapTrigger');
        const blackOverlay = document.getElementById('blackOverlay');
        const leapFlash = document.getElementById('leapFlash');

        if (trigger) {
            // 1. Restore the original portal visibility
            trigger.style.opacity = '1';
            trigger.style.pointerEvents = 'auto';

            // 2. Show the text again
            const portalText = trigger.querySelector('.portal-status-text');
            if (portalText) portalText.style.display = 'block';
        }

        // 3. Remove all animation/overlay classes
        if (blackOverlay) blackOverlay.classList.remove('active');
        if (leapFlash) leapFlash.classList.remove('flash-active');
        document.body.classList.remove('body-leap-active');
        document.body.style.pointerEvents = 'auto';

        // 4. Remove any leftover cloned images from previous animations
        const leftovers = document.querySelectorAll('.portal-image-leaping');
        leftovers.forEach(el => el.remove());
    });

    

    const timeLeapTrigger = document.getElementById('timeLeapTrigger');
    const leapFlash = document.getElementById('leapFlash');
    const blackOverlay = document.getElementById('blackOverlay');

    if (timeLeapTrigger) {
        timeLeapTrigger.addEventListener('click', function () {
            // Add class to body to darken other content
            document.body.classList.add('body-leap-active');

            // Activate black overlay
            if (blackOverlay) {
                blackOverlay.classList.add('active');
            }

            // Get the image element
            const portalImage = this.querySelector('.portal-image');

            // Hide the text immediately
            const portalText = this.querySelector('.portal-status-text');
            portalText.style.display = 'none';

            // Clone only the image for animation
            const imageClone = portalImage.cloneNode(true);
            imageClone.classList.add('portal-image-leaping');

            // Position the cloned image
            const rect = this.getBoundingClientRect();
            imageClone.style.position = 'fixed';
            imageClone.style.top = rect.top + rect.height / 2 + 'px';
            imageClone.style.left = rect.left + rect.width / 2 + 'px';
            imageClone.style.transform = 'translate(-50%, -50%)';
            imageClone.style.zIndex = '9999';

            document.body.appendChild(imageClone);

            // Trigger flash effect (this will transition to black)
            leapFlash.classList.add('flash-active');

            // Hide original portal during animation
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';

            // Prevent any interaction during animation
            document.body.style.pointerEvents = 'none';

            // Redirect after animation completes
            setTimeout(() => {
                window.location.href = 'timeline.html';
            }, 4000);

            // Clean up after animation (in case redirect fails)
            setTimeout(() => {
                imageClone.remove();
                leapFlash.classList.remove('flash-active');
                if (blackOverlay) {
                    blackOverlay.classList.remove('active');
                }
                document.body.classList.remove('body-leap-active');
                document.body.style.pointerEvents = 'auto';
            }, 4500);
        });
    }

    // Enhanced sponsor slider animation
    function initSponsorSlider() {
        const track = document.querySelector('.sponsor-track');
        if (!track) return;

        // Clone the sponsor logos for seamless loop
        const logos = track.querySelectorAll('img');
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Call this after DOM is loaded
    initSponsorSlider();
    // Countdown Timer
    function updateCountdown() {
        // Set the target date (March 15, 2026)
        const targetDate = new Date('February 16, 2026 09:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft < 0) {
            // Event has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Add pulse animation to seconds for visual interest
        if (seconds % 2 === 0) {
            document.getElementById('seconds').style.color = '#ff3366';
        } else {
            document.getElementById('seconds').style.color = '#ff6699';
        }
    }

    // Initialize countdown and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Main Scroll Loop
    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;

        // 1. Clock Rotation
        const clock = document.querySelector('.scroll-clock');
        const content = document.querySelector('.content');
        if (clock && content) {
            const contentTop = content.offsetTop;
            if (scrollY > contentTop - window.innerHeight) {
                let clockRot = (scrollY - contentTop + 200) * 0.3;
                clock.style.transform = `rotate(${clockRot}deg)`;
            }
        }

        // 2. Optional: Add subtle parallax to logos on scroll
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer && scrollY < window.innerHeight) {
            const logoParallax = scrollY * 0.3;
            logoContainer.style.transform = `translate(-50%, calc(-50% - ${logoParallax}px))`;
        }
    });

    // Add hover effect to time blocks
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        block.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
const bgVideo = document.querySelector('.bg-video');

if (bgVideo) {
    // Force the video to loop manually before the browser hits the "end"
    bgVideo.addEventListener('timeupdate', function() {
        // We trigger the reset 0.1 seconds before the actual end
        const offset = 0.1; 
        if (this.currentTime >= this.duration - offset) {
            this.currentTime = 0;
            this.play();
        }
    });

    // iOS Power Mode Fix: Ensure it doesn't pause when the phone enters low power mode
    bgVideo.play().catch(() => {
        // Auto-play was prevented, wait for first user interaction
        document.addEventListener('click', () => bgVideo.play(), { once: true });
    });
}
    // Add smooth scrolling for anchor links (if any are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

