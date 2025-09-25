export default function getAverageSpeed(catLaneWidth, startTime, endTime) {
    return catLaneWidth / getTime(startTime, endTime)
}

function getTime(startTime, endTime) {
    return endTime - startTime
}
