const sliders = document.querySelectorAll('.slide')
const indicators = document.querySelectorAll('.indicator')
const nextButton = document.querySelector('.next')
const prevButton = document.querySelector('.prev')

let currentSlide = 0
const noOfSlides = sliders.length
const goToSlide = (slideIndex) => {
    indicators.forEach(indicator => {
        indicator.classList.remove('active-indicator')
    })
    indicators[slideIndex].classList.add('active-indicator')
    sliders.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`
    })
}
nextButton.addEventListener('click', () => {
    if (currentSlide === noOfSlides - 1) {
        currentSlide = 0
    } else {
        currentSlide++
    }
    goToSlide(currentSlide)
})
prevButton.addEventListener('click', () => {
    if (currentSlide === 0) {
        currentSlide = noOfSlides - 1
    } else {
        currentSlide--
    }
    goToSlide(currentSlide)
})