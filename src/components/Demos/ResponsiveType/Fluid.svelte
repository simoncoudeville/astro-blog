<script>
  import { round } from "../../../scripts/round";
  import Reset from "../Components/Reset.svelte";
  import { x1, x2, y1, y2 } from "./stores.js";
  import IconMinCircle from "../../Icons/IconMinCircle.svelte";
  import IconPlusCircle from "../../Icons/IconPlusCircle.svelte";

  let zoomLevel = 100;
  let zoomlevels = [
    25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 133, 140, 150, 175, 200, 250,
    300, 400, 500,
  ];
  // let x1 = 320;
  // let x2 = 960;
  // y1.set(32);
  // let y2 = 48;
  let windowWidth = 1680;
  let maxWindowWidth = 1920;
  let minWindowWidth = 240;
  let windowRange = maxWindowWidth - minWindowWidth;
  let fs = $y1;
  let active = "right";

  $: breakpoint1 = $x1;
  $: breakpoint2 = $x2;

  $: viewportWidth = windowWidth / (zoomLevel / 100);
  $: viewportThumbPosition = (viewportWidth - minWindowWidth) / windowRange;

  $: v = (100 * ($y2 - $y1)) / ($x2 - $x1);
  $: r = ($x1 * $y2 - $x2 * $y1) / ($x1 - $x2);
  $: ff = (viewportWidth * v) / 100 + r;
  $: zf = (viewportWidth * v) / 100 + r;

  // update fs based on viewport width
  $: if (viewportWidth < breakpoint1) {
    active = "left";
    fs = $y1;
  } else if (viewportWidth <= breakpoint2) {
    active = "middle";
    fs = zf;
  } else {
    active = "right";
    fs = $y2;
  }

  $: if (viewportWidth <= minWindowWidth) {
    viewportThumbPosition = 0;
  }

  $: if (viewportWidth > maxWindowWidth) {
    viewportThumbPosition = 1;
  }

  // a reset function to reset the zoom level and window width
  function resetZoom() {
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
</script>

<div class="demo test">
  <div class="demo__body flow-s">
    <div class="controls text-s">
      <div class="controls__zoom flex align-center gap-3xs">
        <span class="color-muted shrink-0">Zoom</span>
        <button
          class="button-reset shrink-0"
          on:click={decrementZoomLevel}
          disabled={zoomLevel <= 25}
        >
          <span class="sr-only">Zoom out</span>
          <IconMinCircle />
        </button>
        <output class="zoom__output text-code">{zoomLevel}%</output>
        <button
          class="button-reset shrink-0"
          on:click={incrementZoomLevel}
          disabled={zoomLevel >= 500}
        >
          <span class="sr-only">Zoom in</span>
          <IconPlusCircle />
        </button>
      </div>
      <div class="controls__window flex align-center gap-3xs">
        <label class="color-muted shrink-0 pb-clear" for="fluidWindowWidth">
          Window width
        </label>
        <input
          type="range"
          name="Static window width"
          id="fluidWindowWidth"
          bind:value={windowWidth}
          min={minWindowWidth}
          max={maxWindowWidth}
          step="1"
        />
        <output class="text-code" for="fluidWindowWidth">{windowWidth}px</output
        >
      </div>
      <div class="controls__reset">
        <Reset
          functionName={resetZoom}
          disabledParameters={viewportWidth == 1680}
        />
      </div>
    </div>
    <div
      class="viewport text-s"
      style="--minww: {minWindowWidth}; --maxww: {maxWindowWidth}; --breakpoint1: {breakpoint1}; --breakpoint2: {breakpoint2}; --thumb-position: {viewportThumbPosition}"
    >
      <p class="viewport__title flex justify-between">
        <span class="color-muted shrink-0">Viewport width</span>
        <span class="text-code">{round(viewportWidth, 2)}px</span>
      </p>
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
            >{breakpoint1}px</span
          >
        </div>
        <div
          class="viewport__part viewport__part--breakpoint-2 {active === 'right'
            ? 'active'
            : ''}"
        >
          <span class="viewport__breakpoint-value text-code"
            >{breakpoint2}px</span
          >
        </div>
      </div>
    </div>
    <div class="demo-text-wrapper">
      {#if zf < $y1}
        <p
          class="demo-text"
          style="font-size: {round(($y1 * zoomLevel) / 100, 2, true)}px;"
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      {:else if zf <= $y2}
        <p
          class="demo-text"
          style="font-size: {round((ff * zoomLevel) / 100, 2, true)}px;"
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      {:else if zf > $y2}
        <p
          class="demo-text"
          style="font-size: {round(($y2 * zoomLevel) / 100, 2, true)}px;"
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      {:else}{/if}
    </div>
    <p class="text-code text-xs">
      <span class="token property">font-size</span><span
        class="token punctuation">:</span
      >
      {#if ff < $y1}
        <span class="token function">clamp</span><span class="token punctuation"
          >(</span
        ><span class="token output output--3">{$y1}px</span><span
          class="token punctuation">,</span
        >
        <!-- <span class="token value">{v}vw</span>
        <span class="token punctuation">×</span>
        <span class="token value">{round(viewportWidth, 2)}px</span>
        <span class="token punctuation">=</span> -->
        <span class="token value"
          >{round((v * viewportWidth) / 100, 2, true)}px</span
        >
        <span class="token punctuation">+</span>
        <span class="token value">{round(r, 2, true)}px</span>
        <span class="token punctuation">=</span>
        <span class="token value"
          >{round((v * viewportWidth) / 100 + r, 2, true)}px</span
        ><span class="token punctuation">,</span>
        <span class="token value">{$y2}px</span><span class="token punctuation"
          >);</span
        >
      {:else if ff <= $y2}
        <span class="token function">clamp</span><span class="token punctuation"
          >(</span
        ><span class="token value">{$y1}px</span><span class="token punctuation"
          >,</span
        >
        <span class="token output">
          <!-- {v}vw × {round(viewportWidth, 2)}px = -->
          {round((v * viewportWidth) / 100, 2, true)}px + {round(r, 2, true)}px
          =
          {round((v * viewportWidth) / 100 + r, 2, true)}px</span
        ><span class="token punctuation">,</span>
        <span class="token value">{$y2}px</span><span class="token punctuation"
          >);</span
        >
      {:else if ff > $y2}
        <span class="token function">clamp</span><span class="token punctuation"
          >(</span
        ><span class="token value">{$y1}px</span><span class="token punctuation"
          >,</span
        >
        <!-- <span class="token value">{v}vw</span>
        <span class="token punctuation">×</span>
        <span class="token value">{round(viewportWidth, 2)}px</span>
        <span class="token punctuation">=</span> -->
        <span class="token value"
          >{round((v * viewportWidth) / 100, 2, true)}px</span
        >
        <span class="token punctuation">+</span>
        <span class="token value">{round(r, 2, true)}px</span>
        <span class="token punctuation">=</span>
        <span class="token value"
          >{round((v * viewportWidth) / 100 + r, 2, true)}px</span
        ><span class="token punctuation">,</span>
        <span class="token output output--3">{$y2}px</span><span
          class="token punctuation">);</span
        >
      {:else}{/if}
    </p>
    <p class="text-code text-xs">
      <span class="token property">font-size</span><span
        class="token punctuation">:</span
      >
      <span class="token value">{round(fs, 2, true)}px</span>
      <span class="token punctuation">×</span>
      <span class="token value">{zoomLevel}%</span>
      <span class="token punctuation">=</span>
      <span class="token value">{round((fs * zoomLevel) / 100, 2, true)}px</span
      >
    </p>
  </div>
</div>

<style>
  @import "../../../styles/demos/responsiveType/styles.css";
</style>
