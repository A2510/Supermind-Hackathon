import os
import google.generativeai as genai
import json
import logging
from art.source_template import RESPONSE_STRUCTURE_PROMPT, REDDIT_PROMPT, GOOGLE_PROMPT, YOUTUBE_PROMPT, POINTS_FORMATTER

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


# genai.configure(
#     api_key=os.environ.get("GEMINI_API_KEY", "AIzaSyC4EJnuBGOriYGzUpbAN07sn0u8DcZt41w")
# )
# from art.source_template import REDDIT_PROMPT, GOOGLE_PROMPT, YOUTUBE_PROMPT, POINTS_FORMATTER, RESPONSE_STRUCTURE_PROMPT

source_prompt_mapper = {
    "reddit": REDDIT_PROMPT,
    "google": GOOGLE_PROMPT,
    "twitter": YOUTUBE_PROMPT
}

class GeminiService:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def build_prompt(self, user_query, source, formatted_data, formatter_type, source_prompts):
        prompt_template = source_prompts.get(source)
        if not prompt_template or not formatted_data:
            return None
        prompt = prompt_template.format(
            user_query=user_query,
            formatted_data=formatted_data,
            FORMATTER_TYPE=formatter_type,
        )
        return prompt + "\n" + RESPONSE_STRUCTURE_PROMPT

    def generate_response(self, prompt):
        if not prompt:
            return []
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text)  # Adjust if the response format changes
        except Exception as e:
            logger.error(f"Error generating Gemini response: {e}")
            return []
