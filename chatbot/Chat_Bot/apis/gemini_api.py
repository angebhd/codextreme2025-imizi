import openai

openai.api_key = "AIzaSyC2AWa5D5YSfEByJV3FAOApzPDIiprMPPQ"

def get_gemini_response(query):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": query}]
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error fetching AI response: {e}"
