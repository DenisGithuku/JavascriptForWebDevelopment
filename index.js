const button = document.getElementsByTagName('button')[0]

button.addEventListener('click', function () {
    const dialogWrapper = document.querySelector('.dialog-wrapper')

    if (dialogWrapper.classList.contains('hidden')) {
        dialogWrapper.classList.remove('hidden')
    } else {
        dialogWrapper.classList.add('hidden')
    }
})

const closeButton = document.getElementsByClassName('close-button')[0]
closeButton.addEventListener('click', () => {
    const dialogWrapper = document.getElementsByClassName('dialog-wrapper')[0]
    dialogWrapper.classList.add('hidden')
})


