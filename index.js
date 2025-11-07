(function () {
    // Elements
    const slider = document.getElementById('slider'); // viewport/container (has overflow:hidden)
    const items = document.getElementById('items'); // flex row holding slides
    if (!slider || !items) return;

    // Original slides (before clones)
    const originalSlides = Array.from(items.querySelectorAll('.slide'));
    const originalCount = originalSlides.length;
    if (originalCount === 0) return;

    // Buttons / dots container should already be in DOM
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');

    // State
    let slides = []; // updated slides array (with clones)
    let viewportWidth = 0; // measured width of the slider viewport (px)
    let index = 1; // logical index in extended slides (1..originalCount)
    let isAnimating = false;
    let rafId = null;

    // Drag state
    let isDown = false;
    let startX = 0;
    let prevTranslate = 0;
    let currentTranslate = 0;
    let activePointerId = null;

    // --- Create clones for infinite looping (prepend last, append first) ---
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalCount - 1].cloneNode(true);
    items.appendChild(firstClone);
    items.prepend(lastClone);

    // refresh slides collection
    slides = Array.from(items.querySelectorAll('.slide')); // order: clone-last, orig1..origN, clone-first

    // --- Build dots (one per original slide) ---
    dotsContainer.innerHTML = '';
    for (let i = 0; i < originalCount; i++) {
        const dot = document.createElement('button');
        dot.className =
            'w-3 h-3 rounded-full bg-gray-500 hover:bg-white transition-colors duration-200';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        // logical index for original slides is i+1
        dot.addEventListener('click', () => {
            if (isAnimating) return;
            index = i + 1;
            animateToIndex();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = Array.from(dotsContainer.children);

    // --- Measurement & positioning helpers ---
    function measureViewport() {
        // Use the slider container width (this accounts for container padding like px-4)
        const rect = slider.getBoundingClientRect();
        viewportWidth = rect.width;
    }

    function setTransform(px, withTransition = false) {
        items.style.transition = withTransition
            ? 'transform 0.45s cubic-bezier(.22,.9,.27,1)'
            : 'none';
        // Use translate3d for GPU acceleration and sub-pixel accuracy
        items.style.transform = `translate3d(${px}px,0,0)`;
    }

    function getTargetTranslateForIndex(idx) {
        // idx is extended index (0..originalCount+1). We position at -idx * viewportWidth
        return -Math.round(idx * viewportWidth);
    }

    // Update active dot - map extended index -> original index (0..originalCount-1)
    function updateActiveDot() {
        const originalIndex =
            (((index - 1) % originalCount) + originalCount) % originalCount;
        dots.forEach((d) => d.classList.remove('bg-white'));
        const active = dots[originalIndex];
        if (active) active.classList.add('bg-white');
    }

    // Animate to current index (index should be within extended set: 0..originalCount+1)
    function animateToIndex() {
        isAnimating = true;
        // snap exactly to -index * viewportWidth
        const px = getTargetTranslateForIndex(index);
        setTransform(px, true);
        updateActiveDot();
    }

    // Next / Prev move exactly one slide
    function next() {
        if (isAnimating) return;
        index++;
        animateToIndex();
    }
    function prev() {
        if (isAnimating) return;
        index--;
        animateToIndex();
    }

    // Handle transition end: if we landed on a clone, jump to the matching original without transition
    items.addEventListener('transitionend', () => {
        // appended first clone case: index === originalCount + 1 -> jump to index = 1
        if (index === originalCount + 1) {
            setTransform(getTargetTranslateForIndex(1), false);
            index = 1;
        }
        // prepended last clone case: index === 0 -> jump to index = originalCount
        if (index === 0) {
            setTransform(getTargetTranslateForIndex(originalCount), false);
            index = originalCount;
        }
        // tiny delay to avoid rapid double triggers; then clear animating flag
        window.setTimeout(() => {
            isAnimating = false;
        }, 20);
        updateActiveDot();
    });

    // ---------- Pointer dragging (pointer events) ----------
    function onPointerDown(e) {
        // accept primary mouse button or touch/pen
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        // If a transition is active, cancel it and allow drag
        isAnimating = false;
        items.style.transition = 'none';

        activePointerId = e.pointerId;
        items.setPointerCapture(activePointerId);

        isDown = true;
        startX = e.clientX;
        prevTranslate = getTargetTranslateForIndex(index); // baseline translate at drag start
        currentTranslate = prevTranslate;

        // start RAF loop to set transform
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(renderWhileDragging);
    }

    function onPointerMove(e) {
        if (!isDown || e.pointerId !== activePointerId) return;
        const dx = e.clientX - startX;
        currentTranslate = prevTranslate + dx;
    }

    function onPointerUp(e) {
        if (!isDown || e.pointerId !== activePointerId) return;
        isDown = false;
        items.releasePointerCapture(activePointerId);
        cancelAnimationFrame(rafId);

        // Decide whether to change slide
        const movedBy = currentTranslate - prevTranslate; // negative if moved left
        // threshold: 15% of viewport or minimum 40px
        const threshold = Math.max(viewportWidth * 0.15, 40);

        if (movedBy < -threshold) {
            index++;
        } else if (movedBy > threshold) {
            index--;
        }
        // Snap to chosen index
        animateToIndex();
    }

    function renderWhileDragging() {
        // apply live transform while dragging
        items.style.transform = `translate3d(${currentTranslate}px,0,0)`;
        if (isDown) rafId = requestAnimationFrame(renderWhileDragging);
    }

    // Prevent native image dragging interfering with pointer drag
    items.addEventListener('dragstart', (e) => e.preventDefault());

    // Attach pointer listeners
    items.addEventListener('pointerdown', onPointerDown);
    items.addEventListener('pointermove', onPointerMove);
    items.addEventListener('pointerup', onPointerUp);
    items.addEventListener('pointercancel', onPointerUp);
    items.addEventListener('pointerleave', (e) => {
        // pointerleave may be fired while dragging; treat as up if same pointer
        if (isDown && e.pointerId === activePointerId) onPointerUp(e);
    });

    // Attach arrows
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    // Recompute viewport width and reposition (keeps the same logical index visible)
    function recomputeAndReposition() {
        measureViewport();
        // ensure we are exactly aligned to the logical index
        setTransform(getTargetTranslateForIndex(index), false);
    }

    // Use ResizeObserver to catch layout/container changes robustly
    const ro = new ResizeObserver(() => {
        // debounce a tiny bit
        clearTimeout(ro._t);
        ro._t = setTimeout(() => recomputeAndReposition(), 60);
    });
    ro.observe(slider);

    // Also measure once on load (in case fonts or images affect layout)
    window.addEventListener('load', () => {
        recomputeAndReposition();
        updateActiveDot();
    });

    // Initialize right away
    measureViewport();
    // start at first original slide (extended index = 1)
    index = 1;
    setTransform(getTargetTranslateForIndex(index), false);
    updateActiveDot();
})();
