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
  <a href="#!" class="demo__link text-s">Default</a>
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

  .demo:hover .cursor {
    opacity: 1;
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
    /* opacity: 0; */
    background-color: var(--global-accent-color);
    will-change: scale, opacity;
    transition: 0.25s ease;
    transition-property: scale, opacity;
  }

  .demo__link:any-link {
    display: inline-block;
    color: var(--global-text-color);
    cursor: none;
    text-decoration: none;
    text-decoration-color: inherit;
    transition: 0.2s ease;
    padding: var(--global-whitespace-4xs) var(--global-whitespace-2xs);
    /* background-color: var(--global-backgroundColor); */
    border: 1px solid var(--global-borderColor);
    border-radius: var(--global-borderRadius);
    /* box-shadow: 0 1px 0 1px var(--global-borderColor); */
    /* border-radius: 2rem; */
  }

  .demo__link:hover {
    color: var(--global-accent-color);
    /* border-color: var(--global-borderColor2); */
    /* background-color: var(--global-foregroundColor2); */
    /* border-color: var(--global-text-color); */
  }

  .demo:has(a:hover) .cursor {
    scale: 2;
    opacity: 0.75;
  }

  .demo:has(a:active) .cursor {
    scale: 1.5;
    opacity: 0.75;
  }
</style>
