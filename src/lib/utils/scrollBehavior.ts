// Easing function (easeInOutCubic): acelera al principio y desacelera al final
const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const smoothScrollToTop = (duration = 2000) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        window.scrollTo(0, start * (1 - easedProgress));
        if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};