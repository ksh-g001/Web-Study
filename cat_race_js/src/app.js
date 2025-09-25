import statusInit from "./status/init.js"
import {
    ROLLING_CAT_URL,
    FRAME_WIDTH_DISPLAY,
    TOTAL_CAT_FRAME
} from './uiData.js'
import raceCaculrate from "./race/race.js"
import getAverageSpeed from "./race/speedCaculator.js"


const catCountDropdown = document.getElementById('catCountDropdown')
const startButton = document.getElementById('startButton')
const catRaceContainer = document.getElementById('catRaceContainer')
const catLanesWrapper = document.getElementById('catLanesWrapper')
const raceStatusMessage = document.getElementById('raceStatusMessage')
const rollingCatLeftElement = document.getElementById('rolling-cat-left')
const rollingCatRightElement = document.getElementById('rolling-cat-right')
const ratingElement = document.getElementById('rating')

const catLaneWidth = 800
const raceFinishLine = catLaneWidth - FRAME_WIDTH_DISPLAY
console.log(raceFinishLine)


let intervalIDs = new Array(6)
let intervalMovingIDs = new Array(6)
let allCatStatus = new Array(6)
let selectedCatCount = parseInt(catCountDropdown.value)
let isRaceStarted = false
let isRaceFinished = false
let raceRating = []
let startTime = 0

const rollingCatLeft = lottie.loadAnimation({
    container: rollingCatLeftElement,
    render: 'svg',
    loop: true,
    autoplay: true,
    path: ROLLING_CAT_URL
})
const rollingCatRight = lottie.loadAnimation({
    container: rollingCatRightElement,
    render: 'svg',
    loop: true,
    autoplay: true,
    path: ROLLING_CAT_URL
})




function createCatLane(catId) {
    const catLane = document.createElement('div')
    catLane.className = 'cat-lane'

    const catImageContainer = document.createElement('div')
    catImageContainer.className = 'cat-image-container'
    const catImage = document.createElement('div')
    catImage.className = 'cat-image'

    catLane.appendChild(catImageContainer)
    catImageContainer.appendChild(catImage)

    startCatMove(catId, catImageContainer, allCatStatus[catId - 1].speed)

    let currentFrame = 0
    function animationSprite() {
        const posX = -currentFrame * FRAME_WIDTH_DISPLAY;
        catImage.style.backgroundPosition = `${posX}px 0`

        currentFrame++;
        if (currentFrame >= TOTAL_CAT_FRAME) {
            currentFrame = 0
        }
    }
    intervalIDs[catId - 1] = setInterval(animationSprite, 300);

    return catLane
}

function createAllCatStatus() {
    allCatStatus = statusInit(selectedCatCount)
}

function stopAnimationSprite(index) {
    clearInterval(intervalIDs[index])
}

function startCatMove(catId, catImageContainer) {
    let currentCatPosition = 0

    function move() {
        if (!isRaceStarted) {
            clearInterval(intervalMovingIDs[catId - 1])
            return
        }
        const preCatInfo = allCatStatus[catId - 1]
        const catTempSpeedAndStemina = raceCaculrate(preCatInfo.speed, preCatInfo.stemina, preCatInfo.power)
        allCatStatus[catId - 1].speed = catTempSpeedAndStemina.speed
        allCatStatus[catId - 1].stemina = catTempSpeedAndStemina.stemina
        const catInfo = allCatStatus[catId - 1]
        currentCatPosition += catInfo.speed
        catImageContainer.style.transform = `translateX(${currentCatPosition}px)`

        if (currentCatPosition >= raceFinishLine) {
            const endTime = Date.now()
            const averageSpeed = getAverageSpeed(catLaneWidth, startTime, endTime)
            catInfo.averageSpeed = averageSpeed.toFixed(4)
            raceRating.push(catInfo)
            catImageContainer.style.transform = `translateX(${raceFinishLine}px)`

            stopAnimationSprite(catId - 1)
            if (raceRating.length == selectedCatCount) {
                raceStatusMessage.textContent = "레이스가 종료됐습니다"
                ratingElement.style.display = 'block'
                const ratingDes = document.createElement('h4')
                ratingDes.textContent = `${selectedCatCount}마리 고양이 레이스(${catLaneWidth}m)`
                ratingDes.className = 'rating-des'

                ratingElement.appendChild(ratingDes)

                for (let i = 0; i < raceRating.length; i++) {
                    const ratingText = document.createElement('p')
                    ratingText.className = 'rating-text'
                    ratingText.textContent = `${i + 1}등 : ${raceRating[i].id} (${raceRating[i].averageSpeed}m/s)`
                    ratingElement.appendChild(ratingText)
                }
            }
            clearInterval(intervalMovingIDs[catId - 1])
        }
    }

    intervalMovingIDs[catId - 1] = setInterval(move, 50)
}

catCountDropdown.addEventListener('change', (event) => {
    selectedCatCount = parseInt(event.target.value)
    if (!isRaceStarted) {
        return
    }

    isRaceStarted = false
    startButton.disabled = false
    rollingCatLeft.play()
    rollingCatRight.play()

    rollingCatLeftElement.style.display = 'flex'
    rollingCatRightElement.style.display = 'flex'
    catRaceContainer.style.display = 'none'
    ratingElement.style.display = 'none'
    catLanesWrapper.innerHTML = ''
    raceStatusMessage.style.display = 'none'
    ratingElement.innerHTML = ''


    stopAnimationSprite()
    console.log(`선택된 고양이 수: ${selectedCatCount}마리`)
})

startButton.addEventListener('click', () => {
    isRaceStarted = true
    isRaceFinished = false
    startButton.disabled = true
    rollingCatLeft.stop()
    rollingCatRight.stop()


    rollingCatLeftElement.style.display = 'none'
    rollingCatRightElement.style.display = 'none'
    catRaceContainer.style.display = 'flex'
    catLanesWrapper.innerHTML = ''

    createAllCatStatus()
    raceRating = []
    startTime = Date.now()

    for (let i = 1; i <= selectedCatCount; i++) {
        const catLane = createCatLane(i)
        catLanesWrapper.appendChild(catLane)
        console.log(`${i}고양이 생성완료`)
    }


    raceStatusMessage.textContent = `${selectedCatCount}마리 고양이 레이스(${catLaneWidth}m)`
    raceStatusMessage.style.display = 'block'
})

selectedCatCount = parseInt(catCountDropdown.value)