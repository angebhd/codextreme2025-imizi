import requests

# 🔑 Replace with your actual API Key and CSE ID
GOOGLE_API_KEY = "AIzaSyBAJSGHddsL5-4EhnHTScJ7KKMj68Fbb94"
CX_ID = "e28e91c704c6e494f"

def google_search(query):
    """Search Google using the API and return the first result."""
    
    # 🛑 Check if API Key or CX ID is missing
    if not GOOGLE_API_KEY or not CX_ID:
        return {"error": "Missing GOOGLE_API_KEY or CX_ID. Please update them."}
    
    url = f"https://www.googleapis.com/customsearch/v1?q={query}&key={GOOGLE_API_KEY}&cx={CX_ID}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        # 🔍 Debugging - Print the full response if something goes wrong
        if "error" in data:
            print("❌ API Error Response:", data)
            return {"error": data["error"]["message"]}
        
        if "items" in data:
            first_result = data["items"][0]
            return {
                "title": first_result.get("title", "No title available"),
                "snippet": first_result.get("snippet", "No description available"),
                "link": first_result.get("link", "No link available")
            }
        else:
            print("⚠️ No search results found. Full API Response:", data)
            return {"error": "No results found or API limit reached."}

    except Exception as e:
        return {"error": f"Failed to fetch data: {str(e)}"}

# 🔍 Test the function
if __name__ == "__main__":
    query = "Artificial Intelligence"
    result = google_search(query)
    print(result)
