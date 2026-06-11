// Sidebar controls for the baseline-grid demo. Each [data-var] range input
// writes a CSS custom property on the demo surface (#baselinePage), so the
// whole baseline system — line height, font size, baseline divisions — can be
// overridden live. A checkbox toggles the painted grid overlay.

const page = document.getElementById("baselinePage");

if (page) {
  const inputs = document.querySelectorAll("input[data-var]");

  const apply = (input) => {
    const unit = input.dataset.unit || "";
    page.style.setProperty(input.dataset.var, input.value + unit);
    const output = input.closest("label")?.querySelector("output");
    if (output) output.textContent = input.value + unit;
  };

  inputs.forEach((input) => {
    apply(input); // sync initial readout
    input.addEventListener("input", () => apply(input));
  });

  const gridToggle = document.querySelector("input[data-toggle-grid]");
  if (gridToggle) {
    gridToggle.addEventListener("change", () => {
      page.classList.toggle("baseline-grid", gridToggle.checked);
    });
  }
}
