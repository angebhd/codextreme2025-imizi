from flask import Flask, request, jsonify
from flask_cors import CORS
from apis.wikipedia_api import get_wikipedia_summary
from apis.google_api import google_search
from apis.gemini_api import get_gemini_response
from training.url_scraper import scrape_website
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend/mobile app

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route("/")
def home():
    return "Chatbot Backend Running!"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "").strip()  # Trim whitespace

        if not user_message:
            return jsonify({"response": "Please provide a message!"}), 400

        logger.debug(f"Received message: {user_message}")

        # Handle specific commands
        if "wiki" in user_message.lower():
            try:
                summary = get_wikipedia_summary(user_message)
                return jsonify({"response": summary})
            except Exception as e:
                logger.error(f"Wikipedia API error: {e}")
                return jsonify({"response": "Failed to fetch Wikipedia summary."}), 500

        elif "google" in user_message.lower():
            try:
                search_result = google_search(user_message)
                return jsonify({"response": search_result})
            except Exception as e:
                logger.error(f"Google API error: {e}")
                return jsonify({"response": "Failed to perform Google search."}), 500

        elif "gemini" in user_message.lower():
            try:
                gemini_response = get_gemini_response(user_message)
                return jsonify({"response": gemini_response})
            except Exception as e:
                logger.error(f"Gemini API error: {e}")
                return jsonify({"response": "Failed to get Gemini response."}), 500

        elif "train" in user_message.lower():
            url = data.get("url", "").strip()  # Trim whitespace
            if not url:
                return jsonify({"response": "Please provide a URL to train from!"}), 400

            try:
                training_data = scrape_website(url)
                return jsonify({"response": training_data})
            except Exception as e:
                logger.error(f"URL scraping error: {e}")
                return jsonify({"response": "Failed to scrape the provided URL."}), 500

        # Default response for unrecognized commands
        return jsonify({"response": "Sorry, I didn't understand that!"})

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"response": "An unexpected error occurred. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)