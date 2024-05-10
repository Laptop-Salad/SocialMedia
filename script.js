document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)
});

const tl = gsap.timeline();
let scrollables = gsap.utils.toArray(".container");

scrollables.forEach(scrollable => {
    const panels = scrollable.querySelectorAll(".panel");

    gsap.to(scrollable, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: scrollable,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            // base vertical scrolling on how wide the container is so it feels more natural.
            end: "+=3500",
        }
    });
})

// ** Increase numbers **
const increaseNum = document.querySelectorAll(".increase-num");

increaseNum.forEach(num => {
    gsap.from(num, {
        scrollTrigger: {
            trigger: num,
            toggleActions: "play pause resume reset",
        },
        textContent: 0,
        duration: 4,
        ease: Power1.easeIn,
        snap: {textContent: 1},
        stagger: 0,
    });
})

// Typewriting
const typewriting = document.querySelectorAll(".typewriting");

typewriting.forEach(element => {
    let text = element.textContent; // store text content
    element.textContent = ''; // clear on element
    let i = 0;

    const typeWriter = () => {
        // iterate through
        if (i < text.length) {
            // add 1 character from stored to element
            element.textContent += text.charAt(i);
            i++;
            // sleep for 100ms
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();
});

// Float to top
const floatToTop = document.querySelectorAll(".float-to-top");

floatToTop.forEach(float => {
    gsap.from(float, {
        scrollTrigger: {
            trigger: float,
        },
        y: 400,
        top: 0,
        opacity: 0,
        duration: 4,
        ease: Power1.easeIn,
        stagger: 0,
    });
})