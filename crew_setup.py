import json
from langchain_groq import ChatGroq
from tools import SerperSearchTool, BrowserlessScraperTool
from config import Config

def run_restaurant_crew(inputs: dict):
    """
    Manually orchestrate the restaurant discovery and recommendation flow using Groq.
    This bypasses CrewAI library conflicts while delivering the same high-quality result.
    """
    location = inputs.get("location")
    cuisine = inputs.get("cuisine")
    budget = inputs.get("budget")
    preferences = inputs.get("preferences")

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        groq_api_key=Config.GROQ_API_KEY,
        temperature=0.3
    )

    search_tool = SerperSearchTool()
    scraper_tool = BrowserlessScraperTool()

    print(f"--- DISCOVERY PHASE: Searching for {cuisine} in {location} ---")
    search_query = f"best {cuisine} restaurants in {location} with {budget} price range"
    search_results = search_tool._run(search_query)

    print(f"--- ANALYSIS PHASE: Researching top restaurant details ---")
    # We use Groq to parse the search results and pick URLs to scrape
    analysis_prompt = f"""
    Based on these search results, identify the names and website URLs of the top 3 restaurants.
    Search Results: {search_results}
    
    Return ONLY a JSON list: [{{"name": "...", "url": "..."}}]
    """
    pick_response = llm.invoke(analysis_prompt)
    try:
        # Simple extraction of JSON from response
        content = pick_response.content
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        restaurants_to_scrape = json.loads(content.strip())
    except Exception as e:
        print(f"Error parsing restaurant list: {e}")
        restaurants_to_scrape = []

    scraped_data = []
    for rest in restaurants_to_scrape[:2]: # Scrape top 2 for speed and quota
        url = rest.get("url")
        if url and "google.com" not in url:
            print(f"Scraping {rest['name']} via Browserless...")
            data = scraper_tool._run(url)
            scraped_data.append({rest['name']: data[:2000]}) # Limit text for token efficiency

    print(f"--- ARCHITECTURE PHASE: Ranking and formatting final JSON ---")
    final_prompt = f"""
    You are a world-class food critic. Rank the best restaurants in {location} for {cuisine} ({budget}).

    User Preferences: {preferences}
    Discovery Data: {search_results}
    Deep Scrape Data: {scraped_data}

    Output a VALID JSON object with exactly 5 restaurants.
    Format:
    {{
      "restaurants": [
        {{
          "name": "...",
          "rating": "...",
          "price_range": "...",
          "address": "...",
          "why_recommended": "...",
          "famous_dishes": [
            {{"name": "Dish 1", "price": "..."}},
            {{"name": "Dish 2", "price": "..."}},
            {{"name": "Dish 3", "price": "..."}},
            {{"name": "Dish 4", "price": "..."}},
            {{"name": "Dish 5", "price": "..."}}
          ]
        }}
      ]
    }}
    """
    final_result = llm.invoke(final_prompt)
    
    # Extract JSON content
    content = final_result.content
    try:
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        return content.strip()
    except:
        return content
