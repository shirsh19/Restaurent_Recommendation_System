from crewai import Agent
from langchain_groq import ChatGroq
from tools import SerperSearchTool, BrowserlessScraperTool
from config import Config

# Initialize LLM
# Using Groq Llama 3 70B - High speed, high rate limits, and senior-level reasoning.
groq_llm = ChatGroq(
    model="llama3-70b-8192",
    groq_api_key=Config.GROQ_API_KEY,
    temperature=0.7,
    max_retries=5
)

# --- 2-AGENT GROQ ARCHITECTURE ---

# 1. Discovery Agent (Search + Scrape)
discovery_agent = Agent(
    role='Restaurant Discovery Expert',
    goal='Search and scrape {cuisine} restaurants in {location} within {budget} budget.',
    backstory='''You are an expert at deep-web research. You find restaurants and 
    extract their full details (menus, reviews, ratings) to build a raw data cache.''',
    tools=[SerperSearchTool(), BrowserlessScraperTool()],
    llm=groq_llm, 
    verbose=True,
    allow_delegation=False,
    max_iter=5 # Groq has higher limits, allowing deeper research
)

# 2. Architect Agent (Analyze + Rank + JSON Output)
architect_agent = Agent(
    role='Culinary Data Architect',
    goal='Analyze the discovered data, match it with {preferences}, and output the final JSON.',
    backstory='''You are a master of data synthesis. You take raw restaurant facts, 
    filter them based on subtle user tastes, and format the output into perfect JSON.''',
    llm=groq_llm,
    verbose=True,
    allow_delegation=False,
    max_iter=3
)
