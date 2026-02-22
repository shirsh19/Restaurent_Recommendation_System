import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY", "").strip().strip('"').strip("'")
print(f"Testing key: {key[:5]}...{key[-5:]}")

genai.configure(api_key=key)
model = genai.GenerativeModel('gemini-2.0-flash')

try:
    response = model.generate_content("Hello")
    print("SUCCESS: Google accepted the key and generated content.")
except Exception as e:
    print(f"FAILED: {e}")
