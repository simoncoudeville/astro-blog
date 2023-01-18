export function round(value, decimals, showdecimals = false) {
    if (showdecimals) {
        return Number(
            Math.round(value + "e" + decimals) + "e-" + decimals
        ).toFixed(decimals);
    } else {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }
}