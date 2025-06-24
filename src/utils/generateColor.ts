export function generateColor(seed: string): string {
    const hash = Array.from(seed).reduce((acc, char) => {
        return (acc << 5) - acc + char.charCodeAt(0);
    }, 0);

    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`;
}
