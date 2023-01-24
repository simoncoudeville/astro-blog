<script>
  import { round } from "../../../scripts/round";
  import { x1, x2, y1, y2 } from "./stores.js";
  import Reset from "../Components/Reset.svelte";
  import { e } from "../../../../dist/chunks/index.adc5df70";
  let unit = "px";

  // a function that resets the values to the default ones
  function resetClampCalculator() {
    x1.set(320);
    x2.set(960);
    y1.set(24);
    y2.set(48);
    selectedPreset = presets[0];
  }

  let presets = [
    {
      option: "Preset 1: zoom keeps working but slower",
      id: 1,
    },
    {
      option: "Preset 2: zoom stops working",
      id: 2,
    },
    {
      option: "Preset 3: negative zoom",
      id: 3,
    },
  ];

  let selectedPreset = presets[0];

  // based on the selected preset from the select element, set the values
  $: if (selectedPreset.id == 1) {
    x1.set(320);
    x2.set(960);
    y1.set(24);
    y2.set(48);
  } else if (selectedPreset.id == 2) {
    x1.set(320);
    x2.set(960);
    y1.set(24);
    y2.set(72);
  } else if (selectedPreset.id == 3) {
    x1.set(400);
    x2.set(800);
    y1.set(40);
    y2.set(100);
  }

  $: v = (100 * ($y2 - $y1)) / ($x2 - $x1);
  $: r = ($x1 * $y2 - $x2 * $y1) / ($x1 - $x2) / 16;
</script>

<div class="demo">
  <div class="demo__header">
    <h3 class="demo__title">fluid type clamp formula calculator</h3>
    <Reset
      functionName={resetClampCalculator}
      disabledParameters={$x1 == 320 && $x2 == 960 && $y1 == 32 && $y2 == 48}
    />
  </div>
  <div class="demo__body flow">
    <select name="presets" id="presets" bind:value={selectedPreset}>
      {#each presets as preset}
        <option value={preset}>
          {preset.option}
        </option>
      {/each}
    </select>

    <div class="calculator">
      <fieldset>
        <legend>Minimum viewport </legend>
        <div class="calculator__fieldset">
          <p>
            <label class="calculator__label" for="x1"> Width </label>
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={$x1}
                min="300"
                max={$x2 - 10}
                step="10"
                id="$"
              />
            </span>
          </p>
          <p>
            <label class="calculator__label" for="y1"> Font size </label>
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={$y1}
                min="16"
                max={$y2 - 1}
                step="1"
                id="y1"
              />
            </span>
          </p>
        </div>
      </fieldset>
      <fieldset>
        <legend>Maximum viewport</legend>
        <div class="calculator__fieldset">
          <p>
            <label class="calculator__label" for="x2"> Width </label>
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={$x2}
                min={$x1 + 10}
                max="1920"
                step="10"
                id="x2"
              />
            </span>
          </p>
          <p>
            <label class="calculator__label" for="y2"> Font size </label>
            <span class="input-field" data-suffix="px">
              <input
                type="number"
                bind:value={$y2}
                min={$y1 + 1}
                max="100"
                step="1"
                id="y2"
              />
            </span>
          </p>
        </div>
      </fieldset>
    </div>
    <p class="text-code text-xs">
      <span class="token property">font-size</span><span
        class="token punctuation">:</span
      >
      <span class="token function">clamp</span><span class="token punctuation"
        >(</span
      ><span class="token value"
        >{unit === "px"
          ? round($y1, 4) + "px"
          : round($y1 / 16, 4) + "rem"}</span
      ><span class="token punctuation">,</span>
      <span class="token value"
        >{round((($y2 - $y1) / ($x2 - $x1)) * 100, 4)}vw</span
      >
      <span class="token punctuation">+</span>
      <span class="token value"
        >{unit === "px"
          ? round(($x1 * $y2 - $x2 * $y1) / ($x1 - $x2), 4) + "px"
          : round(($x1 * $y2 - $x2 * $y1) / ($x1 - $x2) / 16, 4) + "rem"}</span
      ><span class="token punctuation">,</span>
      <span class="token value"
        >{unit === "px"
          ? round($y2, 4) + "px"
          : round($y2 / 16, 4) + "rem"}</span
      ><span class="token punctuation">);</span>
    </p>
    <!-- <h4>Where</h4>
    <p class="text-code text-xs">
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
    </p> -->
  </div>
</div>

<style>
  .calculator {
    display: grid;
    gap: var(--global-whitespace-s);
    grid-template-columns: 1fr 1fr;
  }

  .calculator__fieldset {
    display: grid;
    gap: var(--global-whitespace-s);
    grid-template-columns: 1fr 1fr;
  }

  .calculator {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
</style>
