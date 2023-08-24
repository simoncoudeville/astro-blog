// add an element .page-header-observer.page-header-observer before .js-page-header if .js-page-header exists
if (document.querySelector('.js-page-header')) {
    let pageHeaderObserver = document.createElement('div');
    pageHeaderObserver.classList.add('page-header-observer');
    pageHeaderObserver.classList.add('js-page-header-observer');
    document.querySelector('.js-page-header').insertAdjacentElement('beforebegin', pageHeaderObserver);
}

// // a variable of js-page-header's height in pixels
let pageHeaderHeight = document.querySelector('.js-page-header').offsetHeight.toString() + 'px';

// // function that is able to check whether an element is in view and put a class on it with options to set the element, the class and the treshold
function checkInView(element, className, treshold, rootMargin) {
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting === false) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        });
    }, {
        threshold: [treshold],
        rootMargin: [rootMargin]
    });
    observer.observe(element);
}

// // check if js-article-title exists and if so run checkinView()
if (document.querySelector('.js-article-title')) {
    // checkInView(document.querySelector('.js-article-title'), 'title-collides', 0.5, '-' + pageHeaderHeight + ' 0px 0px 0px');
    checkInView(document.querySelector('.js-article-title'), 'title-collides', 0, '-' + pageHeaderHeight + ' 0px 0px 0px');
}

// // check if js-page-header-observer exists and if so run checkinView()
if (document.querySelector('.js-page-header-observer')) {
    checkInView(document.querySelector('.js-page-header-observer'), 'page-header-observer-collides', 0, '0px');
}

// fill the svg randomly width maximum 8 ellipses of rx="100" and ry ranging from 300 to 800 and move each ellipse 200 to the right with cx starting from cx="-200"

// a random function that returns a whole number between min and max
// function random(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const svg = SVG(".canvas");

// import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js@3.1.2";
// import { random } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.37";
// import PoissonDiskSampling from "https://cdn.skypack.dev/poisson-disk-sampling@2.2.3";

// const width = 1024;
// const height = 1024;

// // svg.rect(width, height).fill("#CCE2DD");

// const minDistance = 200;

// const p = new PoissonDiskSampling({
//     shape: [width, height],
//     // Minimum distance between each circle, increase for less dense arrangements & larger circles
//     minDistance: minDistance,
//     // How many times should we try to generate each point
//     tries: 50
// });
// const points = p.fill();

// for (let i = 0; i < points.length; i++) {
//     if (random(0, 1) > 0.5) {
//         svg
//             .circle(random(1, minDistance / 2))
//             .cx(points[i][0])
//             .cy(points[i][1])
//             .fill("var(--article-canvas-color)");
//     } else {
//         svg
//             .rect(minDistance / 2, minDistance / random(4, 8))
//             .cx(points[i][0])
//             .cy(points[i][1])
//             .fill("var(--article-canvas-color)")
//             .rotate(random(-45, 45));
//     }
// }

// const numEllipses = 6;

// let width = random(500, 1000);
// let height = random(500, 1000);
// let cx = 0;
// let nextcx = width / 2 + cx;

// for (let i = 0; i < numEllipses; i++) {
//     console.log(i, width, height, cx);
//     svg
//         .ellipse(width, height)
//         .cy(i * height * -0.05)
//         .cx(cx)
//         .attr({ filter: "url(#blur)", class: "fill-" + i });
//     // .attr({ class: "fill-" + i });

//     nextcx = width / 2 + cx;
//     cx = nextcx;
//     width = random(1000, 1500);
//     height = random(500, 1500);
// }

// const numEllipses = 60;

// let width = 200;
// let height = random(500, 1000);
// let cx = 0;
// let nextcx = width + cx;

// for (let i = 0; i < numEllipses; i++) {
//     console.log(i, width, height, cx);
//     svg
//         .ellipse(width, height)
//         .cy(i * height * -0.05)
//         .cx(cx)
//         .attr({ filter: "url(#blur)", class: "fill-" + i })
//     // .rotate(-45);
//     // .attr({ class: "fill-" + i });

//     nextcx = width + cx;
//     cx = nextcx;
//     // width = random(1000, 1500);
//     height = random(500, 1500);
// }

// const numEllipses = 20;

// let width = random(250, 750);
// let height = random(500, 1000);
// let cx = width / 2;
// let nextcx = width / 2 + cx;

// for (let i = 0; i < numEllipses; i++) {
//     console.log(i, width, height, cx);
//     svg
//         .rect(width, height)
//         .cy(0)
//         .cx(cx)
//         .attr({ class: "fill-" + i });
//     // .attr({ class: "fill-" + i });

//     nextcx = width / 2 + cx;
//     cx = nextcx;
//     width = random(250, 750);
//     height = random(500, 1500);
// }