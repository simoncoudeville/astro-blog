<script>
  import Reset from "../Components/Reset.svelte";

  // Removed all interactivity and scripting except for the reset button and range input
  let minWindowWidth = 240;
  let maxWindowWidth = 1440;
  let windowWidth = 1440;
  let fluidMinWidth = 320;
  let fluidMaxWidth = 1280;
  let fontSizeMin = 20;
  let fontSizeMax = 32;

  function resetZoom() {
    windowWidth = 1440;
  }
</script>

<div class="demo test">
  <div class="demo__header">
    <h3 class="demo__title">Clamp visualisation</h3>
    <Reset functionName={resetZoom} disabledParameters={windowWidth == 1440} />
  </div>
  <div
    class="demo__body flow-s"
    style="--window-width: {windowWidth}; --range-min-width: {minWindowWidth}; --range-max-width: {maxWindowWidth}; --fluid-min-width: {fluidMinWidth}; --fluid-max-width: {fluidMaxWidth};"
  >
    <div class="controls">
      <div class="controls__window">
        <div class="controls__output">
          <label
            class="color-muted shrink-0 text-s pb-clear"
            for="fluidWindowWidth"
          >
            Viewport width
          </label>
          <output class="text-num text-s output" for="fluidWindowWidth"
            >{windowWidth}px</output
          >
        </div>
        <div class="range">
          <input
            type="range"
            name="Static window width"
            id="fluidWindowWidth"
            class="range--resize {windowWidth < fluidMinWidth + 1
              ? 'range--small'
              : windowWidth < fluidMaxWidth + 1
                ? 'range--medium'
                : 'range--large'}"
            bind:value={windowWidth}
            min={minWindowWidth}
            max={maxWindowWidth}
            step="1"
          />
          <div class="range__thumb"></div>
        </div>
        <div class="ticks">
          <span
            class="tick color-muted text-s"
            style="--left: var(--fluid-min-width)"
          >
            {fluidMinWidth}px
          </span>
          <span
            class="tick color-muted text-s"
            style="--left: var(--fluid-max-width)"
          >
            {fluidMaxWidth}px
          </span>
        </div>
      </div>
    </div>
    <div class="viewport">
      <pre class="astro-code"><code
          ><span class="color-muted">font-size:</span>
  clamp(<span class={windowWidth < fluidMinWidth + 1 ? "active" : "inactive"}
            >{fontSizeMin}px</span
          >, <span
            class={windowWidth >= fluidMinWidth + 1 &&
            windowWidth < fluidMaxWidth + 1
              ? "active"
              : "inactive"}
            >1.25% × {windowWidth}px = {((1.25 * windowWidth) / 100).toFixed(
              2,
            )}px + 16px = {((1.25 * windowWidth) / 100 + 16).toFixed(2)}px</span
          >, <span
            class={windowWidth >= fluidMaxWidth + 1 ? "active" : "inactive"}
            >{fontSizeMax}px</span
          >)<span class="color-muted">;</span></code
        ></pre>
    </div>
  </div>
</div>

<style>
  .astro-code {
    padding: 0;
  }

  .range--resize {
    --range-width: calc(100%);
    /* Calculated values */
    --range-fluid-min-start: calc(
      (
          (var(--fluid-min-width) - var(--range-min-width)) /
            (var(--range-max-width) - var(--range-min-width))
        ) * 100%
    );
    --range-fluid-max-start: calc(
      (
          (var(--fluid-max-width) - var(--range-min-width)) /
            (var(--range-max-width) - var(--range-min-width))
        ) * 100%
    );
    --range-track-height: 3px;
    --range-thumb-width: 10px;
    --range-thumb-borderRadius: var(--range-thumb-width);
    --range-thumb-borderColor: var(--global-foregroundColor);
    --range-thumb-borderWidth: 0px;
    --range-thumb-backgroundColor: var(--global-accent-color);
    --range-thumb-opacity: 0;

    --range-track-backgroundColor: linear-gradient(
      to right,
      var(--global-accent-color) var(--range-fluid-max-start),
      var(--global-borderColor2) var(--range-fluid-max-start)
    );

    /* if the window width is lower than the fluid min width */
    --range-track-backgroundColor: linear-gradient(
      to right,
      var(--global-accent-color) var(--range-fluid-min-start),
      var(--global-borderColor2) var(--range-fluid-min-start)
    );
  }

  .range--medium {
    /* if the window width is between the fluid min and max width */
    --range-track-backgroundColor: linear-gradient(
      to right,
      var(--global-borderColor2) var(--range-fluid-min-start),
      var(--global-accent-color) var(--range-fluid-min-start),
      var(--global-accent-color) var(--range-fluid-max-start),
      var(--global-borderColor2) var(--range-fluid-max-start)
    );
  }

  .range--large {
    /* if the window width is higher than the fluid max width */
    --range-track-backgroundColor: linear-gradient(
      to right,
      var(--global-borderColor2) var(--range-fluid-max-start),
      var(--global-accent-color) var(--range-fluid-max-start)
    );
  }

  .range {
    position: relative;
    width: 100%;
    margin-top: var(--global-whitespace-xs);
  }

  .range__thumb {
    width: 8px;
    height: 20px;
    background-color: var(--global-accent-color);
    border: 2px solid var(--global-foregroundColor);
    border-radius: 12px;
    position: absolute;
    top: calc(-10px + 1.5px);
    left: calc(
      (
          (var(--window-width) - var(--range-min-width)) /
            (var(--range-max-width) - var(--range-min-width))
        ) * 100%
    );
    transform: translateX(-50%);
    pointer-events: none;
    /* opacity: 0.5; */
  }

  .ticks {
    position: relative;
    width: 100%;
    height: 1.5rem;
    margin-top: var(--global-whitespace-xs);
  }

  .tick {
    position: absolute;
    width: 4rem;
    text-align: center;
    left: calc(
      (
          (var(--left) - var(--range-min-width)) /
            (var(--range-max-width) - var(--range-min-width))
        ) * 100%
    );
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background-color: var(--global-borderColor2);
    }
  }

  .controls__output {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .astro-code code {
    color: var(--global-title-color);
  }

  .active {
    padding: 0.25em;
    border-radius: var(--global-borderRadius-sm);
    background-color: var(--global-accent-color);
    color: var(--global-color-on-accent);
  }

  .inactive {
    color: var(--global-muted-color);
  }
</style>
