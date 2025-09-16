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

// Get all elements with the class .fluid-text
const $fluidText = document.querySelectorAll(".fluid-text");

// Add computed font-size elements before each fluid-text element
$fluidText.forEach($element => {
    const $computedFontSize = document.createElement("p");
    $computedFontSize.classList.add("computed-font-size");
    $element.parentNode?.insertBefore($computedFontSize, $element);
});

// Function that updates the content of computed-font-size elements
const updateComputedFontSize = () => {
    const $computedFontSize = document.querySelectorAll(".computed-font-size");
    $computedFontSize.forEach(($element, index) => {
        const fontSize = window.getComputedStyle($fluidText[index]).getPropertyValue("font-size");
        $element.innerHTML = `Step ${index} - ${fontSize}`;
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
