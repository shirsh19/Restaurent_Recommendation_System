import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Load and clean API keys
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip().strip('"').strip("'")
    SERPER_API_KEY = os.getenv("SERPER_API_KEY", "").strip().strip('"').strip("'")
    BROWSERLESS_API_KEY = os.getenv("BROWSERLESS_API_KEY", "").strip().strip('"').strip("'")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip().strip('"').strip("'")

    @classmethod
    def validate(cls):
        missing = []
        if not cls.GEMINI_API_KEY: missing.append("GEMINI_API_KEY")
        if not cls.SERPER_API_KEY: missing.append("SERPER_API_KEY")
        if not cls.BROWSERLESS_API_KEY: missing.append("BROWSERLESS_API_KEY")
        if not cls.GROQ_API_KEY: missing.append("GROQ_API_KEY")
        
        if missing:
            raise ValueError(f"Missing environment variables: {', '.join(missing)}")

# Validate config on import to catch issues early
# Config.validate()
