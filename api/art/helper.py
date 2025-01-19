import google.generativeai as genai
import json
import logging
from art.source_template import RESPONSE_STRUCTURE_PROMPT, REDDIT_PROMPT, GOOGLE_PROMPT, YOUTUBE_PROMPT, POINTS_FORMATTER, GENERATE_SUMMARY_PROMPT
import re

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


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
        return prompt + RESPONSE_STRUCTURE_PROMPT

    def generate_response(self, prompt):
        if not prompt:
            return {}
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            try:
                response = self.model.generate_content(prompt)
                # Extract JSON content from the response
                pattern = r'```json\n([\s\S]*?)\n```'
                print(response.text)
                match = re.search(pattern, response.text)
                print(match)
                # Extract JSON content from the response
                # json_content = re.search(r"\{.*\}", response)
                return json.loads(match.group(1))
            except Exception as e:
                logger.error(f"Error generating response: {e}")
                return {}
        
    def generate_summary(self, response):
        if not response:
            return {}
        try:
            summary_prompt = GENERATE_SUMMARY_PROMPT.format(response=json.dumps(response))
            generated_response = self.model.generate_content(summary_prompt)
            return json.loads(generated_response.text)
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return {}
