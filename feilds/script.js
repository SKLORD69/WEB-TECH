// Random retro-futuristic background generator
        function generateRetroFuturisticBackground() {
            const canvas = document.getElementById('background-canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to match window
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0a0a2e');
            gradient.addColorStop(1, '#1a0b35');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid pattern
            const gridSpacing = 50;
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(157, 0, 255, 0.2)';

            // Draw horizontal lines
            for (let y = 0; y < canvas.height; y += gridSpacing) {
                // Add slight perspective effect
                const opacity = 0.2 - (y / canvas.height) * 0.15;
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;

                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw vertical lines
            for (let x = 0; x < canvas.width; x += gridSpacing) {
                ctx.strokeStyle = 'rgba(157, 0, 255, 0.1)';
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Add random glowing particles
            const particleCount = 150;

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 2 + 1;

                // Choose random particle color
                const colors = ['#00f3ff', '#9d00ff', '#ff00e6'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                ctx.beginPath();
                const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
                glow.addColorStop(0, color);
                glow.addColorStop(1, 'transparent');

                ctx.fillStyle = glow;
                ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Add a few horizontal "scan lines"
            ctx.globalAlpha = 0.05;
            ctx.fillStyle = '#ffffff';

            for (let i = 0; i < canvas.height; i += 4) {
                ctx.fillRect(0, i, canvas.width, 1);
            }

            ctx.globalAlpha = 1.0;
        }

        // Handle window resize
        window.addEventListener('resize', generateRetroFuturisticBackground);

        // Initial generation and periodic refresh
        generateRetroFuturisticBackground();
        setInterval(generateRetroFuturisticBackground, 5000); // Regenerate every 5 seconds
