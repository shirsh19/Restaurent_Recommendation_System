import os
import requests
from dotenv import load_dotenv

load_dotenv()

def check_serper():
    key = os.getenv("SERPER_API_KEY", "").strip().strip('"').strip("'")
    print(f"Testing Serper ({key[:5]}...): ", end="")
    url = "https://google.serper.dev/search"
    payload = {"q": "test"}
    headers = {'X-API-KEY': key, 'Content-Type': 'application/json'}
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            print("SUCCESS")
        else:
            print(f"FAILED ({response.status_code}): {response.text}")
    except Exception as e:
        print(f"ERROR: {e}")

def check_browserless():
    key = os.getenv("BROWSERLESS_API_KEY", "").strip().strip('"').strip("'")
    print(f"Testing Browserless ({key[:5]}...): ", end="")
    url = f"https://chrome.browserless.io/content?token={key}"
    payload = {"url": "https://example.com"}
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("SUCCESS")
        else:
            print(f"FAILED ({response.status_code}): {response.text}")
    except Exception as e:
        print(f"ERROR: {e}")

def check_groq():
    key = os.getenv("GROQ_API_KEY", "").strip().strip('"').strip("'")
    print(f"Testing Groq ({key[:10]}...): ", end="")
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    payload = {
        "model": "llama3-8b-8192",
        "messages": [{"role": "user", "content": "test"}]
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            print("SUCCESS")
        else:
            print(f"FAILED ({response.status_code}): {response.text}")
    except Exception as e:
        print(f"ERROR: {e}")

def check_gemini():
    key = os.getenv("GEMINI_API_KEY", "").strip().strip('"').strip("'")
    print(f"Testing Gemini ({key[:5]}...): ", end="")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
    payload = {"contents": [{"parts":[{"text": "test"}]}]}
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("SUCCESS")
        else:
            print(f"FAILED ({response.status_code}): {response.text}")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    check_serper()
    check_browserless()
    check_groq()
    check_gemini()
