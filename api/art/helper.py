import os
import google.generativeai as genai

genai.configure(
    api_key=os.environ.get("GEMINI_API_KEY", "AIzaSyC4EJnuBGOriYGzUpbAN07sn0u8DcZt41w")
)
from art.source_template import REDDIT_PROMPT, GOOGLE_PROMPT, TWITTER_PROMPT, POINTS_FORMATTER

source_prompt_mapper = {
    "reddit": REDDIT_PROMPT,
    "google": GOOGLE_PROMPT,
    "twitter": TWITTER_PROMPT
}
def build_dynamic_prompt(user_query, source, formatted_data, formatter_type):
    if source not in source_prompt_mapper.keys():
        return None
    if not formatted_data:
        return None 
    prompt_template = source_prompt_mapper[source].format(user_query=user_query, formatted_data=formatted_data, FORMATTER_TYPE=formatter_type)

    return prompt_template

def extract_data_with_gemini(scraped_data, user_query, source, formatter_type=POINTS_FORMATTER):
    # Build dynamic prompt based on user query and data source
    prompt = build_dynamic_prompt(user_query, source, scraped_data, formatter_type=formatter_type)
    if not prompt:
        return None
    # Use Gemini to generate the response
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text
