// Objeto con las respuestas predefinidas
const responses = {
    'experiencia': 'Tengo experiencia en evaluación de modelos de IA, liderazgo de equipos técnicos en GEOCOM, y desarrollo de soluciones en electrónica y sistemas inteligentes.',
    'habilidades': 'Mis principales habilidades incluyen Python, SQL, C++, AutoCAD, Matlab, y metodologías Scrum.',
    'educacion': 'Soy Ingeniero en Electrónica y Sistemas Inteligentes, y actualmente estoy tomando un curso de Data Science en Alura Latam.',
    'contacto': 'Puedes contactarme por email a gon.medinae@gmail.com o por teléfono al +56979981364.',
    'proyectos': 'Trabajo en proyectos de IA como Contributor/Reviewer en Scale Labs AI, evaluando y mejorando modelos de lenguaje.',
    'hola': '¡Hola! Soy el asistente virtual de Gonzalo. ¿En qué puedo ayudarte?',
    'default': 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla? Puedes preguntarme sobre mi experiencia, habilidades, educación, proyectos o información de contacto.'
};

// Estado inicial del chat
let chatVisible = true;

// Función para alternar la visibilidad del chat
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatVisible = !chatVisible;
    chatBox.style.display = chatVisible ? 'block' : 'none';
}

// Función principal para enviar mensajes
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    // No hacer nada si el mensaje está vacío
    if (!message) return;

    // Agregar el mensaje del usuario
    addMessage(message, 'user');

    // Obtener y mostrar la respuesta con un pequeño delay
    setTimeout(() => {
        const response = getResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 500);

    // Limpiar el input
    input.value = '';
}

// Función para agregar mensajes al chat
function addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${type}`;
    messageDiv.textContent = text;
    
    messages.appendChild(messageDiv);
    
    // Hacer scroll hasta el último mensaje
    messages.scrollTop = messages.scrollHeight;
}

// Función para obtener la respuesta apropiada
function getResponse(message) {
    // Primero, buscar coincidencias exactas
    if (responses[message]) {
        return responses[message];
    }

    // Luego, buscar palabras clave en el mensaje
    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
            return value;
        }
    }

    // Si no hay coincidencias, devolver respuesta por defecto
    return responses.default;
}

// Función para manejar el envío con la tecla Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Función para enviar sugerencias predefinidas
function sendSuggestion(topic) {
    const topics = {
        'experiencia': '¿Cuál es tu experiencia profesional?',
        'habilidades': '¿Qué habilidades técnicas tienes?',
        'educacion': '¿Cuál es tu formación académica?',
        'proyectos': '¿En qué proyectos has trabajado?',
        'contacto': '¿Cómo puedo contactarte?'
    };

    if (topics[topic]) {
        const input = document.getElementById('userInput');
        input.value = topics[topic];
        sendMessage();
    }
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener para la tecla Enter en el input
    const input = document.getElementById('userInput');
    if (input) {
        input.addEventListener('keypress', handleKeyPress);
    }

    // Mostrar mensaje inicial
    setTimeout(() => {
        addMessage('Hola, hablas con el asistente web de Gonzalo. ¿En qué te puedo ayudar?', 'bot');
    }, 500);
});

// Función para limpiar el chat
function clearChat() {
    const messages = document.getElementById('chatMessages');
    messages.innerHTML = '';
    // Volver a mostrar el mensaje inicial
    addMessage('Hola, hablas con el asistente web de Gonzalo. ¿En qué te puedo ayudar?', 'bot');
}

// Función para validar el input
function validateInput(input) {
    // Eliminar caracteres especiales y HTML
    return input.replace(/<[^>]*>?/gm, '').trim();
}

// Mejorar la detección de palabras clave
function analyzeMessage(message) {
    const keywords = {
        'experiencia': ['experiencia', 'trabajo', 'laboral', 'profesional'],
        'habilidades': ['habilidades', 'skills', 'tecnologías', 'herramientas', 'programación'],
        'educacion': ['educación', 'estudios', 'título', 'carrera', 'universidad'],
        'proyectos': ['proyectos', 'portfolio', 'trabajos', 'desarrollos'],
        'contacto': ['contacto', 'email', 'teléfono', 'comunicar']
    };

    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => message.includes(word))) {
            return responses[category];
        }
    }

    return null;
}
