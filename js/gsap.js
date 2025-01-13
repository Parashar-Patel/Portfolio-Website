function adjustAnimationsForScreenSize() {
    const screenWidth = window.innerWidth;

    let tlnav = gsap.timeline();
    let tlHeroText = gsap.timeline();

    // Navigation animations (same for both mobile and laptop)
    tlnav.from("#logo", {
        y: -30,
        duration: 0.3,
        opacity: 0,
    });

    tlnav.from(".navItems h3", {
        y: -30,
        duration: 0.3,
        opacity: 0,
        stagger: 0.1,
    });

    // Hero text animations (same for both mobile and laptop)
    const heroTextElements = gsap.utils.toArray("#heroTextList h1");

    for (let i = 0; i < heroTextElements.length; i++) {
        const element = heroTextElements[i];
        const delay = i * 3.5 + 1; // 1-second default delay + 2.5 seconds delay between each element

        gsap.from(element, {
            y: -20,
            opacity: 0,
            duration: 2,
            delay: delay,
            onComplete: () => {
                if (i !== heroTextElements.length - 1) {
                    gsap.to(element, {
                        y: 20,
                        opacity: 0,
                        duration: 1,
                        delay: 0.33,
                    });
                }
            },
        });
    }

    // Scroll-triggered animation (only for laptop)
    if (screenWidth > 1024) {
        gsap.to("h1", {
            transform: "translateX(-318rem)",
            scrollTrigger: {
                trigger: "#mainSlider",
                scroller: "body",
                start: "top 0%",
                end: "top -200%",
                scrub: 2,
                pin: true,
                onUpdate: () => {
                    // Disable cursor follower during scroll-triggered animation
                    isScrolling = true;
                },
                onComplete: () => {
                    // Re-enable cursor follower after animation
                    isScrolling = false;
                },
            },
        });

        let isAnimating = false;

        function updateCursorPosition(e) {
            if (isAnimating) return;

            isAnimating = true;
            setTimeout(() => {
                requestAnimationFrame(() => {
                    const circle = document.getElementById('circle');
                    const height = circle.offsetHeight;
                    const width = circle.offsetWidth;
        
                    if (e.target.tagName === 'A' || 
                        e.target.tagName === 'BUTTON' || 
                        e.target.parentNode.tagName === 'BUTTON') {
                        circle.classList.add('big');
                    } else {
                        circle.classList.remove('big');
                    }
        
                    circle.style.left = `${e.clientX - width / 2}px`;
                    circle.style.top = `${e.clientY - height / 2}px`;
        
                    isAnimating = false;
                });
            }, 20);
        }

        document.addEventListener('mousemove', updateCursorPosition);
    }
}

// Call the function on page load and window resize
window.addEventListener("load", adjustAnimationsForScreenSize);
// window.addEventListener("resize", adjustAnimationsForScreenSize);