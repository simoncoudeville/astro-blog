<script>
  import { round } from "../../../scripts/round";
  import { x1, x2, y1, y2 } from "./stores.js";
  import Reset from "../Components/Reset.svelte";
  import IconDown from "../../Icons/IconDown.svelte";
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
      option: "Zoom keeps working but slower",
      id: 1,
    },
    {
      option: "Zoom stops working",
      id: 2,
    },
    {
      option: "Negative zoom",
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
    x1.set(500);
    x2.set(1000);
    y1.set(30);
    y2.set(100);
  }

  $: v = (100 * ($y2 - $y1)) / ($x2 - $x1);
  $: r = ($x1 * $y2 - $x2 * $y1) / ($x1 - $x2) / 16;
</script>

<div class="flow">
  <div class="demo">
    <!-- <div class="demo__header">
      <h3 class="demo__title">fluid type clamp formula calculator</h3>

    </div> -->
    <div class="demo__body flow">
      <div class="flex align-center gap">
        <label class="pb-clear text-s" for="presets">Presets: </label>
        <div class="custom-select grow-1">
          <select
            class="custom-select__select"
            name="presets"
            id="presets"
            bind:value={selectedPreset}
          >
            {#each presets as preset}
              <option value={preset}>
                {preset.option}
              </option>
            {/each}
          </select>
          <IconDown className="custom-select__down" />
        </div>
      </div>
      <div class="calculator">
        <fieldset>
          <legend class="text-s">Minimum viewport </legend>
          <div class="calculator__fieldset">
            <p>
              <label class="calculator__label text-s" for="x1">Width</label>
              <span class="input-field">
                <input
                  type="number"
                  bind:value={$x1}
                  min="300"
                  max={$x2 - 10}
                  step="10"
                  id="x1"
                />
              </span>
            </p>
            <p>
              <label class="calculator__label text-s" for="y1"
                >Font size
              </label>
              <span class="input-field">
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
          <legend class="text-s">Maximum viewport</legend>
          <div class="calculator__fieldset">
            <p>
              <label class="calculator__label text-s" for="x2">Width </label>
              <span class="input-field">
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
              <label class="calculator__label text-s" for="y2"
                >Font size
              </label>
              <span class="input-field">
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
      <pre class="text-xs"><code class="language-css"
          ><span class="token selector">h1</span> <span
            class="token punctuation">&lcub;</span
          >
  <span class="token property">font-size</span><span class="token punctuation"
            >: </span><span class="token function">clamp</span><span
            class="token punctuation">(</span
          ><span class="token value"
            >{unit === "px"
              ? round($y1, 4) + "px"
              : round($y1 / 16, 4) + "rem"}</span
          ><span class="token punctuation">, </span><span class="token value"
            >{round((($y2 - $y1) / ($x2 - $x1)) * 100, 4)}vw</span
          ><span class="token punctuation"> + </span><span class="token value"
            >{unit === "px"
              ? round(($x1 * $y2 - $x2 * $y1) / ($x1 - $x2), 4) + "px"
              : round(($x1 * $y2 - $x2 * $y1) / ($x1 - $x2) / 16, 4) +
                "rem"}</span
          ><span class="token punctuation">, </span><span class="token value"
            >{unit === "px"
              ? round($y2, 4) + "px"
              : round($y2 / 16, 4) + "rem"}</span
          ><span class="token punctuation">);</span>
<span class="token punctuation">&rcub;</span></code
        ></pre>
    </div>
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
