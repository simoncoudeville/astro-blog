<script>
  let zoomLevel = 100;
  let windowWidth = 1680;
  let fs = 48;
  let breakpoint1 = 841;
  let breakpoint2 = 1136;

  $: viewportWidth = windowWidth / (zoomLevel / 100);

  //   $: fs = 48;

  // update fs based on viewport width
  $: if (viewportWidth < breakpoint1) {
    fs = 48;
  } else if (viewportWidth < breakpoint2) {
    fs = 64;
  } else {
    fs = 96;
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
</script>

<div class="demo">
  <div class="demo__header">
    <h3 class="demo__title">Static respnsive type demo</h3>
  </div>
  <div class="demo__body">
    <p>
      <label for="staticZoomLevel"> Zoom level </label>
      <span class="input-field" data-suffix="%">
        <input
          type="number"
          name="Static zoom level"
          id="staticZoomLevel"
          bind:value={zoomLevel}
          min="100"
          max="500"
          step="10"
        />
      </span>
    </p>
    <p>
      <label for="staticWindowWidth"> Window width </label>
      <input
        type="range"
        name="Static window width"
        id="staticWindowWidth"
        bind:value={windowWidth}
        min="300"
        max="1920"
      />
    </p>
    <p>
      Zoom: {zoomLevel}%
    </p>
    <p>
      Window width: {windowWidth}px
    </p>
    <p>
      Viewport width: {round(viewportWidth, 2)}px
    </p>
    <p>
      Computed font-size: {fs}px
    </p>
    <p>
      Visual font-size: {round(fs * (zoomLevel / 100), 2)}px
    </p>
    <p class="demo-text" style="font-size: {fs * (zoomLevel / 100)}px;">
      Almost before we knew it, we had left the ground.
    </p>
  </div>
</div>

<style>
  .demo-text {
    line-height: 300px;
    /* ellipsis */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
