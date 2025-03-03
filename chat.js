// Predefined responses object
const responses = {
    'experience': 'I have experience in AI model evaluation, technical team leadership at GEOCOM, and development of electronics and intelligent systems solutions.',
    'skills': 'My main skills include Python, SQL, C++, AutoCAD, Matlab, and Scrum methodologies.',
    'education': 'I am an Electronics and Intelligent Systems Engineer, and I am currently taking a Data Science course at Alura Latam.',
    'contact': 'You can contact me via email at gon.medinae@gmail.com or by phone at +56979981364.',
    'projects': 'I work on AI projects as a Contributor/Reviewer at Scale Labs AI, evaluating and improving language models.',
    'hello': 'Hello! I am BERCO-02, Gonzalo\'s virtual assistant. How can I help you today?',
    'default': 'I apologize, I didn\'t understand your question. Please try asking about my experience, skills, education, projects, or contact information.'
};

// Chat state
let chatVisible = true;
let isTyping = false;

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

function initializeChat() {
    const input = document.getElementById('userInput');
    if (input) {
        input.addEventListener('keypress', handleKeyPress);
    }

    // Show welcome message with typing animation
    showWelcomeMessage();
}

async function showWelcomeMessage() {
    const welcomeMessage = `Hello! I am BERCO-02, Gonzalo's virtual assistant. I can help you with information about:

💼 Experience
🔧 Skills
🎓 Education
💻 Projects
📧 Contact

What would you like to know about?`;

    const typingIndicator = showTypingIndicator();
    await sleep(1500);
    typingIndicator.remove();
    addMessage(welcomeMessage, 'bot');
}

function showTypingIndicator() {
    const messages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-bubble bot typing';
    typingDiv.innerHTML = `
        <div class="bot-info">
            <div class="bot-avatar">
                <img src="berco02.png" alt="BERCO-02">
                <div class="status-dot"></div>
            </div>
        </div>
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
    return typingDiv;
}

async function sendMessage() {
    if (isTyping) return;

    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    isTyping = true;

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    // Simulate bot thinking
    await sleep(Math.random() * 1000 + 500);
    typingIndicator.remove();

    // Get and show response
    const response = getResponse(message.toLowerCase());
    addMessage(response, 'bot');

    isTyping = false;
}

function addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${type}`;

    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="bot-info">
                <div class="bot-avatar">
                    <img src="berco02.png" alt="BERCO-02">
                    <div class="status-dot"></div>
                </div>
            </div>
            <div class="message-content">
                ${formatMessage(text)}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content user-message">
                ${formatMessage(text)}
            </div>
        `;
    }

    messages.appendChild(messageDiv);
    scrollToBottom();
}

function formatMessage(text) {
    return text.split('\n').map(line => 
        line.trim() ? `<p>${line}</p>` : '<br>'
    ).join('');
}

function scrollToBottom() {
    const messages = document.getElementById('chatMessages');
    messages.scrollTop = messages.scrollHeight;
}

function getResponse(message) {
    // Check for exact matches first
    if (responses[message]) {
        return responses[message];
    }

    // Check for keywords in message
    const keywords = {
        'experience': ['experience', 'work', 'job', 'professional'],
        'skills': ['skills', 'abilities', 'can', 'know', 'capable'],
        'education': ['education', 'study', 'degree', 'university', 'school'],
        'projects': ['projects', 'portfolio', 'work', 'developed'],
        'contact': ['contact', 'email', 'phone', 'reach', 'message']
    };

    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => message.includes(word))) {
            return responses[category];
        }
    }

    return responses.default;
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendSuggestion(topic) {
    if (isTyping) return;

    const topics = {
        'experience': 'Tell me about your experience',
        'skills': 'What skills do you have?',
        'education': 'What is your education background?',
        'projects': 'What projects have you worked on?',
        'contact': 'How can I contact you?'
    };

    if (topics[topic]) {
        const input = document.getElementById('userInput');
        input.value = topics[topic];
        sendMessage();
    }
}

function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatVisible = !chatVisible;
    
    if (chatVisible) {
        chatBox.style.display = 'block';
        setTimeout(() => {
            chatBox.classList.add('active');
        }, 10);
    } else {
        chatBox.classList.remove('active');
        setTimeout(() => {
            chatBox.style.display = 'none';
        }, 300);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility function to clear chat
function clearChat() {
    const messages = document.getElementById('chatMessages');
    messages.innerHTML = '';
    showWelcomeMessage();
}

// Handle visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && chatVisible) {
        const messages = document.getElementById('chatMessages');
        if (!messages.children.length) {
            showWelcomeMessage();
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (chatVisible) {
        scrollToBottom();
    }
});
