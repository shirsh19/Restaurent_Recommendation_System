import requests
import json
from config import Config

class SerperSearchTool:
    """
    Standalone tool for Serper Search.
    """
    def _run(self, query: str) -> str:
        url = "https://google.serper.dev/search"
        payload = json.dumps({"q": query})
        headers = {
            'X-API-KEY': Config.SERPER_API_KEY,
            'Content-Type': 'application/json'
        }
        try:
            response = requests.request("POST", url, headers=headers, data=payload)
            return response.text
        except Exception as e:
            return f"Error searching: {e}"

class BrowserlessScraperTool:
    """
    Standalone tool for Browserless.io Web Scraping.
    """
    def _run(self, url: str) -> str:
        api_url = f"https://chrome.browserless.io/content?token={Config.BROWSERLESS_API_KEY}"
        payload = json.dumps({"url": url})
        headers = {'Content-Type': 'application/json'}
        try:
            response = requests.request("POST", api_url, headers=headers, data=payload)
            return response.text
        except Exception as e:
            return f"Error scraping: {e}"
