function reveal() {
    const reveals  = document.querySelectorAll('.reveal')
    reveals.forEach(reveal => {
        // get the height of the viewport
        let windowHeight = window.innerHeight
        //get the distance of the element from the top of the viewport
        let elementTop = reveal.getBoundingClientRect().top
        // the height at which the element should be revealed to the user
        let elementVisible = 150

        if(elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active')
        } else {
            reveal.classList.remove('active')
        }
    })
}

window.addEventListener('scroll', reveal)

reveal()