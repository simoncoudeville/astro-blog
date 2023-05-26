import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";

class CurvesPainter2 {
    static get inputProperties() { return ['--gradient-stop-1', '--stroke-color', '--seed', '--gradient-stop-2', '--lines']; }
    paint(context, size, properties) {
        const width = size.width;
        const height = size.height;
        // const lines = properties.get('--lines');
        const lines = height / properties.get('--lines');
        const seed = Math.floor(properties.get('--seed'));

        context.lineWidth = 1;
        context.strokeStyle = properties.get('--stroke-color');

        // create sine waves accross the convas from top to bottom without animation and randomize the amplitude
        var waves = [];
        for (var i = 0; i < height + height / lines * 10; i += height / lines) {
            var wave = {
                y: i - height / lines * 2,
                // grow the difference between the waves from top to bottom
                // amplitude: 20,
                // make the amplitude differ slightly from one wave to the next
                amplitude: height / lines * 2 + i / lines * 2,
                // amplitude: 0,
                frequency: 0.01,
                phase: seed * 10 + Math.PI * 2 + i / lines
                // amplitude: seed * 20 + 10,
                // frequency: seed * 0.01 + 0.005,
                // phase: seed * Math.PI * 2
                // amplitude: Math.random() * 20 + 10,
                // frequency: Math.random() * 0.01 + 0.005,
                // phase: Math.random() * Math.PI * 2
                // phase: width / 2
            };
            waves.push(wave);
        }

        render();

        function render() {
            // clear the canvas
            // context.clearRect(0, 0, width, height);

            random.use(seedrandom(seed));

            // draw sine waves
            for (var i = 0; i < waves.length; i += 1) {
                var wave = waves[i];
                context.moveTo(0, wave.y);
                context.beginPath();
                for (var x = 0; x < width + 1; x += 1) {
                    var value = wave.amplitude * Math.sin(x * wave.frequency + wave.phase);
                    // var value = wave.amplitude * Math.floor(Math.random() * 10) * Math.sin(x * wave.frequency + wave.phase);
                    // var value = wave.amplitude * Math.sin(x * wave.frequency + phase);
                    context.lineTo(x, wave.y + value);
                    // context.lineWidth = 1 + value;
                    // context.arc(x, wave.y + value, 1, 0, Math.PI * 2);
                }
                // context.lineTo(width, wave.y + height / lines * lines);
                // context.lineTo(0, wave.y + height / lines * lines);
                // context.closePath();

                // const gradient = context.createLinearGradient(0, wave.y, 0, wave.y + height / lines * lines);
                // // const gradient = context.createLinearGradient(0, 0, 0, wave.y + height / lines * 1.5);
                // gradient.addColorStop(0, properties.get('--gradient-stop-1'));
                // gradient.addColorStop(1, properties.get('--gradient-stop-2'));

                // context.filter = "opacity(" + Math.random() * 10 + "%)";
                // change the linewidth from top to bottom
                // context.lineWidth = 1 + i / lines * 2;
                // change the linewidth from top to center and back
                // context.lineWidth = 1 + i / lines * 2;
                // context.lineWidth = 1 + i / lines * 2 + Math.random() * height / lines;
                // context.lineWidth = 1 + Math.random() * height / lines * 2;

                // context.setLineDash([Math.random() * width + height, Math.random() * width + height]);

                context.stroke();
                // context.rotate((180 * Math.PI) / 180);
            }

            // call this function again in one frame tick
            // requestAnimationFrame(render);
        }
    }
    // paint(ctx, size, properties) {
    //     ctx.lineWidth = properties.get('--stroke-width');
    //     ctx.strokeStyle = properties.get('--stroke-color');
    //     ctx.fillStyle = properties.get('--fill');

    //     var gridw = size.width;
    //     var gridh = size.height;

    //     ctx.moveTo(0, size.height / 2);
    //     ctx.bezierCurveTo(0 + size.width / 2, size.height, size.width - size.width / 2, 0, size.width, size.height / 2);
    //     ctx.lineTo(size.width, size.height);
    //     ctx.lineTo(0, size.height);
    //     ctx.closePath();
    //     ctx.fill();
    // }
}

registerPaint('curves2', CurvesPainter2);