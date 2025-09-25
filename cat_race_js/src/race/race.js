import getPower from "../status/power.js"

export default function raceCaculrate(speed, stemina, power) {
    if (stemina > 0) {
        const acceleration = accelerationCaculrate(speed, power)
        const newStemina = steminaCaculrate(stemina, speed, acceleration)
        const newSpeed = speed + acceleration
        return { speed: newSpeed, stemina: newStemina }
    } else {
        const newSpeed = speed
        const newStemina = stemina
        return { speed: newSpeed, stemina: newStemina }
    }
}

function steminaCaculrate(stemina, speed, acceleration) {
    return (stemina - (speed * acceleration))
}

function accelerationCaculrate(power) {
    return (getPower(power))
}