const texts                = document.querySelector('.texts') 


window.SpeechRecognition   = window.SpeechRecognition || window.webkitSpeechRecognition 

const recognition          = new window.SpeechRecognition() 

recognition.interimResults = true; 

let p                      = document.createElement('p')

recognition.addEventListener('result',(e)=> {
    const text = Array.from(e.results).map(result=>result[0]).map(result=>result.transcript).join('').toLowerCase();
    
    p.innerText = text
    texts.appendChild(p)

    if(e.results[0].isFinal) {
        generate(text)


            if(text.includes('abrir youtube')) {
                loadYoutubePage()
            }
            if(text.includes('abrir facebook') || text.includes('facebook')) {
                loadFacebookPage()
            }
        p = document.createElement('p')

    }



})

recognition.addEventListener('end', ()=>{
    recognition.start()
})
function loadFacebookPage() {
    p = document.createElement('p')
    p.classList.add('replay')
    p.innerText = 'Abrindo o facebook'
    texts.appendChild(p)
    window.open('https://pt-br.facebook.com/')
}
function loadYoutubePage() {
    p = document.createElement('p')
    p.classList.add('replay')
    p.innerText = 'Abrindo o Youtube'
    texts.appendChild(p)
    window.open('https://youtube.com')
}

recognition.start()


// Connection with Chat Gpt
const API_KEY = ""
const API_URL = ""

const generate = async (text) => {

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user",content: `${text}`}]
            })
        })
        const data = await response.json()

        const chatGptAnswer = {
            answer: data.choices[0].message.content
        }

        includeTextOnHTML(chatGptAnswer.answer)


    


    } catch(err) {
        console.log(err)
    }
}
function includeTextOnHTML(answer) {
    let p = document.createElement('p')
    p.textContent = answer
    p.classList.add('replay')
    texts.appendChild(p)
}