<script>
  import { round } from "../../../scripts/round";
  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div
  class="demo"
  on:mousemove={handleMousemove}
  style="--mx: {m.x}px; --my: {m.y}px"
>
  <div class="demo__header">
    <h2 class="demo__title">Advanced demo</h2>
  </div>
  <div class="demo-nav text-s">
    <ul class="demo-nav__list">
      <li class="demo-nav__item">
        <a href="#!" class="demo-nav__link">Default</a>
      </li>
      <li class="demo-nav__item">
        <a href="#!" class="demo-nav__link cursor-read">Word</a>
      </li>
      <li class="demo-nav__item">
        <a href="#!" class="demo-nav__link cursor-icon">Icon</a>
      </li>
    </ul>
  </div>
  <!-- <p>
    The mouse position is {round(m.x, 0)} x {round(m.y, 0)}
  </p> -->

  <div class="cursor">
    <div class="cursor__pointer cursor__pointer--default" />
    <div class="cursor__pointer cursor__pointer--action cursor__pointer--read">
      View
    </div>
    <div class="cursor__pointer cursor__pointer--action cursor__pointer--icon">
      <svg
        class="icon icon-plus cursor__icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <g id="Group_1" data-name="Group 1" transform="translate(-0.75 -0.75)">
          <line
            id="Line_1"
            data-name="Line 1"
            class="icon-plus-line"
            y2="10"
            transform="translate(10.75 5.75)"
          />
          <line
            id="Line_2"
            data-name="Line 2"
            class="icon-plus-line"
            y2="10"
            transform="translate(15.75 10.75) rotate(90)"
          />
        </g>
      </svg>
    </div>
  </div>
</div>

<style>
  .demo {
    position: relative;
    cursor: none;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
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
    --cursor-diameter: 80px;
    position: fixed;
    top: 0;
    left: 0;
    translate: calc(var(--mx) - var(--cursor-diameter) / 2)
      calc(var(--my) - var(--cursor-diameter) / 2);
    border-radius: 50%;
    width: var(--cursor-diameter);
    aspect-ratio: 1/1;
    pointer-events: none;
    display: grid;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .cursor__pointer {
    grid-row: 1;
    grid-column: 1;
    position: relative;
    width: var(--cursor-diameter);
    height: var(--cursor-diameter);
    transform-origin: 50% 50%;
    border-radius: 50%;
    background: var(--global-accent-color);
    transition: 0.25s ease;
    scale: 0.25;
    color: var(--global-color-neutral-025);
  }

  .cursor__pointer--action {
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: var(--global-font-family-code);
    text-transform: uppercase;
  }

  .cursor__icon {
    scale: 2;
  }

  .demo-nav__list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    /* gap: var(--global-whitespace); */
  }

  .demo-nav__link:any-link {
    display: inline-block;
    color: var(--global-text-color);
    cursor: none;
    text-decoration: none;
    text-decoration-color: inherit;
    transition: 0.2s ease;
    /* padding: var(--global-whitespace-4xs) var(--global-whitespace-2xs)
      calc(var(--global-whitespace-4xs) + 2px); */
    padding: calc(var(--global-whitespace-4xs) - 1px)
      var(--global-whitespace-2xs) calc(var(--global-whitespace-4xs) + 1px);
    /* background-color: var(--global-foregroundColor2); */
    border: 1px solid var(--global-borderColor);
    border-radius: var(--global-borderRadius);
  }

  .demo-nav__link:hover {
    color: var(--global-accent-color);
  }

  .demo:has(a:hover) .cursor__pointer {
    scale: 0.5;
  }

  .demo:has(a:hover) .cursor__pointer--default {
    opacity: 0.5;
  }

  .demo:has(.cursor-read:hover) .cursor__pointer {
    scale: 1;
  }

  .demo:has(.cursor-read:active) .cursor__pointer {
    scale: 0.9;
  }

  .demo:has(.cursor-read:hover) .cursor__pointer--read {
    opacity: 1;
  }

  .demo:has(.cursor-icon:hover) .cursor__pointer {
    scale: 0.5;
  }

  .demo:has(.cursor-icon:active) .cursor__pointer {
    scale: 0.4;
  }

  .demo:has(.cursor-icon:hover) .cursor__pointer--icon {
    opacity: 1;
  }

  .demo:has(a:active) .cursor__pointer--default {
    scale: 0.4;
  }
</style>
