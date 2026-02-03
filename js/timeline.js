const canvas = document.getElementById('circleCanvas');
        const ctx = canvas.getContext('2d');

        const events = [
            { thematic: "The Eternal Ascendant", name: "Best Manager", participants: "Solo", category: "Management", color: "#05D0FF", desc: "A place where time doesn’t just pass, it tests you. Not to simply be a manager, but to prove yourself as a strong individual shaped by skill, determination and growth. Best Manager is more than an event. It challenges you to take a leap of faith, to step into a version of yourself you didn’t even know existed. One Participant. One Best Manager. One Universe. Be at your sharpest, because you never know when a shooting star will hit your path. ", logo: "../assets/logos/best_manager.webp" },
            { thematic: "Red Alert 404", name: "IT Manager", participants: "Solo", category: "Technology", color: "#FFAC72", desc: "The IT Manager Competition is a college-level individual event designed to simulate the real responsibilities of an IT manager in a fast-paced professional environment. The competition focuses on developing and assessing leadership, communication, decision-making, time management, and problem-solving skills.", logo: "../assets/logos/it_manager.webp" },
            { thematic: "Rift In Reality", name: "Web Development", participants: "Team (2)", category: "Technology", color: "#05D0FF", desc: "The Web Development event is a competitive, skill-oriented program designed to evaluate participants on modern web design fundamentals, creativity, and problem-solving ability using core web technologies.", logo: "../assets/logos/web-design.webp" },
            { thematic: "The Human Epix", name: "HR Challenge", participants: "Team (2)", category: "Management", color: "#FFAC72", desc: " Step into a temporal vortex where you manage the most volatile asset in the universe: people, across the past, present, and future of Indian industry. The Human Epix tests your ability to adapt, legislate, and survive the ultimate corporate evolution.", logo: "../assets/logos/hr.webp" },
            { thematic: "Nexus Odyssey", name: "Marketing", participants: "Team (2)", category: "Business", color: "#05D0FF", desc: "Embark on NEXUS ODYSSEY, an immersive marketing challenge where teams of two travel through a multidimensional timeline of trade and innovation. From ancient silk roads to the AI-driven markets of tomorrow, you must adapt your strategies across eras to prove that true marketing genius is timeless.", logo: "../assets/logos/marketing.webp" },
            { thematic: "Capital Paradox", name: "Finance Fusion", participants: "Team (2)", category: "Business", color: "#FFAC72", desc: "Control the global flow of assets. Navigate high-stakes financial risk and temporal stock simulations.", logo: "../assets/logos/finance.webp" },
            { thematic: "Chronopreneur", name: "Team Entrepreneurship", participants: "Team (2)", category: "Entrepreneurship", color: "#05D0FF", desc: "Dive into the high-stakes world of ChronoPreneur, a thrilling two-player entrepreneurship challenge where strategy and adaptability are the keys to survival. Face a series of intense surprise rounds designed to test your business acumen and teamwork in real-time—only the most agile minds will conquer the clock and claim victory.", logo: "../assets/logos/entreprenorship.webp" },
            { thematic: "Renewed From Ruins", name: "Best From Waste", participants: "Team (2)", category: "Creativity", color: "#FFAC72", desc: "Transform discarded relics into timeless treasures in Renewed from Ruins, a high-stakes sustainability challenge where teams of two breathe new life into waste. Under the theme Vintage Revival you'll have two hours to prove that old is gold by crafting original, value-driven products that champion environmental impact and creative ingenuity.", logo: "../assets/logos/waste-art.webp" },
            { thematic: "Soul In Focus", name: "Photography Challenge", participants: "Solo", category: "Arts", color: "#05D0FF", desc: "Capture the essence of campus life through SOUL IN FOCUS, an intensive mobile-only challenge where your lens uncovers the stories hidden in everyday objects and raw emotions. From evocative stills to cinematic short films, this event dares you to prove that the most powerful storytelling comes from the soul, not the equipment.", logo: "../assets/logos/photo.webp" },
            { thematic: "ChronoQuest", name: "Quiz", participants: "Team (2)", category: "Academic", color: "#FFAC72", desc: "Test your intellect and strategic nerves in the Yenixa 2026 Quiz, a multi-stage battle ranging from fast-paced Kahoot heats to high-stakes bidding wars. Sharpen your wits for the final buzzer round where quick reflexes and precise knowledge determine who walks away with the grand cash prize.", logo: "../assets/logos/quiz.webp" },
            { thematic: "TimeLoop", name: "Coding", participants: "Team (2)", category: "Technology", color: "#05D0FF", desc: "Put your logic to the ultimate test in TimeLoop Code, a high-intensity programming challenge where duos battle through complex algorithms and data structures. Working on provided systems, teams must synchronize their expertise in C, C++, or Python to solve intricate problems under strict time constraints and rigorous logic.", logo: "../assets/logos/coding.webp" },
            { thematic: "Re-Coded Bits", name: "E-Sports Arena", participants: "Team (2)", category: "Gaming", color: "#FFAC72", desc: "Prepare for ultimate digital dominance in our Esports Arena, featuring high-octane showdowns across both Mobile and PC platforms. Whether you're dominating the battlefield in BGMI or outmaneuvering opponents in Valorant and FC 24, this is your chance to showcase elite gaming skills and claim the championship title.", logo: "../assets/logos/esports.webp" },
            { thematic: "Palimpsest", name: "Mock Press", participants: "Solo", category: "Communication", color: "#05D0FF", desc: "Palimpsest is an interactive acting experience where characters evolve, rules shift, and no two journeys look the same.Each round introduces a new layer, encouraging creativity, adaptability, and thoughtful choices—without expecting perfection.", logo: "../assets/logos/mock_press.webp" },
            { thematic: "Fireless Flavors In Time", name: "Cooking Without Fire", participants: "Team (3)", category: "Culinary", color: "#FFAC72", desc: "To showcase their creativity, plating skills, and taste innovation, all without using fire.", logo: "../assets/logos/cooking.webp" },
            { thematic: "TimeShift", name: "League Of Legends", participants: "Team (2)", category: "Strategy", color: "#05D0FF", desc: "Time Shift is a high-energy, surprise-driven competitive event designed for teams of two participants. Inspired by the spirit of league-style tournaments, this event tests not just knowledge, but teamwork, adaptability, mental agility, and physical coordination. Each round throws unexpected challenges at the teams—where strategy matters as much as strength, and communication is the key to survival. Only teams that think together, act together, and adapt quickly will advance to the next round.", logo: "../assets/logos/league.webp" },
            { thematic: "The Midnight Equation", name: "Mystery Case Solving", participants: "Team (3)", category: "Mystery", color: "#FFAC72", desc: "This event is basically about a individuals critical and logical thinking. The team work also matter a lot on how they crack the hurdles and path their path to reach their goal.", logo: "../assets/logos/mistory.webp" },
            { thematic: "Chrono Couture", name: "Face Painting & Ramp Walk", participants: "Team (2)", category: "Arts", color: "#05D0FF", desc: "Merge artistic mastery with stage presence in CHRONO COUTURE, a dual-round challenge where the theme of Time Travel comes to life. Transform your canvas during an intensive face painting session before taking to the stage for a coordinated ramp walk that blends costume, concept, and confidence.", logo: "../assets/logos/face_painting.webp" }
        ];
        const numPoints = events.length;
        const centerImageSize = 600;
        const centerImg = new Image();
        centerImg.src = '../assets/time_travel.webp';

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

        window.addEventListener('scroll', () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetRotation = (window.scrollY / maxScroll) * (Math.PI * 2);
        });

        window.addEventListener('resize', resize);
        centerImg.onload = () => { resize(); draw(); updateUI(0); };
        resize();