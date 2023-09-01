<script>
  import { round } from "../../../scripts/round";
  import Reset from "../Components/Reset.svelte";
  // import IconMinCircle from "../../Icons/IconMinCircle.svelte";
  // import IconPlusCircle from "../../Icons/IconPlusCircle.svelte";
  import IconPlus from "../../Icons/IconPlus.svelte";
  import IconMin from "../../Icons/IconMin.svelte";

  let zoomLevel = 100;
  let zoomlevels = [
    25, 33, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500,
  ];
  let windowWidth = 1680;
  let maxWindowWidth = 1920;
  let minWindowWidth = 240;
  let windowRange = maxWindowWidth - minWindowWidth;
  let fs = 20;
  let breakpoint1 = 600;
  let breakpoint2 = 1200;
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
    fs = 20;
    active = "left";
  } else if (viewportWidth < breakpoint2) {
    fs = 40;
    active = "middle";
  } else {
    fs = 60;
    active = "right";
  }

  $: if (viewportWidth <= minWindowWidth) {
    viewportThumbPosition = 0;
  }

  $: if (viewportWidth > maxWindowWidth) {
    viewportThumbPosition = 1;
  }
  console.log("From static svelte");
</script>

<div class="demo">
  <div class="demo__body flow-s">
    <div class="controls">
      <div class="controls__zoom flex align-center gap-2xs">
        <span class="color-muted shrink-0">Zoom</span>
        <button
          class="button-reset controls__button shrink-0"
          on:click={decrementZoomLevel}
          disabled={zoomLevel <= 25}
        >
          <span class="sr-only">Zoom out</span>
          <IconMin />
        </button>
        <output class="zoom__output text-num">{zoomLevel}%</output>
        <button
          class="button-reset controls__button shrink-0"
          on:click={incrementZoomLevel}
          disabled={zoomLevel >= 500}
        >
          <span class="sr-only">Zoom in</span>
          <IconPlus />
        </button>
      </div>
      <div class="controls__window flex align-center gap-2xs">
        <label class="color-muted shrink-0 pb-clear" for="staticWindowWidth">
          Window width
        </label>
        <input
          type="range"
          name="Static window width"
          id="staticWindowWidth"
          class="range--resize"
          bind:value={windowWidth}
          min={minWindowWidth}
          max={maxWindowWidth}
          step="1"
        />
        <output class="text-num" for="staticWindowWidth">{windowWidth}px</output
        >
      </div>
      <div class="controls__reset">
        <Reset
          functionName={resetStatic}
          disabledParameters={viewportWidth == 1680}
        />
      </div>
    </div>

    <div
      class="viewport"
      style="--minww: {minWindowWidth}; --maxww: {maxWindowWidth}; --breakpoint1: {breakpoint1}; --breakpoint2: {breakpoint2}; --thumb-position: {viewportThumbPosition}"
    >
      <p class="viewport__label flex justify-between align-items-center">
        <span class="color-muted shrink-0">Viewport width</span>
        <span class="text-num">{round(viewportWidth, 2)}px</span>
      </p>
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
          <span class="viewport__breakpoint-value text-num"
            >{breakpoint1}px</span
          >
        </div>
        <div
          class="viewport__part viewport__part--breakpoint-2 {active === 'right'
            ? 'active'
            : ''}"
        >
          <span class="viewport__breakpoint-value text-num"
            >{breakpoint2}px</span
          >
        </div>
      </div>
      <div class="viewport__range">
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
    </div>
    <div class="demo-text-wrapper">
      <p class="demo-text" style="font-size: {fs * (zoomLevel / 100)}px;">
        The trouble with responsive type and zoom
      </p>
    </div>
    <p class="text-code text-s">
      <span class="token property">font-size</span><span
        class="token punctuation">:</span
      >
      <span class="token output">{fs}px</span>
      <span class="token punctuation">×</span>
      <span class="token value">{zoomLevel}%</span>
      <span class="token punctuation">=</span>
      <span class="token value">{round(afs, 2)}px</span>
    </p>
  </div>
</div>

<style>
  @import "../../../styles/demos/responsiveType/styles.css";
</style>
