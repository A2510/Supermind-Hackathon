from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import os
import google.generativeai as genai
from rest_framework import status
from django.conf import settings
from art.utils import Scraper
from art.helper import extract_data_with_gemini

genai.configure(
    api_key=os.environ.get("GEMINI_API_KEY", "AIzaSyC4EJnuBGOriYGzUpbAN07sn0u8DcZt41w")
)

def getRoutes(request):
    routes = {
        'Dashboard': '/dashboard',
    }
    return Response(routes)

class DashboardView(APIView):
    def get(self, request):
        reddit_credentials = {
            "client_id": settings.REDDIT_CLIENT_ID,
            "client_secret": settings.REDDIT_SECRET,
            "user_agent": settings.USER_AGENT,
        }
        query = request.query_params.get('q')
        if query is None:
            return Response({"error": "Please provide a query parameter"}, status=status.HTTP_400_BAD_REQUEST)

        app_id = request.query_params.get('app_id', None)

        scraper = scraper = Scraper(google_api_key=settings.GOOGLE_API_KEY, search_engine=settings.SEARCH_ENGINE_ID, reddit_credentials=reddit_credentials)
        results = scraper.scrape_all(query, app_id=app_id)   
        
        response = {}
        for source, data in results.items():
            if source != "app_reviews":
                temp = extract_data_with_gemini(data, query, source)
                if not temp:
                    continue
                response[source] = temp
            else:
                response[source] = data
        
        return JsonResponse(response)


# from serpapi import GoogleSearch

# class GetTrends(APIView):
#     def get(self, request):
#         query = request.query_params.get('q')
#         if query is None:
#             return Response({"error": "Please provide a query parameter"}, status=status.HTTP_400_BAD_REQUEST)

#         scraper = Scraper(google_api_key=settings.GOOGLE_API_KEY, search_engine=settings.SEARCH_ENGINE_ID)
#         results = scraper.scrape_google(query)

#         formatter_type = "trends"
#         formatted_data = " ".join(results)
#         response = extract_data_with_gemini(formatted_data, query, "google", formatter_type)

#         return JsonResponse({"response": response})
