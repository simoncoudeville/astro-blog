<script>
  let x1 = 320;
  let x2 = 960;
  let y1 = 32;
  let y2 = 48;
  let z = 100;
  let ww = 1680;
  let minww = 240;
  let maxww = 1920;
  let wwdif = maxww - minww;
  let unit = "px";

  // a function that resets the values to the default ones
  function resetClamp() {
    x1 = 320;
    x2 = 960;
    y1 = 32;
    y2 = 48;
  }

  function resetViewport() {
    ww = 1680;
  }

  function resetZoom() {
    ww = 1680;
    z = 100;
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
  // function round2(value, decimals) {
  //   // always add the zeros to the end of the number
  //   return Number(Math.round(value + "e" + decimals) + "e-" + decimals).toFixed(
  //     decimals
  //   );
  // }

  $: v = (100 * (y2 - y1)) / (x2 - x1);
  $: r = (x1 * y2 - x2 * y1) / (x1 - x2) / 16;
  $: ff = (ww * v) / 100 + r * 16;
  $: vw = (ww * 100) / z;
  $: zf = (vw * v) / 100 + r * 16;

  import Icon from "../Icon.svelte";
  import Note from "../Note.svelte";
</script>

<div class="flow">
  <div class="demo dark">
    <div class="demo__header">
      <h3 class="demo__title">Fluid size clamp formula</h3>
      <div class="demo__header-options">
        <div class="demo-toggle">
          <label class="demo-toggle__label"
            ><input
              class="sr-only demo-toggle__radio"
              type="radio"
              name="unit"
              bind:group={unit}
              value="px"
            />px</label
          >
          <label class="demo-toggle__label"
            ><input
              class="sr-only demo-toggle__radio"
              type="radio"
              name="unit"
              bind:group={unit}
              value="rem"
            />rem</label
          >
        </div>
        <button class="button-reset demo__header-button" on:click={resetClamp}>
          <Icon />
          <span class="sr-only">reset</span>
        </button>
      </div>
    </div>
    <div class="demo__body pb-clear">
      <div class="calculator">
        <fieldset class="calculator__fieldset">
          <legend>Minimum viewport </legend>
          <label class="calculator__label">
            Width
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={x1}
                min="300"
                max={x2 - 10}
                step="10"
              />
            </span>
          </label>
          <label class="calculator__label">
            Font size
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={y1}
                min="4"
                max={y2 - 1}
                step="1"
              />
            </span>
          </label>
        </fieldset>
        <fieldset class="calculator__fieldset">
          <legend>Maximum viewport</legend>
          <label class="calculator__label">
            Width
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={x2}
                min={x1 + 10}
                max="1920"
                step="1"
              />
            </span>
          </label>

          <label class="calculator__label">
            Font size
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={y2}
                min={y1 + 1}
                max="200"
                step="1"
              />
            </span>
          </label>
        </fieldset>
      </div>
      <!-- <h4>Result</h4> -->
    </div>
    <div class="demo__code flow-2xs">
      <h4>Result</h4>
      <p>
        <span class="token property">font-size</span><span
          class="token punctuation">:</span
        >
        <span class="token">clamp</span><span class="token punctuation">(</span
        >{unit === "px" ? round(y1, 4) + "px" : round(y1 / 16, 4) + "rem"},
        <span class="token output output--1"
          >{round(((y2 - y1) / (x2 - x1)) * 100, 4)}vw</span
        >
        +
        <span class="token output output--2"
          >{unit === "px"
            ? round((x1 * y2 - x2 * y1) / (x1 - x2), 4) + "px"
            : round((x1 * y2 - x2 * y1) / (x1 - x2) / 16, 4) + "rem"}</span
        >, {unit === "px"
          ? round(y2, 4) + "px"
          : round(y2 / 16, 4) + "rem"}<span class="token punctuation">);</span>
      </p>
      <h4>Where</h4>
      <p>
        <span class="token output output--1">v</span>
        <span class="token punctuation">=</span>
        <span class="token punctuation">(</span>{y2} - {y1}<span
          class="token punctuation">)</span
        >
        /
        <span class="token punctuation">(</span>{x2} - {x1}<span
          class="token punctuation">)</span
        >
        × 100 <br /><span class="token output output--2">r</span>
        <span class="token punctuation">=</span>
        <span class="token punctuation">(</span>{x1} × {y2} - {x2} * {y1}<span
          class="token punctuation">)</span
        >
        / <span class="token punctuation">(</span>{x1} - {x2}<span
          class="token punctuation">)</span
        >{unit === "px" ? " " : " / 16"}
      </p>
    </div>
  </div>
  <p>
    Ok let's see what happens if we change the window width. I delibatery say
    window width because that's what we do if we resize our browser or if we
    look at our page on a smaller screen. When that happens the viewport width
    also changes. In this case the viewport width is the same as the window
    width. Since we are using the viewport unit in our formula the font-size
    changes accordingly.
  </p>
  <div class="demo dark">
    <div class="demo__header">
      <h3 class="demo__title">Responsive behaviour</h3>
      <button class="button-reset demo__header-button" on:click={resetViewport}>
        <Icon />
        <span class="sr-only">reset</span>
      </button>
    </div>
    <div class="demo__body pb-clear flow">
      <p>
        When the window width changes everything behaves as expected. The font
        size is resized from {y1}px to {y2}px when the window is between {x1}px
        and {x2}px wide.
      </p>
      <form
        class="viewport-width"
        style="--x1: {x1}; --x2: {x2}; --min-ww: {minww}; --max-ww: {maxww}; --mm-ww: {wwdif};"
      >
        <label class="viewport-width__label" for="windowWidthRange">
          Window width: <span class="text-code text-xs color-muted">{ww}px</span
          >
        </label>
        <div class="viewport-width__range" style="--ww-value: {ww}">
          <div class="viewport-width__range-thumb" />
          <input
            class="viewport-width__input"
            type="range"
            bind:value={ww}
            min={minww}
            max={maxww}
            step="10"
            id="windowWidthRange"
          />
        </div>
        <div class="viewport-width__viz">
          {#if ff < y1}
            <div class="viewport-width__left active" />
            <div class="viewport-width__mid">
              <span>{x1}</span>
              <span>{x2}</span>
            </div>
            <div class="viewport-width__right" />
          {:else if ff <= y2}
            <div class="viewport-width__left" />
            <div class="viewport-width__mid active">
              <span>{x1}</span>
              <span>{x2}</span>
            </div>
            <div class="viewport-width__right" />
          {:else if ff > y2}
            <div class="viewport-width__left" />
            <div class="viewport-width__mid">
              <span>{x1}</span>
              <span>{x2}</span>
            </div>
            <div class="viewport-width__right active" />
          {:else}{/if}
        </div>
      </form>
      {#if ff < y1}
        <p style="font-size: {round(y1, 2, true)}px;">
          The quick brown fox jumps over the lazy dog.
        </p>
      {:else if ff <= y2}
        <p style="font-size: {round(ff, 2, true)}px;">
          The quick brown fox jumps over the lazy dog.
        </p>
      {:else if ff > y2}
        <p style="font-size: {round(y2, 2, true)}px;">
          The quick brown fox jumps over the lazy dog.
        </p>
      {:else}{/if}
    </div>
    <div class="demo__code flow-2xs">
      <h4 class="mb-2xs">Result</h4>
      <p>
        <span class="token property">font-size</span><span
          class="token punctuation">:</span
        >
        {#if ff < y1}
          <span class="token">clamp</span><span class="token punctuation"
            >(</span
          ><span class="token output output--3">{y1}px</span>,
          <span class="cf-input">{round(ff, 2, true)}px</span>, {y2}px<span
            class="token punctuation">);</span
          >
        {:else if ff <= y2}
          <span class="token">clamp</span><span class="token punctuation"
            >(</span
          >{y1}px,
          <span class="token output output--3 cf-input"
            >{round(ff, 2, true)}px</span
          >, {y2}px<span class="token punctuation">);</span>
        {:else if ff > y2}
          <span class="token">clamp</span><span class="token punctuation"
            >(</span
          >{y1}px,
          <span class="cf-input">{round(ff, 2, true)}px</span>,
          <span class="token output output--3">{y2}px</span><span
            class="token punctuation">);</span
          >
        {:else}{/if}
      </p>

      <p class="cf-output">
        <span class="token output output--1"
          >{ww}px &times; {round((100 * (y2 - y1)) / (x2 - x1), 4)}% = {round(
            (ww * v) / 100,
            2,
            true
          )}px</span
        >
        +
        <span class="token output output--2"
          >{round((x1 * y2 - x2 * y1) / (x1 - x2), 2)}px</span
        >
      </p>

      <!-- <p>
        <span class="token">{ff}px</span> =
        <span class="token output output--1"
          >{ww}px &times; {round((100 * (y2 - y1)) / (x2 - x1), 4)}% = {round(
            (ww * v) / 100,
            2
          )}px</span
        >
        +
        <span class="token output output--2"
          >{round((x1 * y2 - x2 * y1) / (x1 - x2), 4)}px</span
        >
      </p> -->
    </div>
  </div>
  <p>
    Now let's see what happens when zooming in. When the zoom level goes up the
    pixel density of the screen increases. That means pixels get larger. As a
    result the size of the viewport in pixels actually decreases because there
    are less pixels to work with. The window width stays the same. But it also
    plays a role in the calculation. The wider the window the more room there is
    to zoom in before the maximum viewport width is reached. From that point on
    the font-size decreases. So as you zoom in the font-size decreases until it
    reaches the minimum value. At the same you are still zooming in. So from
    that point the font-size doesn't scale accordinly anymore. In fact under
    certain circumstances it can even look as it stays the same or even
    decrease.
  </p>
  <div class="demo dark">
    <div class="demo__header">
      <h3 class="demo__title">Zoom behaviour</h3>
      <button class="button-reset demo__header-button" on:click={resetZoom}>
        <Icon />
        <span class="sr-only">reset</span>
      </button>
    </div>
    <div class="demo__body pb-clear flow">
      <p>
        Zooming affects viewport width in the same way as the window width. So
        once it crosses the maximum viewport width the middle value of the clamp
        formula is used.
      </p>
      {#if ww < x2}
        <Note>
          <p>
            To clearly see the effect please increase the window width or reset
            it to the default value.
          </p>
        </Note>
      {/if}
      <div class="calculator">
        <label>
          Zoom level
          <span class="input-field" data-suffix="%">
            <input
              id="zoom"
              type="number"
              bind:value={z}
              min="100"
              max="400"
              step="5"
            />
          </span>
        </label>
        <label>
          Window width
          <span class="input-field" data-suffix="px">
            <input
              id="windowwidth"
              type="number"
              bind:value={ww}
              min={minww}
              max={maxww}
              step="10"
            />
          </span>
        </label>
      </div>
      <div
        class="viewport-width"
        style="--x1: {x1}; --x2: {x2}; --min-ww: {minww}; --max-ww: {maxww}; --mm-ww: {wwdif};"
      >
        <label class="viewport-width__label" for="viewportwidthRange">
          Viewport width <span class="text-code text-xs color-muted"
            >{round(vw, 2)}px</span
          >
        </label>
        <div class="viewport-width__range" style="--ww-value: {vw}">
          <div class="viewport-width__range-thumb" />
          <input
            class="viewport-width__input"
            type="range"
            bind:value={vw}
            min={minww}
            max={maxww}
            step="1"
            id="viewportwidthRange"
            disabled
          />
        </div>
        <div class="viewport-width__viz">
          {#if zf < y1}
            <div class="viewport-width__left active" />
            <div class="viewport-width__mid">
              <span>{x1}</span>
              <span>{x2}</span>
            </div>
            <div class="viewport-width__right" />
          {:else if zf <= y2}
            <div class="viewport-width__left" />
            <div class="viewport-width__mid active">
              <span>{x1}</span>
              <span>{x2}</span>
            </div>
            <div class="viewport-width__right" />
          {:else if zf > y2}
            <div class="viewport-width__left" />
            <div class="viewport-width__mid">
              <span>{x1}</span>
              <span>{x2}</span>
            </div>
            <div class="viewport-width__right active" />
          {:else}{/if}
        </div>
      </div>
    </div>
    <div class="demo__code">
      <p>
        {vw}
        <br />
        font-size: clamp({y1}px, {v} × {round(vw, 2)} = {round(
          (v * vw) / 100,
          2
        )}px + {r * 16}px =
        {round((v * vw) / 100 + r * 16, 2)}px, {y2}px)
        <br />
        {#if zf > y2}
          font-size: {round(y2, 2)}px <br />
          font-size after zoom: {y2}px * {z}% = {round((y2 * z) / 100, 2)}px
        {:else if y1 > zf}
          font-size: {round(y1, 2)}px <br />
          font-size after zoom: {y1}px * {z}% = {round((y1 * z) / 100, 2)}px
          which is {z}% of {y1}px
        {:else if y1 <= zf <= y2}
          font-size: {round(zf, 2)}px <br />
          font-size after zoom: {round(zf, 2)}px × {z}% = {round(
            (zf * z) / 100,
            2
          )}px which is {round((zf * z) / y2, 2)}% of {y2}px and {round(
            (zf * z) / y1,
            2
          )}% of {y1}px
        {/if}
        <br />
      </p>
    </div>
  </div>
</div>

<style>
  .calculator,
  .calculator__fieldset {
    display: grid;
    gap: var(--global-whitespace-s);
    grid-template-columns: 1fr 1fr;
  }

  .calculator {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .viewport-width {
    --viewport-width-x1: calc(
      (var(--x1) - var(--min-ww)) / var(--mm-ww) * 100%
    );
    --viewport-width-x2: calc(
      (var(--x2) - var(--min-ww)) / var(--mm-ww) * 100%
    );
    --viewport-width-thumb-size: calc(var(--global-baseline) * 3);
  }

  .viewport-width__viz {
    display: flex;
    position: relative;
    margin-top: 1px;
  }

  .viewport-width__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .viewport-width__range {
    position: relative;
  }

  /* range thumb */
  .viewport-width__range input[type="range"] {
    -webkit-appearance: none;
    width: calc(100% + var(--viewport-width-thumb-size));
    margin-left: calc(var(--viewport-width-thumb-size) / -2);
    background-color: transparent;
    margin-top: calc(var(--viewport-width-thumb-size) / 2);
    margin-bottom: 4px;
    /* height: 1px; */
    /* padding: 16px 0; */
    /* margin-right: -8px; */
    /* padding: 0 4px; */
  }

  .viewport-width__range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: var(--viewport-width-thumb-size);
    height: var(--viewport-width-thumb-size);
    /* aspect-ratio: 1 / 1; */
    /* width: 16px; */
    background: var(--global-color-neutral-025);
    /* border-radius: 50%; */
    cursor: ew-resize;
    rotate: 45deg;
    border-radius: 2px;
    /* opacity: 0; */
  }

  /* .viewport-width__range-thumb {
    content: "";
    position: absolute;
    top: 0;
    left: calc(
      (calc(var(--ww-value) - var(--min-ww)) / var(--mm-ww) * 100%) -
        var(--viewport-width-thumb-size) / 2
    );
    width: var(--viewport-width-thumb-size);
    height: var(--viewport-width-thumb-size);
    background: var(--global-color-neutral-025);
    border-radius: 2px;
    pointer-events: none;
  } */

  /* .viewport-width__range-thumb::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 2px;
    background: hotpink;
    rotate: 45deg;
  } */

  .viewport-width__viz {
    --fs: 16;
    font-family: var(--global-font-family-code);
    font-size: calc(var(--fs) / var(--root-font-size) * 1rem);
    line-height: calc(var(--global-baseline) * 5);
    color: var(--global-color-neutral-800);
    display: grid;
    grid-template-columns:
      var(--viewport-width-x1) calc(
        var(--viewport-width-x2) - var(--viewport-width-x1)
      )
      1fr;
    /* gap: 1px; */
    /* display: flex; */
    /* color: var(--global-color-neutral-025); */
  }

  .viewport-width__left,
  .viewport-width__mid,
  .viewport-width__right {
    background: var(--global-color-neutral-600);
    border-radius: var(--global-borderRadius);
    border: 1px solid var(--global-color-neutral-800);
    /* color: var(--global-color-neutral-025); */
    color: var(--global-muted-color);
  }

  .viewport-width__mid {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
  }

  .active {
    background: var(--global-color-rose);
    color: var(--global-color-neutral-800);
  }

  .cf-input {
    position: relative;
  }

  .cf-input::before {
    content: "";
    position: absolute;
    inset: -0.25em -0.25em;
    border: 1px solid var(--global-color-neutral-300);
    border-radius: var(--global-borderRadius);
    pointer-events: none;
  }

  .cf-input::after {
    content: "";
    position: absolute;
    bottom: -1.5em;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: var(--global-whitespace-xs);
    background-color: var(--global-color-neutral-300);
    border-radius: var(--global-borderRadius);
    pointer-events: none;
  }

  .cf-output {
    display: inline-block;
    padding: 0.25em;
    border: 1px solid var(--global-color-neutral-300);
    border-radius: var(--global-borderRadius);
  }
</style>
