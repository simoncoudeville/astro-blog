<script>
  import { round } from "../../../scripts/round";
  let m = { x: 300, y: 200 };

  function handleMousemove(event) {
    const r = event.currentTarget.getBoundingClientRect();
    m.x = event.clientX - r.x;
    m.y = event.clientY - r.y;
  }
</script>

<div
  class="demo"
  on:mousemove={handleMousemove}
  style="--mx: {m.x}px; --my: {m.y}px"
>
  <div class="demo__header">
    <h2 class="demo__title">Basic demo</h2>
  </div>
  <div class="demo__elements">
    <a href="#!" class="demo__link text-s">Link</a>
    <button class="demo__button text-s">Button</button>
  </div>
  <div class="demo__collision text-s color-muted">Collision detected</div>
  <!-- <p>
    The mouse position is {round(m.x, 0)} x {round(m.y, 0)}
  </p> -->

  <div class="cursor" />
</div>

<style>
  .demo {
    position: relative;
    cursor: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
  }

  .demo__header {
    position: absolute;
    top: 0;
    left: 0;
  }

  .demo__collision {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: 0.25s ease;
    transition-property: opacity;
  }

  .demo:hover .cursor {
    opacity: 1;
  }

  .demo__elements {
    display: flex;
    gap: var(--global-whitespace);
    align-items: center;
  }

  .cursor {
    --cursor-width: 20px;
    --cursor-height: 20px;
    position: absolute;
    top: calc(var(--my) - var(--cursor-height) / 2);
    left: calc(var(--mx) - var(--cursor-width) / 2);
    /* top: calc(var(--cursor-height) / -2);
    left: calc(var(--cursor-width) / -2); */
    /* translate: var(--mx) var(--my); */
    border-radius: 50%;
    height: var(--cursor-height);
    width: var(--cursor-width);
    pointer-events: none;
    opacity: 0;
    background-color: var(--global-accent-color);
    will-change: scale, opacity;
    transition: 0.25s ease;
    transition-property: scale, opacity;
  }

  .demo__link:any-link {
    display: inline-block;
    color: var(--global-text-color);
    cursor: none;
    /* text-decoration: none; */
    text-decoration-color: inherit;
    /* background-color: var(--global-backgroundColor); */
    /* border: 1px solid var(--global-borderColor);
    border-radius: var(--global-borderRadius); */
  }

  .demo__button {
    /* font: inherit; */
    /* all: unset; */
    background-color: transparent;
    font-family: inherit;
    display: inline-block;
    color: var(--global-text-color);
    cursor: none;
    text-decoration: none;
    text-decoration-color: inherit;
    transition: 0.2s ease;
    padding: calc(var(--global-whitespace-4xs) - 1px)
      var(--global-whitespace-2xs) calc(var(--global-whitespace-4xs) + 1px);
    /* background-color: var(--global-backgroundColor); */
    border: 1px solid var(--global-borderColor);
    border-radius: var(--global-borderRadius);
  }

  .demo__link:hover,
  .demo__button:hover {
    color: var(--global-accent-color);
    /* border-color: var(--global-borderColor2); */
    /* background-color: var(--global-foregroundColor2); */
    /* border-color: var(--global-text-color); */
  }

  .demo:has(:is(a:hover, button:hover)) .cursor {
    scale: 2;
    opacity: 0.75;
  }

  .demo:has(:is(a:active, button:active)) .cursor {
    scale: 1.5;
    opacity: 0.75;
  }

  .demo:has(:is(a:hover, button:hover)) .demo__collision {
    opacity: 1;
  }
</style>
