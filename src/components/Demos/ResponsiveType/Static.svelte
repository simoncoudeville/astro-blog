<script>
  let zoomLevel = 100;
  let windowWidth = 1680;
  let maxWindowWidth = 1920;
  let minWindowWidth = 300;
  let windowRange = maxWindowWidth - minWindowWidth;
  let fs = 24;
  let breakpoint1 = 848;
  let breakpoint2 = 1136;
  let zoomlevels = [100, 110, 125, 133, 140, 150, 175, 200, 250, 300, 400, 500];
  let active = "right";

  // a reset function to reset the zoom level and window width
  function resetStatic() {
    zoomLevel = 100;
    windowWidth = 1680;
  }

  // a function that increments the zoom level up to 500 from the zoomlevels array
  function incrementZoomLevel() {
    if (zoomlevels.indexOf(zoomLevel) < zoomlevels.length - 1) {
      zoomLevel = zoomlevels[zoomlevels.indexOf(zoomLevel) + 1];
    }
  }

  // a function that decrements the zoom level down to 100 from the zoomlevels array
  function decrementZoomLevel() {
    if (zoomlevels.indexOf(zoomLevel) > 0) {
      zoomLevel = zoomlevels[zoomlevels.indexOf(zoomLevel) - 1];
    }
  }

  $: viewportWidth = windowWidth / (zoomLevel / 100);
  $: afs = fs * (zoomLevel / 100);
  $: viewportThumbPosition = (viewportWidth - minWindowWidth) / windowRange;

  // update fs based on viewport width
  $: if (viewportWidth < breakpoint1) {
    fs = 24;
    active = "left";
  } else if (viewportWidth < breakpoint2) {
    fs = 32;
    active = "middle";
  } else {
    fs = 48;
    active = "right";
  }

  $: if (viewportWidth <= minWindowWidth) {
    viewportThumbPosition = 0;
  }

  // a rounding function to use in the formula
  function round(value, decimals, showdecimals = false) {
    if (showdecimals) {
      return Number(
        Math.round(value + "e" + decimals) + "e-" + decimals
      ).toFixed(decimals);
    } else {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }
  }

  import Reset from "../Components/Reset.svelte";
</script>

<div class="demo ">
  <div class="demo__body flow-s">
    <div class="controls">
      <div class="coontrols__zoom flex align-center gap-3xs">
        <span class="color-muted shrink-0">Zoom level</span>
        <button class="button-reset shrink-0" on:click={decrementZoomLevel}>
          <span class="sr-only">Zoom out</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg
          >
        </button>
        <output class="zoom__output text-num" id="staticZoomLevel"
          >{zoomLevel}%</output
        >
        <button class="button-reset shrink-0" on:click={incrementZoomLevel}>
          <span class="sr-only">Zoom in</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><line x1="12" y1="5" x2="12" y2="19" /><line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            /></svg
          >
        </button>
      </div>
      <div class="controls__window flex align-center gap-3xs">
        <label class="color-muted shrink-0" for="staticWindowWidth">
          Window width
        </label>
        <input
          type="range"
          name="Static window width"
          id="staticWindowWidth"
          bind:value={windowWidth}
          min={minWindowWidth}
          max={maxWindowWidth}
          step="1"
        />
        <output class="text-num" for="staticWindowWidth">{windowWidth}px</output
        >
      </div>
      <div class="controls__reset">
        <Reset functionName={resetStatic} />
      </div>
    </div>

    <div
      class="viewport"
      style="--minww: {minWindowWidth}; --maxww: {maxWindowWidth}; --breakpoint1: {breakpoint1}; --breakpoint2: {breakpoint2}; --thumb-position: {viewportThumbPosition}"
    >
      <p class="viewport__title flex justify-between">
        <span class="color-muted shrink-0">Viewport width</span>
        <span class="text-num">{round(viewportWidth, 2)}px</span>
      </p>
      <div class="viewport__range" style="--viewport-position: {viewportWidth}">
        <!-- <div class="viewport__thumb" /> -->
        <svg
          class="viewport__thumb"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15.712 9.35"
        >
          <path
            id="arrow_drop_down_FILL0_wght400_GRAD0_opsz48"
            d="M22.95,28.95,16.6,22.6a1.388,1.388,0,0,1-.325-1.625,1.37,1.37,0,0,1,1.375-.925h12.7a1.37,1.37,0,0,1,1.375.925A1.388,1.388,0,0,1,31.4,22.6l-6.35,6.35a1.524,1.524,0,0,1-.5.35,1.562,1.562,0,0,1-1.1,0A1.524,1.524,0,0,1,22.95,28.95Z"
            transform="translate(-16.144 -20.05)"
          />
        </svg>
      </div>
      <div class="viewport__bar">
        <div
          class="viewport__part viewport__part--leftover {active === 'left'
            ? 'active'
            : ''}"
        />
        <div
          class="viewport__part viewport__part--breakpoint-1 {active ===
          'middle'
            ? 'active'
            : ''}"
        >
          <span class="viewport__breakpoint-value text-code"
            >{breakpoint1 / 16}em</span
          >
        </div>
        <div
          class="viewport__part viewport__part--breakpoint-2 {active === 'right'
            ? 'active'
            : ''}"
        >
          <span class="viewport__breakpoint-value text-code"
            >{breakpoint2 / 16}em</span
          >
        </div>
      </div>
    </div>
    <div class="demo-text">
      <p class="demo-text" style="font-size: {fs * (zoomLevel / 100)}px;">
        <!-- Almost before we knew it, we had left the ground. -->
        <!-- Why responsive typography is weird -->
        <!-- Almost before we knew it -->
        The issue with responsive typography and zoom
      </p>
    </div>

    <p class="text-code text-xs">
      font-size<span class="token punctuation">:</span>
      <span class="token value">{fs}px</span>
      <span class="token punctuation">×</span>
      <span class="token value">{zoomLevel}%</span>
      <span class="token punctuation">=</span>
      <span class="token value">{round(afs, 2)}px</span>
    </p>
  </div>
</div>

<style>
  .demo-text {
    /* height: 300px;
    line-height: 1.2; */
    line-height: 200px;
    /* ellipsis */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--global-font-family-title);
    font-weight: var(--global-font-weight-title);
  }

  .controls {
    display: grid;
    gap: var(--global-whitespace-xs) var(--global-whitespace);
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }

  @media (max-width: 46.5em) {
    .controls__window {
      grid-row: 2;
      grid-column: 1/-1;
    }

    .controls__reset {
      grid-column-end: -1;
    }
  }

  .viewport {
    --viewport-gap: 2px;
    --viewport-thumb-size: var(--global-whitespace-3xs);
    --window-range: calc(var(--maxww) - var(--minww));
    --breakpoint-range: calc(var(--breakpoint2) - var(--breakpoint1));
    --viewport-leftover: calc(
      calc(calc(var(--breakpoint1) - var(--minww)) / var(--window-range) * 100%) -
        var(--viewport-gap) / 2
    );
    --viewport-breakpoint-1: calc(
      calc(var(--breakpoint-range) / var(--window-range) * 100%) -
        var(--viewport-gap)
    );
    --viewport-breakpoint-2: 1fr;
  }

  .viewport__bar {
    display: grid;
    grid-template-columns: var(--viewport-leftover) var(--viewport-breakpoint-1) var(
        --viewport-breakpoint-2
      );
    gap: var(--viewport-gap);
  }

  .viewport__part {
    background-color: var(--global-input-backgroundColor);
    /* border: 1px solid var(--global-foregroundColor); */
    border-radius: var(--global-borderRadius-sm);
    padding: 0 var(--global-whitespace-4xs);
  }

  .viewport__part.active {
    background-color: var(--global-accent-color);
    color: var(--global-color-neutral-025);
  }

  .viewport__range {
    position: relative;
    /* bottom: calc(var(--global-whitespace-3xs) * -0.25); */
  }

  .viewport__thumb {
    /* --viewport-thumb-position: calc(
      calc(
          calc(var(--viewport-position) - var(--minww)) / var(--window-range) *
            100%
        ) - calc(var(--viewport-thumb-size) / 2)
    ); */
    --viewport-thumb-position: calc(
      calc(var(--thumb-position) * 100%) - calc(var(--viewport-thumb-size) / 2)
    );
    position: relative;
    width: var(--viewport-thumb-size);
    /* height: var(--viewport-thumb-size); */
    /* background-color: var(--global-text-color); */
    position: relative;
    left: var(--viewport-thumb-position);
    /* bottom: calc(var(--global-whitespace-3xs) * -0.25); */
    bottom: 2px;
    /* fill: currentColor; */
    fill: var(--global-accent-color);
    /* rotate: 45deg; */
    /* border: 2px solid var(--global-foregroundColor); */
    /* border: 2px solid var(--global-accent-color); */
    /* border-width: 0 2px 2px 0; */
    /* border-radius: 100%; */
    /* border-radius: 1px; */
  }
</style>
