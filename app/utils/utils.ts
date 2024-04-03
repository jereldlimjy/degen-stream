export function formatNumber(value: number) {
    if (Number.isInteger(value)) {
        return value.toLocaleString();
    } else {
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
        });

        return formatter.format(value);
    }
}
