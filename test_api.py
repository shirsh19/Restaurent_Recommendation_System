import requests
import json

url = "http://127.0.0.1:8000/recommend"
payload = {
    "location": "Paris",
    "cuisine": "French",
    "budget": "$$",
    "preferences": "authentic, local favorite, cozy atmosphere"
}
headers = {'Content-Type': 'application/json'}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, data=json.dumps(payload), headers=headers, timeout=300)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error during request: {e}")
