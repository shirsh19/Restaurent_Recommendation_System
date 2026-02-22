from crewai import Task
from agents import discovery_agent, architect_agent

# 1. Discovery Task (Using Groq)
discovery_task = Task(
    description='''1. Search for top restaurants in {location} for {cuisine} cuisine within {budget} budget.
    2. Scrape the websites of the top 5 results to get detailed menu information and latest ratings.''',
    expected_output='A detailed list of restaurants with scraped menu data and ratings.',
    agent=discovery_agent
)

# 2. Architect Task (Using Groq)
architect_task = Task(
    description='''1. Using the data from the Discovery Task, select the best 5 restaurants that match these preferences: {preferences}.
    2. Rank them from 1 to 5.
    3. Output the result in a clean, valid JSON format.''',
    expected_output='''A valid JSON object with the "restaurants" key. 
    Example: {{"restaurants": [{{"name": "...", "rating": "...", "price_range": "...", "address": "...", "why_recommended": "..."}}]}}''',
    agent=architect_agent,
    context=[discovery_task]
)
