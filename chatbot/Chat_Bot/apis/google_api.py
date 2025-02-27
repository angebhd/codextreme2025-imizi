import requests

def google_search(query):
    try:
        query = query.replace("google", "").strip()
        url = f"https://www.googleapis.com/customsearch/v1?q={query}&key=AIzaSyAXSx2dY9xkKF1Sy22EeHGw_gSAdIi00xk&cx=YOUR_SEARCH_ENGINE_ID"
        response = requests.get(url).json()
        results = response.get("items", [])
        
        if results:
            return results[0].get("snippet", "No relevant results found.")
        return "No search results found."
    except Exception as e:
        return f"Error fetching Google search results: {e}"
