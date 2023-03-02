class PlaceholderBoxPainter {
    static get inputProperties() { return ['--stroke-color', '--stroke-width', '--line-lenght', '--theta', '--stroke-color-2', '--stroke-color-3', '--fill', '--cols', '--rows']; }
    paint(ctx, size, properties) {
        ctx.lineWidth = properties.get('--stroke-width');
        ctx.strokeStyle = properties.get('--stroke-color');
        ctx.fillStyle = properties.get('--fill');

        // draw line from top left to bottom right
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(size.width, size.height);
        // ctx.stroke();

        // draw line from top right to bottom left
        // ctx.beginPath();
        // ctx.moveTo(size.width, 0);
        // ctx.lineTo(0, size.height);
        // ctx.stroke();

        // for (let i = 0 - 40; i <= size.width; i++) {
        //     const xTop = size.width / 2 + i * 10;
        //     const xBottom = size.width / 2 + i * 80;
        //     ctx.beginPath();
        //     ctx.moveTo(xTop, -1);
        //     ctx.lineTo(xBottom, size.height);
        //     ctx.stroke();
        // }

        // first flow field

        var cols = properties.get('--cols');
        var rows = properties.get('--rows');
        // var cols = 10;
        // var rows = 5;
        var cells = cols * rows;

        var gridw = size.width;
        var gridh = size.height;

        var lineLength = properties.get('--line-lenght');

        var cellw = gridw / cols;
        var cellh = gridh / rows;
        var margx = (size.width - gridw) * 0.5;
        var margy = (size.height - gridh) * 0.5;
        var points = [];

        for (let i = 0; i < cells; i++) {
            var col = Math.floor(i / rows);
            var row = i % rows;

            var x = margx + col * cellw;
            var y = margy + row * cellh;

            // var x = col * cellw;
            // var y = row * cellh;
            // var x = col * cellw;
            // var y = row * cellh;

            ctx.save();
            ctx.translate(x, y);

            ctx.translate(cellw * 0.5, cellh * 0.5);

            // draw a rect with cellh and cellw
            // ctx.beginPath();
            // ctx.rect(x, y, cellw, cellh);
            // ctx.lineWidth = 2;
            // ctx.stroke();
            // ctx.fill();

            // ctx.filter = "blur(40px)";

            var phi = (i / cells) * Math.PI;
            // var theta = Math.sin(phi) * Math.PI * 0.25;
            var theta = Math.sin(phi) * Math.PI * properties.get('--theta');

            ctx.rotate(theta);

            // create an array of points with x and y
            points.push({ x: x, y: y, theta: theta });

            // draw a dot at the point in the array
            // ctx.beginPath();
            // ctx.arc(0, 0, 2, 0, Math.PI * 2);
            // // ctx.arc(0, 0, Math.random() * 100, 0, Math.PI * 2);
            // ctx.lineWidth = 2;
            // ctx.stroke();
            // // ctx.fillStyle = properties.get('--stroke-color-3');
            // ctx.fill();


            // the lines
            ctx.beginPath();
            ctx.moveTo(lineLength / 2, 0);
            ctx.lineTo(lineLength / -2, 0);
            ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(-10, 0);
            // ctx.lineWidth = 10;
            // ctx.lineWidth = Math.random() * 10;
            // ctx.quadraticCurveTo(0, -50, 200, 0);
            // ctx.stroke();

            ctx.restore();
        }

        // console.log(points);

        // draw a line between the first and last point in the array and the second and second last point and so on
        // for (let i = 0; i < points.length / 2; i++) {
        //     // for (let i = 0; i < 1; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(points[i].x, points[i].y);
        //     // ctx.lineTo(points[points.length - 1 - i].x, points[points.length - 1 - i].y);
        //     ctx.bezierCurveTo(0 + size.width / 2, size.height, size.width - size.width / 2, 0, points[points.length - 1 - i].x, points[points.length - 1 - i].y);
        //     // ctx.quadraticCurveTo(100, 100, points[49].x, points[18].y);
        //     ctx.lineCap = "round";
        //     ctx.stroke();
        // }

        // draw lines between all the points in the array
        // for (let i = 0; i < points.length; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(points[i].x, points[i].y);
        //     // line between random points
        //     ctx.lineTo(points[Math.floor(Math.random() * points.length)].x, points[Math.floor(Math.random() * points.length)].y);
        //     // ctx.lineTo(points[i + 1].x, points[i + 1].y);
        //     // ctx.quadraticCurveTo(10, 100, points[i].x, points[i].y);
        //     // ctx.quadraticCurveTo(100, 10, points[i].x, points[i].y);
        //     ctx.lineCap = "round";
        //     ctx.stroke();
        // }

        // draw lines between point between points in the array of points
        // ctx.beginPath();
        // ctx.moveTo(points[0].x, points[0].y);
        // ctx.quadraticCurveTo(100, 100, points[49].x, points[18].y);
        // ctx.lineCap = "round";
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(points[2].x, points[1].y);
        // ctx.quadraticCurveTo(100, 100, points[49].x, points[17].y);
        // ctx.lineCap = "round";
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(points[0].x, points[0].y);
        // ctx.quadraticCurveTo(points[30].x, 0, points[49].x, points[49].y);
        // ctx.lineCap = "round";
        // ctx.stroke();

        // end first flow field

        // second flow field

        // const width = size.width;
        // const height = size.height;

        // var count = 200;

        // const strokeColors = ['--stroke-color', '--stroke-color-2', '--stroke-color-3'];

        // for (var i = 0; i < count; i++) {
        //     var x = Math.random() * width,
        //         y = Math.random() * height;

        //     var value = getValue(x, y);

        //     ctx.save();
        //     // ctx.translate(x, y);

        //     render(value);

        //     ctx.restore();

        //     ctx.strokeStyle = properties.get(strokeColors[Math.floor(Math.random() * strokeColors.length)]);
        // }

        // function getValue(x, y) {
        //     return (x + y) * 0.001 * Math.PI * 2;
        // }

        // function render(value) {
        //     // ctx.rotate(value);
        //     ctx.beginPath();
        //     ctx.moveTo(0, 0);
        //     // ctx.lineTo(x, y);
        //     ctx.lineWidth = Math.random() * 10;
        //     ctx.quadraticCurveTo(value * 50, value * 50, x, y);
        //     ctx.setLineDash([Math.random() * 200, Math.random() * 50, Math.random() * 100, Math.random() * 50, Math.random() * 50], Math.random() * 100);

        //     ctx.stroke();
        // }

        // end second flow field

    }
}

registerPaint('placeholder-box', PlaceholderBoxPainter);