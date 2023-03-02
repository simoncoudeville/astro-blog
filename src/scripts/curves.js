class CurvesPainter {
    static get inputProperties() { return ['--gradient-stop-1', '--seed', '--gradient-stop-2', '--lines']; }
    paint(context, size, properties) {
        const lines = properties.get('--lines');
        const seed = properties.get('--seed') / 10;
        // const lines = 5;

        const width = size.width;
        const height = size.height;

        // create sine waves accross the convas from top to bottom without animation and randomize the amplitude
        var waves = [];
        for (var i = 0; i < height + height / lines; i += height / lines) {
            var wave = {
                y: i - height / lines / 2,
                // amplitude: i / 100 + lines / 2,
                // frequency: (i + 100) * 0.0001,
                // phase: Math.PI * 2
                // amplitude: seed * 20 + 10,
                // frequency: seed * 0.01 + 0.005,
                // phase: seed * Math.PI * 2
                amplitude: Math.random() * 20 + 10,
                frequency: Math.random() * 0.01 + 0.005,
                phase: Math.random() * Math.PI * 2
                // phase: width / 2
            };
            waves.push(wave);
        }

        render();

        function render() {
            // clear the canvas
            // context.clearRect(0, 0, width, height);

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
                }
                context.lineTo(width, wave.y + height / lines * lines);
                context.lineTo(0, wave.y + height / lines * lines);
                context.closePath();

                const gradient = context.createLinearGradient(0, wave.y, 0, wave.y + height / lines * lines);
                // const gradient = context.createLinearGradient(0, 0, 0, wave.y + height / lines * 1.5);
                gradient.addColorStop(0, properties.get('--gradient-stop-1'));
                gradient.addColorStop(1, properties.get('--gradient-stop-2'));

                context.fillStyle = gradient;
                context.fill();
                // context.filter = "blur(" + i + "px)";
                // make the first waves blurrier and the last ones sharper
                context.filter = "blur(" + (waves.length - i - lines / 2) + "px)";
                // math random number between 1 and 6
                // context.filter = "blur(" + Math.floor(Math.random() * 6) + "px)";
                // context.filter = "blur(10px)";
                // context.stroke();
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

registerPaint('curves', CurvesPainter);