export default function getRandomElemFromArray(data, amount) {
    const shuffled = [...data].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, amount);
}