import { readable, writable } from 'svelte/store';

export const x1 = writable(320);
export const x2 = writable(960);
export const y1 = writable(32);
export const y2 = writable(48);

export const zoomLevels = readable([
    25, 33, 50, 67, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
    190, 200, 250, 300, 400, 500,
]);