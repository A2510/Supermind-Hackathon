import requests
from googleapiclient.discovery import build
from google_play_scraper import reviews
import praw

class Scraper:
    def __init__(self, google_api_key=None, search_engine=None, reddit_credentials=None):
        self.google_api_key = google_api_key
        self.search_engine = search_engine
        self.reddit_credentials = reddit_credentials

    def scrape_google(self, query, num_results=5):
        """Scrape Google search results using Google Custom Search JSON API."""
        try:
            # Google Custom Search API endpoint
            url = "https://www.googleapis.com/customsearch/v1"

            # Request parameters
            params = {
                "key": self.google_api_key,
                "cx": self.search_engine,
                "q": query,
                "num": num_results,
            }

            # Make the API request
            response = requests.get(url, params=params)
            response.raise_for_status()  # Raise an error for HTTP issues

            # Parse the JSON response
            data = response.json()
            results = []

            for item in data.get("items", []):
                results.append({
                    "title": item.get("title"),
                    "link": item.get("link"),
                    "snippet": item.get("snippet"),
                    "htmlSnippet": item.get("htmlSnippet"),
                    "pagemap": item.get("pagemap"),
                })

            return results

        except Exception as e:
            print(f"Error using Google Custom Search API: {e}")
            return []

    def scrape_youtube(self, query, max_results=5):
        """Scrape YouTube search results."""
        if not self.google_api_key:
            print("YouTube API key is not provided.")
            return []

        try:
            youtube = build("youtube", "v3", developerKey=self.google_api_key)
            request = youtube.search().list(
                q=query, part="snippet", type="video", maxResults=max_results
            )
            response = request.execute()
            results = []

            for item in response["items"]:
                video_id = item["id"]["videoId"]
                title = item["snippet"]["title"]
                description = item["snippet"]["description"]
                video_url = f"https://www.youtube.com/watch?v={video_id}"
                results.append({"title": title, "description": description, "url": video_url})

            return results
        except Exception as e:
            print(f"Error scraping YouTube: {e}")
            return []

    def scrape_reddit(self, query, subreddit="all", limit=5, comment_limit=5):
        """Scrape Reddit search results."""
        if not self.reddit_credentials:
            print("Reddit credentials are not provided.")
            return []

        try:
            print("Scraping Reddit...")
            reddit = praw.Reddit(**self.reddit_credentials)
            subreddit = reddit.subreddit(subreddit)
            results = []

            for post in subreddit.search(query, limit=limit):
                comments = [comment.body for comment in post.comments[:comment_limit]]
                results.append({
                    "title": post.title,
                    "selftext": post.selftext,
                    "url": post.url,
                    "comments": comments,
                    "upvotes": post.score,
                })

            return results
        except Exception as e:
            print(f"Error scraping Reddit: {e}")
            return []

    def scrape_quora(self, query, num_results=5):
        """Fetch Quora search results using Google Custom Search API."""
        try:
            # Google Custom Search API endpoint
            url = "https://www.googleapis.com/customsearch/v1"
            # Include "site:quora.com" to restrict search to Quora
            search_query = f"site:quora.com {query}"

            # Request parameters
            params = {
                "key": self.google_api_key,
                "cx": self.search_engine,
                "q": search_query,
                "num": num_results,
            }

            # Make the API request
            response = requests.get(url, params=params)
            response.raise_for_status()  # Raise an error for HTTP issues

            # Parse the JSON response
            data = response.json()
            results = []

            for item in data.get("items", []):
                results.append({
                    "title": item.get("title"),
                    "link": item.get("link"),
                    "snippet": item.get("snippet"),
                })

            return results

        except Exception as e:
            print(f"Error fetching Quora results via Google Custom Search API: {e}")
            return []

    @staticmethod
    def scrape_app_reviews(app_id, num_reviews=5):
        """Scrape app reviews from Google Play."""
        try:
            result, _ = reviews(
                app_id, count=num_reviews, sort="newest"
            )
            return [
                {"review": review["content"], "rating": review["score"]} 
                for review in result
            ]
        except Exception as e:
            print(f"Error scraping app reviews: {e}")
            return []

    def scrape_all(self, query, app_id=None):
        """Run all scrapers and collect results."""
        print("Scraping Google...")
        google_data = self.scrape_google(query)

        print("Scraping YouTube...")
        youtube_data = self.scrape_youtube(query)

        print("Scraping Reddit...")
        reddit_data = self.scrape_reddit(query)

        print("Scraping Quora...")
        quora_data = self.scrape_quora(query)

        app_reviews = []
        if app_id:
            print("Scraping App Reviews...")
            app_reviews = self.scrape_app_reviews(app_id, num_reviews=5)

        return {
            "google": google_data,
            "youtube": youtube_data,
            "reddit": reddit_data,
            "quora": quora_data,
            "app_reviews": app_reviews,
        }
