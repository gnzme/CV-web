// Predefined responses object
const responses = {
    'experience': 'I have experience in AI model evaluation, technical team leadership at GEOCOM, and development of electronics and intelligent systems solutions.',
    'skills': 'My main skills include Python, SQL, C++, AutoCAD, Matlab, and Scrum methodologies.',
    'education': 'I am an Electronics and Intelligent Systems Engineer, and I am currently taking a Data Science course at Alura Latam.',
    'contact': 'You can contact me via email at gon.medinae@gmail.com or by phone at +56979981364.',
    'projects': 'I work on AI projects as a Contributor/Reviewer at Scale Labs AI, evaluating and improving language models.',
    'hello': 'Hello! I am BERCO-02, Gonzalo\'s virtual assistant. I can help you with information about:\n\n' +
            '💼 Experience (type "experience")\n' +
            '🔧 Skills (type "skills")\n' +
            '🎓 Education (type "education")\n' +
            '💻 Projects (type "projects")\n' +
            '📧 Contact information (type "contact")\n\n' +
            'What would you like to know about?',
    'default': 'I apologize, I didn\'t understand your question. I can provide information about:\n\n' +
               '💼 Professional experience\n' +
               '🔧 Technical skills\n' +
               '🎓 Education\n' +
               '💻 Projects\n' +
               '📧 Contact information\n\n' +
               'Please try asking about one of these topics.'
};

// Initial chat state
let chatVisible = true;

// Toggle chat visibility
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatVisible = !chatVisible;
    chatBox.style.display = chatVisible ? 'block' : 'none';
}

// Main function to send messages
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    addMessage(message, 'user');

    // Get and display response with delay
    setTimeout(() => {
        const response = getResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 500);

    // Clear input
    input.value = '';
}

// Add messages to chat
function addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${type}`;
    
    // Handle multi-line messages
    const formattedText = text.split('\n').map(line => 
        `<p>${line}</p>`
    ).join('');
    
    messageDiv.innerHTML = formattedText;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Get appropriate response
function getResponse(message) {
    // Check for exact matches
    if (responses[message]) {
        return responses[message];
    }

    // Check for keywords in message
    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
            return value;
        }
    }

    return responses.default;
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send predefined suggestions
function sendSuggestion(topic) {
    const topics = {
        'experience': 'What is your professional experience?',
        'skills': 'What technical skills do you have?',
        'education': 'What is your educational background?',
        'projects': 'What projects have you worked on?',
        'contact': 'How can I contact you?'
    };

    if (topics[topic]) {
        const input = document.getElementById('userInput');
        input.value = topics[topic];
        sendMessage();
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add Enter key listener
    const input = document.getElementById('userInput');
    if (input) {
        input.addEventListener('keypress', handleKeyPress);
    }

    // Show welcome message
    setTimeout(() => {
        addMessage('Hello! I am BERCO-02, Gonzalo\'s virtual assistant. I can help you with information about:\n\n' +
                  '💼 Experience (type "experience")\n' +
                  '🔧 Skills (type "skills")\n' +
                  '🎓 Education (type "education")\n' +
                  '💻 Projects (type "projects")\n' +
                  '📧 Contact (type "contact")\n\n' +
                  'What would you like to know about?', 'bot');
    }, 500);
});

// Clear chat
function clearChat() {
    const messages = document.getElementById('chatMessages');
    messages.innerHTML = '';
    // Show initial message again
    addMessage(responses.hello, 'bot');
}

// Validate input
function validateInput(input) {
    return input.replace(/<[^>]*>?/gm, '').trim();
}

// Enhanced keyword detection
function analyzeMessage(message) {
    const keywords = {
        'experience': ['experience', 'work', 'professional', 'background'],
        'skills': ['skills', 'technologies', 'tools', 'programming', 'abilities'],
        'education': ['education', 'studies', 'degree', 'university', 'academic'],
        'projects': ['projects', 'portfolio', 'developments', 'work'],
        'contact': ['contact', 'email', 'phone', 'reach']
    };

    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => message.includes(word))) {
            return responses[category];
        }
    }

    return null;
}
