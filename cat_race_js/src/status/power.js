export default function getPower(power) {
    const max = power + 2
    const min = power - 1
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}