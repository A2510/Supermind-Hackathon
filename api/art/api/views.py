from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from serpapi import GoogleSearch
from art.utils import Scraper
from art.helper import GeminiService, source_prompt_mapper, POINTS_FORMATTER
from django.core.cache import cache
import json
import logging
# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def getRoutes(request):
    routes = {
        'Dashboard': '/dashboard',
    }
    return Response(routes)


# Dashboard API View
class DashboardView(APIView):
    def post(self, request):
        # Extract query and app_id from request
        query = request.data.get("query")
        app_id = request.data.get("app_id")
        isCached = request.data.get("isCached", True) 
        target = request.data.get("target")
        list_of_sources = request.data.get("sources")
        if not query:
            return Response(
                {"error": "Please provide a query parameter"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cache_key = f"dashboard_query:{query}:{app_id}"

        # Check if the response is already cached
        cached_response = cache.get(cache_key)
        if cached_response and isCached:
            logger.info(f"Cache hit for query: {query}")
            return JsonResponse(cached_response, safe=False)

        # Initialize services
        scraper = Scraper(
            google_api_key=settings.GOOGLE_API_KEY,
            search_engine=settings.SEARCH_ENGINE_ID,
            reddit_credentials={
                "client_id": settings.REDDIT_CLIENT_ID,
                "client_secret": settings.REDDIT_SECRET,
                "user_agent": settings.USER_AGENT,
            },
        )
        gemini_service = GeminiService(api_key=settings.GEMINI_API_KEY)

        try:
            # Scrape data
            scraped_results = scraper.scrape_all(query, app_id=app_id)
            # scraped_results = scraper.scrape_reddit(query)
            # scraped_results = {"reddit": scraped_results}
            # Process and generate response
            response = {}
            for source, data in scraped_results.items():
                prompt = gemini_service.build_prompt(
                    user_query=query,
                    source=source,
                    formatted_data=data,
                    formatter_type=POINTS_FORMATTER,
                    source_prompts=source_prompt_mapper,
                )
                response[source] = gemini_service.generate_response(prompt)
            
            
            # Cache the response
            cache.set(cache_key, response, timeout=3600*24)  # Cache timeout is 24 hour
            logger.info(f"Cached response for query: {query}")

            return JsonResponse(response)

        except Exception as e:
            logger.error(f"Error in DashboardView: {e}")
            return Response(
                {"error": "An error occurred while processing the request"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
# class GetSummary(APIView):
#     def post(self, request):
#         response = request.data.get("response")
#         if not response:
#             return Response(
#                 {"error": "Please provide a response parameter"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         gemini_service = Geminiservice(api_key=settings.GEMINI_API_KEY)
#         try:
            

class GetTrends(APIView):
    def get(self, request):
        query = request.query_params.get('q')
        if query is None:
            return Response({"error": "Please provide a query parameter"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate a unique cache key based on the query
        cache_key = f"trends_query:{query}"

        # Check if the result is already cached
        cached_result = cache.get(cache_key)
        if cached_result:
            logger.info(f"Cache hit for trends query: {query}")
            return JsonResponse(cached_result, safe=False)

        try:
            params = {
                "q": query,
                "data_type": "TIMESERIES",
                "api_key": "ad0667473845bb9bb621b793529a08ed795bccf7cd1394d636086cbec6e850d7",
            }

            search = GoogleSearch(params)
            results = search.get_dict()
            cache.set(cache_key, results, timeout=3600*24)  # Cache timeout is 24 hour
            logger.info(f"Cached trends result for query: {query}")

            return JsonResponse(results)

        except Exception as e:
            logger.error(f"Error in GetTrends: {e}")
            return Response(
                {"error": "An error occurred while fetching trends data"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
