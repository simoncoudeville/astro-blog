// Add event listeners for min/max ratio select boxes to update root CSS variables
const minRatioSelect = document.getElementById('min-ratio-select');
const maxRatioSelect = document.getElementById('max-ratio-select');

function updateRootRatios() {
    if (minRatioSelect) {
        document.documentElement.style.setProperty('--root-fluid-min-ratio', minRatioSelect.value);
    }
    if (maxRatioSelect) {
        document.documentElement.style.setProperty('--root-fluid-max-ratio', maxRatioSelect.value);
    }
}

if (minRatioSelect && maxRatioSelect) {
    minRatioSelect.addEventListener('change', updateRootRatios);
    maxRatioSelect.addEventListener('change', updateRootRatios);
    // Set initial values
    updateRootRatios();
}
/**
 * Fluid Text Demo Script
 * Shows computed font sizes and container width for fluid typography demos
 */

// Get all elements with the class .fluid-text-demo
const $fluidTextDemo = document.querySelectorAll(".fluid-text-demo");

// Add computed font-size elements as first child of each .fluid-text-demo
$fluidTextDemo.forEach($demo => {
    const $computedFontSize = document.createElement("p");
    $computedFontSize.classList.add("computed-font-size");
    $demo.insertBefore($computedFontSize, $demo.firstChild);
});

// Get the main text elements (could be .fluid-text or .fluid-type-function-*)
const $textElements = document.querySelectorAll(".fluid-text-demo > p:not(.computed-font-size)");

// Function that updates the content of computed-font-size elements
const updateComputedFontSize = () => {
    const $computedFontSize = document.querySelectorAll(".computed-font-size");
    $computedFontSize.forEach(($element, index) => {
        const fontSize = window.getComputedStyle($textElements[index]).getPropertyValue("font-size");
        $element.innerHTML = `computed font-size: ${fontSize}`;
    });
};

const $container = document.querySelector(".container");

if ($container) {
    // Insert container width display element
    const $containerWidth = document.createElement("p");
    $containerWidth.classList.add("container-width");
    $container.insertBefore($containerWidth, $container.firstChild);

    // Function that updates the container width display
    const updateContainerWidth = () => {
        $containerWidth.innerHTML = `Container width: ${$container.offsetWidth}px`;
    };

    // Initial updates
    updateComputedFontSize();
    updateContainerWidth();

    // Update on window resize
    window.addEventListener("resize", () => {
        updateComputedFontSize();
        updateContainerWidth();
    });
}
