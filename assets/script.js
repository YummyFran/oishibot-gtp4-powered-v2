const form = document.querySelector('form')
const message = document.querySelector('.que')
const log = document.querySelector('.bot')
const body = document.querySelector('body')

const thinkingChat = document.createElement('p')
    thinkingChat.classList.add('oishi')
    thinkingChat.innerText = 'oishi bot is typing...'

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const question = message.value

    message.value = ''
    const userChat = document.createElement('p')
        userChat.classList.add('user')
        userChat.innerText = question
    log.appendChild(userChat)
    log.scrollTop = log.scrollHeight

    setTimeout(() => {
        log.appendChild(thinkingChat)
        body.scrollTop = body.scrollHeight
    },1000)
    
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            message: question
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        log.removeChild(thinkingChat)
        const aiChat = document.createElement('p')
            aiChat.classList.add('oishi')
            aiChat.innerText = data
        log.appendChild(aiChat)
        log.scrollTop = log.scrollHeight

        console.log(log.scrollHeight)
    })
})