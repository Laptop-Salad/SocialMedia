document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)
});

const lenis = new Lenis();

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

let scrollables = gsap.utils.toArray(".container");

    scrollables.forEach(scrollable => {
    let sections = scrollable.querySelectorAll('.panel');

    let tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
            trigger: scrollable,
            pin: true,
            scrub: 3,
            end: () => "+=" + (scrollable.offsetWidth * sections.length)
        }
    })

    tl.to(scrollable, {
        xPercent: -100 * (sections.length - 1),
    })

    sections.forEach(section => {
        // Typewriting
        const typewriting = section.querySelectorAll(".typewriting")

        typewriting.forEach(typewrite => {
            ScrollTrigger.create({
                trigger: typewrite,
                containerAnimation: tl,
                onEnter: () => typeWrite(typewrite),
            })
        })

        // Checkmarks
        const checkConts = section.querySelectorAll(".check-container");

        checkConts.forEach(checkCont => {
            ScrollTrigger.create({
                trigger: section,
                containerAnimation: tl,
                onEnter: () => check(checkCont),
                onEnterBack: () => check(checkCont),
            });
        })
    })
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

function typeWrite(element) {
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
}

function check(checkCont) {
    let checks = checkCont.querySelectorAll('.check');
    let i = 0;

    const checker = () => {
        if (i >= checks.length) {
            return;
        }

        checks[i].classList.add('fa-solid');
        checks[i].classList.add('fa-check');

        i += 1;

        setTimeout(checker, 200);
    }

    checker()
}

gsap.utils.toArray(".reveal").forEach(element => {
    gsap.from(element, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            toggleActions: "play reverse play reverse"
        }
    })
});