import json
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from crew_setup import run_restaurant_crew

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Restaurant Recommendation System API")

class RecommendationRequest(BaseModel):
    location: str
    cuisine: str
    budget: str
    preferences: str

class Dish(BaseModel):
    name: str
    price: str

class Restaurant(BaseModel):
    name: str
    rating: str
    price_range: str
    address: str
    why_recommended: str
    famous_dishes: list[Dish]

class RecommendationResponse(BaseModel):
    restaurants: list[Restaurant]

@app.post("/recommend", response_model=RecommendationResponse)
async def recommend(request: RecommendationRequest):
    try:
        logger.info(f"Received recommendation request for: {request.location}, {request.cuisine}")
        
        # Prepare inputs for CrewAI
        inputs = {
            "location": request.location,
            "cuisine": request.cuisine,
            "budget": request.budget,
            "preferences": request.preferences
        }
        
        # Execute the crew
        try:
            crew_output = run_restaurant_crew(inputs)
        except Exception as e:
            # Catch common AI errors
            error_msg = str(e)
            if "RESOURCES_EXHAUSTED" in error_msg or "429" in error_msg:
                logger.warning(f"Rate limit hit: {error_msg}")
                raise HTTPException(
                    status_code=429, 
                    detail="The AI service is currently busy due to free-tier quota limits. Please wait 60 seconds and try again."
                )
            raise e
        
        # Process output
        result_str = str(crew_output)
        
        # Robust JSON cleaning and extraction
        def clean_json_string(text):
            # Remove markdown code blocks
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            # Find the first '{' and last '}'
            start = text.find("{")
            end = text.rfind("}")
            if start != -1 and end != -1:
                return text[start:end+1]
            return text

        cleaned_str = clean_json_string(result_str)
        
        try:
            result_json = json.loads(cleaned_str)
        except json.JSONDecodeError as je:
            logger.error(f"Failed to parse JSON from AI: {cleaned_str}")
            # If parsing fails, try to wrap it if it looks like a list
            if cleaned_str.startswith("[") and cleaned_str.endswith("]"):
                result_json = {"restaurants": json.loads(cleaned_str)}
            else:
                raise ValueError(f"AI response format error: {str(je)}")

        return result_json

    except HTTPException as he:
        # Re-raise HTTP exceptions (like our 429)
        raise he
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"An unexpected error occurred: {str(e)}. Please check the logs."
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
