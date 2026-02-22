from crew_setup import run_restaurant_crew
import json

inputs = {
    "location": "Paris",
    "cuisine": "French",
    "budget": "$$",
    "preferences": "authentic, local favorite, cozy atmosphere"
}

print("Starting standalone crew run...")
try:
    result = run_restaurant_crew(inputs)
    print("\n--- FINAL RESULT ---")
    print(result)
except Exception as e:
    print(f"\n--- ERROR ---")
    print(str(e))
    # Print more details if available
    import traceback
    traceback.print_exc()
