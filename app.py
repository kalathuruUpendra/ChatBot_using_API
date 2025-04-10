from flask import Flask, request, jsonify, render_template
import cohere
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Load your Cohere API key from .env
co = cohere.Client(os.getenv("COHERE_API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"response": "Please enter a message."}), 400

    response = co.generate(
        model="command-r-plus",
        prompt=user_input,
        max_tokens=150,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )

    reply = response.generations[0].text.strip()
    return jsonify({"response": reply})

if __name__ == '__main__':
    app.run(debug=True)
