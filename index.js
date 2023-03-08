const counterSpan = document.querySelector('.counter-value')
const addButton = document.querySelector('.add-button')
const minusButton = document.querySelector('.minus-button')

let counterValue = 0

window.addEventListener('load', function () {
    refreshCounterValue(counterValue)
})

function refreshCounterValue(counterValue) {
    counterSpan.textContent = counterValue;
}

addButton.addEventListener('click', function () {
    counterValue += 1
    refreshCounterValue(counterValue)
})

minusButton.addEventListener('click', function () {
    if (counterValue === 0) {
        alert("Counter cannot be less than 0")
        return
    }
    counterValue -= 1
    refreshCounterValue(counterValue)
})