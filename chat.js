// chat.js
const responses = {
    'experiencia': 'Tengo experiencia en evaluación de modelos de IA, liderazgo de equipos técnicos en GEOCOM, y desarrollo de soluciones en electrónica y sistemas inteligentes.',
    'habilidades': 'Mis principales habilidades incluyen Python, SQL, C++, AutoCAD, Matlab, y metodologías Scrum.',
    'educacion': 'Soy Ingeniero en Electrónica y Sistemas Inteligentes, y actualmente estoy tomando un curso de Data Science en Alura Latam.',
    'contacto': 'Puedes contactarme por email a gon.medinae@gmail.com o por teléfono al +56979981364.',
    'proyectos': 'Trabajo en proyectos de IA como Contributor/Reviewer en Scale Labs AI, evaluando y mejorando modelos de lenguaje.',
    'default': 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla? Puedes preguntarme sobre mi experiencia, habilidades, educación, proyectos o información de contacto.'
};

function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim().toLowerCase();
    if (message === '') return;

    // Agregar mensaje del usuario
    addMessage(message, 'sent');

    // Procesar respuesta
    let response = responses.default;
    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
            response = value;
            break;
        }
    }

    // Agregar respuesta con delay
    setTimeout(() => {
        addMessage(response, 'received');
    }, 500);

    input.value = '';
}

function addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendSuggestion(topic) {
    const topics = {
        'experiencia': '¿Cuál es tu experiencia profesional?',
        'habilidades': '¿Qué habilidades técnicas tienes?',
        'educacion': '¿Cuál es tu formación académica?',
        'proyectos': '¿En qué proyectos has trabajado?',
        'contacto': '¿Cómo puedo contactarte?'
    };
    
    const input = document.getElementById('userInput');
    input.value = topics[topic];
    sendMessage();
}
