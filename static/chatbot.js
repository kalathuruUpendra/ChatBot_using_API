// Handle Enter key press
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message to chatbox
        const chatbox = document.getElementById('chatbox');
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.innerHTML = `<strong>You:</strong> ${message}`;
        chatbox.appendChild(userMessage);
        
        // Clear input
        userInput.value = '';
        
        // Scroll to bottom
        chatbox.scrollTop = chatbox.scrollHeight;
        
        // Send to server
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message})
        })
        .then(response => response.json())
        .then(data => {
            // Add bot response to chatbox
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'bot-message';
                botMessage.textContent = data.response;
                chatbox.appendChild(botMessage);
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 100);
            
            // Scroll to bottom
            chatbox.scrollTop = chatbox.scrollHeight;
        })
        .catch(error => console.error('Error:', error));
    }
}

// Add ribbon effect on chatbox hover
document.getElementById('chatbox').addEventListener('mouseenter', function() {
    const ribbons = document.createElement('div');
    ribbons.className = 'ribbons';
    this.appendChild(ribbons);
    
    // Create multiple ribbon threads
    for (let i = 0; i < 5; i++) {
        const ribbon = document.createElement('div');
        ribbon.className = 'ribbon';
        ribbon.style.left = `${Math.random() * 100}%`;
        ribbon.style.animationDelay = `${i * 0.2}s`;
        ribbons.appendChild(ribbon);
    }
});

document.getElementById('chatbox').addEventListener('mouseleave', function() {
    const ribbons = document.querySelector('.ribbons');
    if (ribbons) {
        ribbons.remove();
    }
});

// Add welcome message when page loads
window.addEventListener('load', function() {
    const chatbox = document.getElementById('chatbox');
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'bot-message';
        welcomeMessage.textContent = 'Hello, I am your Simple FAQ Chatbot! How can I assist you today?';
        chatbox.appendChild(welcomeMessage);
    }, 1000);
});
