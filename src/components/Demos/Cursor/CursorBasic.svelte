<script>
  let m = { x: 300, y: 200 };

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
    <h2 class="demo__title">Basic demo</h2>
  </div>
  <div class="demo__elements">
    <a href="#!" class="demo__link">Link</a>
    <button class="demo__button">Button</button>
  </div>
  <!-- <p class="text-xs color-muted text-code">
    Mouse position: {round(m.x, 0)} x {round(m.y, 0)}
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

  .demo__elements {
    display: flex;
    gap: var(--global-whitespace);
    align-items: center;
  }

  .cursor {
    --cursor-diameter: 20px;
    width: var(--cursor-diameter);
    aspect-ratio: 1/1;
    background-color: var(--global-accent-color);
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    translate: calc(var(--mx) - var(--cursor-diameter) / 2)
      calc(var(--my) - var(--cursor-diameter) / 2);
    opacity: 0;
    /* backdrop-filter: invert(1) grayscale(1) contrast(150%); */
    will-change: scale, opacity;
    transition: 0.25s ease;
    transition-property: scale, opacity;
    pointer-events: none;
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
    padding: calc(var(--global-whitespace-3xs) - 1px)
      var(--global-whitespace-xs) calc(var(--global-whitespace-3xs) + 1px);
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
    /* backdrop-filter: opacity(75%); */
  }

  .demo:has(:is(a:active, button:active)) .cursor {
    scale: 1.5;
    opacity: 0.75;
  }

  .demo:has(:is(a:hover, button:hover)) .demo__collision {
    opacity: 1;
  }
</style>
