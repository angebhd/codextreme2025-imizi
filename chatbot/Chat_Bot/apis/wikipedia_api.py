import requests

def get_wikipedia_summary(query):
    try:
        query = query.replace("wiki", "").strip().replace(" ", "_")  # Fix spaces
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query}"
        
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            return data.get("extract", "No summary available.")
        elif response.status_code == 404:
            return "Sorry, no Wikipedia page found for this topic."
        else:
            return f"Error: Wikipedia API returned status {response.status_code}."

    except Exception as e:
        return f"Error fetching Wikipedia data: {str(e)}"

# Example Usage:
query = "Artificial Intelligence"
print(get_wikipedia_summary(query))
