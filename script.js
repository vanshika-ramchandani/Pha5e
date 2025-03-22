let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    let header = document.querySelector('header');
    if (window.scrollY > lastScrollY) {
        header.classList.add('hide-header');
    } else {
        header.classList.remove('hide-header');
    }
    lastScrollY = window.scrollY;
});

document.querySelectorAll('.image-container').forEach(container => {
    let placeholder = document.createElement('img');
    placeholder.src = 'data/placeholder.svg'; 
    placeholder.classList.add('placeholder');
    container.appendChild(placeholder);

    container.addEventListener('mouseenter', () => {
        document.getElementById('maintext').style.color = 'transparent';
        document.getElementById('maintext').style.webkitTextStroke = '1px rgba(255, 255, 255, 0.1)';
        document.getElementById('maintext').style.zIndex = 1;

        document.querySelectorAll('.image-container').forEach(otherContainer => {
            if (otherContainer !== container) {
                let img = otherContainer.querySelector('img');
                let placeholder = otherContainer.querySelector('.placeholder');

                img.style.opacity = '0';
                placeholder.style.opacity = '1';
            }
        });
    });

    container.addEventListener('mouseleave', () => {
        document.getElementById('maintext').style.color = 'white';
        document.getElementById('maintext').style.webkitTextStroke = '0px';
        document.getElementById('maintext').style.zIndex = 2;

        document.querySelectorAll('.image-container').forEach(otherContainer => {
            let img = otherContainer.querySelector('img');
            let placeholder = otherContainer.querySelector('.placeholder');

            img.style.opacity = '1';
            placeholder.style.opacity = '0';
        });
    });
});

document.querySelectorAll('.image-container').forEach(container => {
    const movementRange = 150; 
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function animate() {
        if (!isHovering) return;
        currentX = lerp(currentX, targetX, 0.07); 
        currentY = lerp(currentY, targetY, 0.07);
        container.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(animate);
    }

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        targetX = ((e.clientX - centerX) / rect.width) * movementRange;
        targetY = ((e.clientY - centerY) / rect.height) * movementRange;

        if (!isHovering) {
            isHovering = true;
            requestAnimationFrame(animate);
        }
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        container.style.transition = 'transform 1s ease-out';
        container.style.transform = 'translate(0, 0)';

        setTimeout(() => {
            container.style.transition = '';
        }, 1000);
    });
});
