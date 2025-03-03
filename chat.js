// chat.js
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    if (chatBox.classList.contains('active')) {
        chatBox.classList.remove('active');
        setTimeout(() => {
            chatBox.style.display = 'none';
        }, 300);
    } else {
        chatBox.style.display = 'block';
        setTimeout(() => {
            chatBox.classList.add('active');
        }, 10);
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    // Agregar mensaje del usuario
    addMessage(message, 'user');

    // Procesar y enviar respuesta
    setTimeout(() => {
        const response = getResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 500);

    input.value = '';
}

function addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${type}`;
    
    const p = document.createElement('p');
    p.textContent = text;
    bubble.appendChild(p);
    
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function getResponse(message) {
    const responses = {
        'experiencia': 'Tengo experiencia en evaluación de modelos de IA, liderazgo de equipos técnicos y desarrollo de soluciones en electrónica.',
        'habilidades': 'Mis principales habilidades incluyen Python, SQL, C++, AutoCAD, Matlab, y Scrum.',
        'educacion': 'Soy Ingeniero en Electrónica y Sistemas Inteligentes, actualmente tomando un curso de Data Science.',
        'contacto': 'Puedes contactarme en gon.medinae@gmail.com o al +56979981364.',
        'proyectos': 'Trabajo en proyectos de IA como Contributor/Reviewer en Scale Labs AI.',
        'default': 'Lo siento, no entiendo tu pregunta. Puedes preguntarme sobre mi experiencia, habilidades, educación, proyectos o contacto.'
    };

    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) return value;
    }
    return responses.default;
}

// Event listener para Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
