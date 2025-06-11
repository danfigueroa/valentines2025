const questions = [
    {
        question: 'Qual a memória nossa eu usaria para conjurar meu Patrono?',
        options: [
            'Nosso jantar na sua casa quando voltei de Goiânia',
            'Quando você rolou e caiu da cama na pousada',
            'Nós na janela na nossa primeira vez',
            'Nós pós Liberdade em SP provando comidas',
        ],
        points: [30, 15, 25, 20],
        bestAnswer: 0,
    },
    {
        question: 'O que mais amo em você?',
        options: [
            'Seu sorriso que ilumina meu dia',
            'Sua forma carinhosa de cuidar de mim',
            'Sua bunda',
            'Seu jeitinho doido de ser',
        ],
        points: [25, 15, 30, 20],
        bestAnswer: 2,
    },
    {
        question: 'Qual é a nossa viagem que eu mais gostei?',
        options: [
            'Morro de São Paulo',
            'Salvador 2022',
            'São Paulo',
            'Chapa Diamantina',
        ],
        points: [25, 30, 20, 15],
        bestAnswer: 1,
    },
    {
        question: 'O que mais quero para o nosso futuro?',
        options: [
            'Viajar o mundo juntos',
            'Construir uma família linda',
            'Envelhecer ao seu lado',
            'Ser pai de pet',
        ],
        points: [20, 30, 25, 0],
        bestAnswer: 1,
    },
    {
        question: 'Por que você é especial para mim?',
        options: [
            'Porque você me completa',
            'Porque me faz ser uma pessoa melhor',
            'Porque nosso amor é único',
            'Porque você é meu presente de Deus',
        ],
        points: [20, 25, 15, 30],
        bestAnswer: 3,
    },
]

let currentQuestion = 0
let score = 0


let welcomeScreen,
    gameScreen,
    finalScreen,
    questionText,
    optionsContainer,
    progressBar


function startGame() {

    welcomeScreen.classList.add('fade-out')

    setTimeout(() => {
        welcomeScreen.classList.remove('active', 'fade-out')
        gameScreen.classList.add('active')
        currentQuestion = 0
        score = 0
        showQuestion()
    }, 400)
}


function showQuestion() {
    const question = questions[currentQuestion]
    questionText.textContent = question.question

    // Atualizar barra de progresso
    const progress = ((currentQuestion + 1) / questions.length) * 100
    progressBar.style.width = progress + '%'

    // Limpar opções anteriores
    optionsContainer.innerHTML = ''

    // Criar opções
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div')
        optionElement.className = 'option'
        optionElement.textContent = option
        optionElement.onclick = () => selectOption(index)
        optionElement.style.background = ''
        optionElement.style.color = ''
        optionElement.style.transform = ''
        optionElement.style.opacity = ''
        optionElement.style.boxShadow = ''
        optionElement.style.pointerEvents = ''
        optionsContainer.appendChild(optionElement)
    })
}


function selectOption(selectedIndex) {
    const question = questions[currentQuestion]

    // Destacar a opção selecionada
    const options = document.querySelectorAll('.option')
    options.forEach((option, index) => {
        if (index === selectedIndex) {
            // Mostrar se é a melhor resposta
            if (index === question.bestAnswer) {
                option.style.background =
                    'linear-gradient(135deg, #ff6b9d, #ff1744)'
                option.style.transform = 'scale(1.1) rotate(2deg)'
                option.innerHTML = option.textContent + ' 💖'
            } else {
                option.style.background =
                    'linear-gradient(135deg, #ff8fab, #ffb3c1)'
                option.style.transform = 'scale(1.05)'
                option.innerHTML = option.textContent + ' 💕'
            }
            option.style.color = 'white'
            option.style.boxShadow = '0 15px 30px rgba(255, 107, 157, 0.5)'
        } else {
            option.style.opacity = '0.4'
            option.style.transform = 'scale(0.95)'
        }
        option.style.pointerEvents = 'none'
    })

    // Adicionar pontos baseados na resposta
    const pointsEarned = question.points[selectedIndex]
    score += pointsEarned

    // Mostrar pontos ganhos
    showPointsAnimation(pointsEarned, selectedIndex === question.bestAnswer)

    // Aguardar um pouco antes de ir para a próxima pergunta
    setTimeout(() => {
        currentQuestion++

        if (currentQuestion < questions.length) {
            showQuestion()
        } else {
            showFinalScreen()
        }
    }, 2000)
}


function showPointsAnimation(points, isBestAnswer) {
    const pointsElement = document.createElement('div')
    pointsElement.textContent = `+${points} pontos!`
    pointsElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: bold;
        color: ${isBestAnswer ? '#ff1744' : '#ff6b9d'};
        z-index: 1000;
        pointer-events: none;
        animation: pointsFloat 1.5s ease-out forwards;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    `

    document.body.appendChild(pointsElement)

    setTimeout(() => {
        if (pointsElement.parentNode) {
            pointsElement.parentNode.removeChild(pointsElement)
        }
    }, 1500)
}


function showFinalScreen() {

    gameScreen.classList.add('fade-out')

    setTimeout(() => {
        gameScreen.classList.remove('active', 'fade-out')
        finalScreen.classList.add('active')


        displayFinalScore()


        createFallingHearts()
    }, 400)
}


function displayFinalScore() {
    const finalScoreElement = document.getElementById('final-score')
    const scoreMessageElement = document.getElementById('score-message')


    let currentScore = 0
    const increment = score / 30

    const countAnimation = setInterval(() => {
        currentScore += increment
        if (currentScore >= score) {
            currentScore = score
            clearInterval(countAnimation)
        }
        finalScoreElement.textContent = Math.floor(currentScore)
    }, 50)


    let message = ''
    let messageColor = ''

    if (score === 150) {
        message = '🏆 PERFEITO! Você me conhece perfeitamente! 🏆'
        messageColor = '#ff1744'

        createConfetti()
    } else if (score >= 130) {
        message = '💖 Quase perfeito! Você é incrível! 💖'
        messageColor = '#ff6b9d'
    } else if (score >= 110) {
        message = '💕 Muito bem! Nosso amor é lindo! 💕'
        messageColor = '#ff8fab'
    } else if (score >= 90) {
        message = '💗 Bom trabalho! Tente conseguir mais pontos! 💗'
        messageColor = '#ffb3c1'
    } else {
        message = '💝 Tente novamente para me conhecer melhor! 💝'
        messageColor = '#ffc1cc'
    }

    setTimeout(() => {
        scoreMessageElement.textContent = message
        scoreMessageElement.style.color = messageColor
    }, 1500)
}


function createConfetti() {
    const confettiColors = [
        '#ff6b9d',
        '#ff1744',
        '#ffb3c1',
        '#ffc1cc',
        '#ff8fab',
    ]

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div')
            confetti.innerHTML = ['🎉', '✨', '💖', '🌟', '💕'][
                Math.floor(Math.random() * 5)
            ]
            confetti.style.position = 'fixed'
            confetti.style.left = Math.random() * 100 + 'vw'
            confetti.style.top = '-10px'
            confetti.style.fontSize = Math.random() * 1.5 + 1 + 'rem'
            confetti.style.zIndex = '1000'
            confetti.style.pointerEvents = 'none'
            confetti.style.animation = `fall ${
                Math.random() * 3 + 2
            }s linear forwards`

            document.body.appendChild(confetti)

            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti)
                }
            }, 5000)
        }, i * 100)
    }
}


function createFallingHearts() {
    const heartsContainer = document.querySelector('.hearts-rain')

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div')
            heart.innerHTML = '❤️'
            heart.style.position = 'absolute'
            heart.style.left = Math.random() * 100 + '%'
            heart.style.fontSize = Math.random() * 2 + 1 + 'rem'
            heart.style.animation = `fall ${
                Math.random() * 3 + 2
            }s linear forwards`
            heart.style.zIndex = '-1'

            heartsContainer.appendChild(heart)


            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart)
                }
            }, 5000)
        }, i * 300)
    }
}


function restartGame() {

    finalScreen.classList.add('fade-out')

    setTimeout(() => {
        finalScreen.classList.remove('active', 'fade-out')
        welcomeScreen.classList.add('active')
        currentQuestion = 0
        score = 0


        document
            .querySelectorAll('.heart, .floating-heart, .points-animation')
            .forEach((element) => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element)
                }
            })
    }, 400)
}


function createBackgroundHearts() {
    const body = document.body

    setInterval(() => {
        const heart = document.createElement('div')
        heart.innerHTML = '💕'
        heart.style.position = 'fixed'
        heart.style.left = Math.random() * 100 + 'vw'
        heart.style.top = '100vh'
        heart.style.fontSize = '1rem'
        heart.style.opacity = '0.3'
        heart.style.pointerEvents = 'none'
        heart.style.zIndex = '-10'
        heart.style.animation = 'floatUp 8s linear forwards'

        body.appendChild(heart)

        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart)
            }
        }, 8000)
    }, 3000)
}


const style = document.createElement('style')
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)


function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
}


function optimizeForMobile() {

    function setViewportHeight() {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100)
    })


    if (isMobileDevice()) {
        document.body.addEventListener(
            'touchmove',
            function (e) {

                if (!e.target.closest('.screen')) {
                    e.preventDefault()
                }
            },
            { passive: false }
        )


        let lastTouchEnd = 0
        document.addEventListener(
            'touchend',
            function (event) {
                let now = new Date().getTime()
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault()
                }
                lastTouchEnd = now
            },
            false
        )
    }
}


function addTouchFeedback() {

    document.addEventListener('touchstart', function (e) {
        if (e.target.classList.contains('option')) {
            e.target.style.transform = 'scale(0.98)'
            e.target.style.transition = 'transform 0.1s ease'
        }
    })

    document.addEventListener('touchend', function (e) {
        if (e.target.classList.contains('option')) {
            setTimeout(() => {
                e.target.style.transform = ''
            }, 100)
        }
    })
}


document.addEventListener('DOMContentLoaded', () => {

    welcomeScreen = document.getElementById('welcome-screen')
    gameScreen = document.getElementById('game-screen')
    finalScreen = document.getElementById('final-screen')
    questionText = document.getElementById('question-text')
    optionsContainer = document.getElementById('options-container')
    progressBar = document.getElementById('progress')


    if (welcomeScreen) {
        welcomeScreen.classList.add('active')
    }


    optimizeForMobile()
    if (isMobileDevice()) {
        addTouchFeedback()
    }

    createBackgroundHearts()


    document.querySelectorAll('button').forEach((button) => {

        const handleInteraction = function (e) {

            if (this.dataset.processing) return
            this.dataset.processing = 'true'

            const ripple = document.createElement('span')
            const rect = this.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height)

            let x, y
            if (e.type === 'touchend' && e.changedTouches) {
                x = e.changedTouches[0].clientX - rect.left - size / 2
                y = e.changedTouches[0].clientY - rect.top - size / 2
            } else {
                x = (e.clientX || rect.width / 2) - rect.left - size / 2
                y = (e.clientY || rect.height / 2) - rect.top - size / 2
            }

            ripple.style.width = ripple.style.height = size + 'px'
            ripple.style.left = x + 'px'
            ripple.style.top = y + 'px'
            ripple.classList.add('ripple')

            this.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
                this.dataset.processing = ''
            }, 600)
        }

        button.addEventListener('click', handleInteraction)
        if (isMobileDevice()) {
            button.addEventListener('touchend', handleInteraction)
        }
    })
})


const rippleStyle = document.createElement('style')
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)
