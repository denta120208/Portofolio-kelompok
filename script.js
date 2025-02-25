document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const textContainer = document.querySelector('.text-container');
    const textLines = document.querySelectorAll('.text-line');
    const imageBoxes = document.querySelectorAll('.image-box');
    
    // Initial animation for container and text
    setTimeout(() => {
        container.style.transform = 'scaleY(1)';
        
        setTimeout(() => {
            textContainer.style.opacity = '1';
            textContainer.style.transform = 'translateY(0)';
            
            textLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, index * 400);
            });
            
            // Show first image after text animation completes
            setTimeout(() => {
                if (imageBoxes.length > 0) {
                    imageBoxes[0].classList.add('visible');
                }
            }, textLines.length * 400 + 200);
            
        }, 1200);
    }, 100);
    
    // Enhanced scroll animation for mobile
    if (window.innerWidth <= 768) {
        // Using Intersection Observer for better performance
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If element is entering the viewport
                if (entry.isIntersecting) {
                    // Add a small delay for sequential animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 150);
                } else {
                    // Optional: Hide elements when they leave viewport for reanimation on scroll back
                    // entry.target.classList.remove('visible');
                }
            });
        }, options);
        
        // Observe all image boxes except the first one (which is shown after initial animation)
        imageBoxes.forEach((box, index) => {
            if (index > 0) {
                observer.observe(box);
            }
        });
    } else {
        // Desktop horizontal scroll animation
        function handleHorizontalScroll() {
            imageBoxes.forEach((box) => {
                const rect = box.getBoundingClientRect();
                const isVisible = (
                    rect.left <= (window.innerWidth || document.documentElement.clientWidth) * 0.8 &&
                    rect.right >= 0
                );
                
                if (isVisible && !box.classList.contains('visible')) {
                    box.classList.add('visible');
                }
            });
        }
        
        // Add scroll event listener for horizontal scrolling
        container.addEventListener('scroll', handleHorizontalScroll);
        
        // Initial check for visible elements
        setTimeout(handleHorizontalScroll, 1500);
    }
});
