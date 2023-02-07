registerPaint('powdered-gradient', class PowderedGradient {

    static get inputProperties() {
        return [
            `--powdered-gradient-direction`,
            `--powdered-gradient-color`,
            `--powdered-gradient-size`,
        ]
    }

    parseProps(props) {
        return [
            `--powdered-gradient-direction`,
            `--powdered-gradient-color`,
            `--powdered-gradient-size`,
        ].map(param =>
            props.get(param).toString().trim() || undefined)
    }

    paint(ctx, bounds, props) {
        const { width: w, height: h } = bounds
        const offset = .01
        const start = 1 + offset
        const sizekeys = {
            small: 1,
            medium: 2,
            large: 8,
        }

        let [
            direction = 'to-bottom',
            color = 'white',
            size = 1,
        ] = this.parseProps(props)

        size = isNaN(parseInt(size))
            ? sizekeys[size]
            : parseInt(size)

        const end = 1 / size - offset

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {

                switch (direction.toString()) {
                    case 'to-top':
                        if (Math.random() < (start - y / (h * end))) continue
                        break;
                    case 'to-left':
                        if (Math.random() < (start - x / (w * end))) continue
                        break;
                    case 'to-bottom':
                        if (Math.random() > (start - y / (h * end))) continue
                        break;
                    case 'to-right':
                        if (Math.random() > (start - x / (w * end))) continue
                        break;
                }

                ctx.beginPath()
                ctx.arc(x * (size / Math.random()), y * (size / Math.random()), size / 4, 0, 2 * Math.PI)
                ctx.fillStyle = color
                ctx.fill()
            }
        }
    }
})