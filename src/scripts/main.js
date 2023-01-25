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
    checkInView(document.querySelector('.js-article-title'), 'title-collides', 0.5, '-' + pageHeaderHeight + ' 0px 0px 0px');
}

// // check if js-page-header-observer exists and if so run checkinView()
if (document.querySelector('.js-page-header-observer')) {
    checkInView(document.querySelector('.js-page-header-observer'), 'page-header-observer-collides', 0, '0px');
}

// fill the svg randomly width maximum 8 ellipses of rx="100" and ry ranging from 300 to 800 and move each ellipse 200 to the right with cx starting from cx="-200"

// import { SVG } from '@svgdotjs/svg.js'

// // a random function that returns a whole number between min and max
// function random(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const svg = SVG(".canvas");

// const numEllipses = 6;

// let width = random(500, 1000);
// let height = random(500, 1000);
// let cx = 0;
// let nextcx = width / 2 + cx;

// for (let i = 0; i < numEllipses; i++) {
//     console.log(i, width, height, cx);
//     svg
//         .ellipse(width, height)
//         .cy(i * height * -0.125)
//         .cx(cx)
//         .attr({ filter: "url(#blur)", class: "fill-" + i });

//     nextcx = width / 2 + cx;
//     cx = nextcx;
//     width = random(1000, 1500);
//     height = random(500, 1000);
// }