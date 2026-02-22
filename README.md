# Restaurant Recommendation System - Backend

A production-ready multi-agent backend system built with FastAPI and CrewAI. It leverages Gemini 2.0 Flash for reasoning, Groq for ranking, Serper for searching, and Browserless for scraping.

## 🚀 Features

- **Multi-Agent Architecture**: 5 specialized agents working together.
- **FastAPI**: Modern, fast (high-performance) web framework.
- **CrewAI**: Orchestration framework for role-playing autonomous AI agents.
- **Gemini 2.0 Flash**: High-speed reasoning and synthesis.
- **Groq**: Ultra-fast inference for ranking and scoring.
- **Serper & Browserless**: Real-time web search and content scraping.

## 📁 Project Structure

```text
backend/
├── main.py              # FastAPI entry point
├── crew_setup.py        # Crew initialization & execution
├── agents.py            # All agent definitions
├── tasks.py             # Task definitions
├── tools.py             # Serper + Browserless tools
├── config.py            # Load env variables
├── requirements.txt     # Python dependencies
├── .env.example         # Environment templates
└── README.md            # Project documentation
```

## 🛠️ Setup Instructions

### 1. Prerequisite: API Keys
You will need the following API keys:
- **Google AI Studio**: [Get Gemini API Key](https://aistudio.google.com/)
- **Groq Cloud**: [Get Groq API Key](https://console.groq.com/)
- **Serper.dev**: [Get Serper API Key](https://serper.dev/)
- **Browserless**: [Get Browserless API Key](https://www.browserless.io/)

### 2. Configure Environment
Rename `.env.example` to `.env` and fill in your keys:
```bash
GEMINI_API_KEY=your_key
SERPER_API_KEY=your_key
BROWSERLESS_API_KEY=your_key
GROQ_API_KEY=your_key
```

### 3. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the API
```bash
uvicorn main:app --reload
```

## 🧪 Testing the API

### Example Request (CURL)

```bash
curl -X POST http://127.0.0.1:8000/recommend \
-H "Content-Type: application/json" \
-d '{
  "location": "New York City",
  "cuisine": "Italian",
  "budget": "$$$",
  "preferences": "outdoor seating, high-quality pasta, romantic atmosphere"
}'
```

### Expected Response Format

```json
{
  "restaurants": [
    {
      "name": "L'Artusi",
      "rating": "4.7",
      "price_range": "$$$",
      "address": "228 W 10th St, New York, NY 10014",
      "why_recommended": "Excellent pasta selection and highly rated romantic atmosphere..."
    }
  ]
}
```

## 🛡️ Error Handling
The system includes logging and structured error responses. If any agent fails or the output cannot be parsed, a `500 Internal Server Error` will be returned with details.

## 🧘 Extensibility
You can easily add new agents in `agents.py` and define new tasks in `tasks.py` to extend the system's capabilities (e.g., adding a 'Sustainability Agent' or 'Health Score Agent').
