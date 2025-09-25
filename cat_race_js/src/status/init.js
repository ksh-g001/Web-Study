import {
    MAX_SPEED,
    MIN_SPEED,
    MAX_STEMINA,
    MIN_STEMINA,
    MAX_POWER,
    MIN_POWER,
} from './statusData.js';

export default function statusInit(cnt) {
    let status = []
    for (let i = 0; i < cnt; i++) {
        status.push(randomStatus(i))
        console.log(`생성한 ${status[i].id} 고양이의 능력치= speed: ${status[i].speed} stemina: ${status[i].stemina} power: ${status[i].power}`)
    }
    return status
}

function randomStatus(i) {
    return {
        id: `Cat ${i + 1}`,
        speed: randomInt(MIN_SPEED, MAX_SPEED),
        stemina: randomInt(MIN_STEMINA, MAX_STEMINA),
        power: randomInt(MIN_POWER, MAX_POWER)
    }
}

function randomInt(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}