export function generateColor(seed: string): string {
    const hash = Array.from(seed).reduce((acc, char) => {
        return (acc << 5) - acc + char.charCodeAt(0);
    }, 0);

    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`;
}

export const indexColor = [
    'border border-blue-400 bg-white',
    'border border-green-400 bg-white',
    'border border-purple-400 bg-white',
    'border border-pink-400 bg-white',
    'border border-yellow-400 bg-white',
    'border border-orange-400 bg-white',
    'border border-rose-400 bg-white',
    'border border-teal-400 bg-white',
];