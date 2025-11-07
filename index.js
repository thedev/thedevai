const CAROUSEL = document.querySelector('.r-carousel');
const WRAPPER = CAROUSEL.querySelector('.wrapper');
const SLIDES = Array.from(WRAPPER.children);
const BTN_NEXT = CAROUSEL.querySelector('.btn-next');
const BTN_PREV = CAROUSEL.querySelector('.btn-prev');
const DOTS_CONTAINER = CAROUSEL.querySelector('.dots');

let curIndex = 0;
let slideWidth = CAROUSEL.clientWidth;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Initialize carousel
function initCarousel() {
    generateDots();
    updateDots();
    setWrapperPosition();
    window.addEventListener('resize', () => {
        slideWidth = CAROUSEL.clientWidth;
        setWrapperPosition();
    });

    // Arrow events
    BTN_NEXT.addEventListener('click', () => moveTo(curIndex + 1));
    BTN_PREV.addEventListener('click', () => moveTo(curIndex - 1));

    // Drag events
    WRAPPER.addEventListener('mousedown', dragStart);
    WRAPPER.addEventListener('mouseup', dragEnd);
    WRAPPER.addEventListener('mouseleave', dragEnd);
    WRAPPER.addEventListener('mousemove', dragMove);
    WRAPPER.addEventListener('touchstart', dragStart);
    WRAPPER.addEventListener('touchend', dragEnd);
    WRAPPER.addEventListener('touchmove', dragMove);
}

function generateDots() {
    DOTS_CONTAINER.innerHTML = '';
    SLIDES.forEach((_, i) => {
        const dot = document.createElement('li');
        dot.className = 'w-3 h-3 rounded-full bg-zinc-700 cursor-pointer';
        dot.addEventListener('click', () => moveTo(i));
        DOTS_CONTAINER.appendChild(dot);
    });
}

function updateDots() {
    const dots = DOTS_CONTAINER.querySelectorAll('li');
    dots.forEach((dot) => dot.classList.remove('bg-white'));
    dots[curIndex].classList.add('bg-white');
}

function setWrapperPosition() {
    WRAPPER.style.transform = `translateX(${-curIndex * slideWidth}px)`;
}

function moveTo(index) {
    curIndex = index;
    if (curIndex < 0) curIndex = SLIDES.length - 1;
    if (curIndex >= SLIDES.length) curIndex = 0;
    WRAPPER.style.transition = 'transform 0.3s ease-in-out';
    setWrapperPosition();
    updateDots();
}

// Drag functions
function dragStart(event) {
    isDragging = true;
    startX = event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
    prevTranslate = -curIndex * slideWidth;
    WRAPPER.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
}

function dragMove(event) {
    if (!isDragging) return;
    const currentX = event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
    const delta = currentX - startX;
    currentTranslate = prevTranslate + delta;
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) moveTo(curIndex + 1);
    else if (movedBy > 50) moveTo(curIndex - 1);
    else moveTo(curIndex);
}

function animation() {
    setWrapperX(currentTranslate);
    if (isDragging) requestAnimationFrame(animation);
}

function setWrapperX(posX) {
    WRAPPER.style.transform = `translateX(${posX}px)`;
}

// Init
initCarousel();
