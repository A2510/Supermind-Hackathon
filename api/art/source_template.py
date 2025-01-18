REDDIT_PROMPT = """You are a highly intelligent data analyst and extraction agent. Your task is to identify and list the {FORMATTER_TYPE} experienced by users in the context of {user_query}.
            The data is from Reddit posts, including titles, body content, and comments.

            Formatted Data:
            {formatted_data}

            And here is the structure description of the data:
            reddit: This key holds an array of posts retrieved from Reddit. It will contain multiple post objects.

            Each Post Object:

                title: The title or headline of the Reddit post. This is typically a brief, attention-grabbing sentence summarizing the content.
                selftext: The main content or body of the Reddit post, providing detailed context or description for the title.
                url: The URL link to the original Reddit post, enabling access to the full post for more context.
                comments: An array of individual comments related to the Reddit post. Each comment provides the user responses or discussions associated with the post.
                upvotes: The number of upvotes the Reddit post has received. This is used to measure the posts popularity or engagement.
            Please extract and present the pain points in clear, concise bullet points. Avoid any unnecessary explanations or unrelated information"""

GOOGLE_PROMPT = """You are a highly intelligent data analyst and extraction agent. Your task is to identify and list the {FORMATTER_TYPE} based on the search results from Google for the query '{user_query}'.
            The data contains responses from various Google search results.

            Formatted Data:
            {formatted_data}

            And here is the structure description of the data:
            google: A list of search results related to fitness apps and services.

    title: The title of the search result, summarizing the content or name of the linked page.
    link: The URL leading to the specific page of the search result.
    snippet: A brief description or summary of the page's content.
    htmlSnippet: The snippet of the page's content with HTML tags for formatting (e.g., bold tags).
    pagemap: A nested dictionary containing additional metadata about the page.
        cse_thumbnail: A list of dictionaries containing details about thumbnail images.
            src: The source URL of the thumbnail image.
            width: The width of the thumbnail image in pixels.
            height: The height of the thumbnail image in pixels.
        metatags: A list of dictionaries providing metadata information about the page.
            Example fields include:
                og:image: URL of the Open Graph image for the page.
                twitter:card: Type of Twitter card (e.g., summary_large_image).
                og:title: Open Graph title of the page.
                og:description: Open Graph description of the page.
                viewport: Viewport settings for responsive design.
        cse_image: A list of dictionaries containing details about images on the page.
            src: The source URL of the image.
            Please extract and present the pain points in clear, concise bullet points from the responses."""

YOUTUBE_PROMPT = """You are a highly intelligent data analyst and extraction agent. Your task is to identify and list the {FORMATTER_TYPE} mentioned by users in tweets related to '{user_query}'.

            Formatted Data:
            {formatted_data}

            Please extract and present the pain points in clear, concise bullet points from the tweets."""

POINTS_FORMATTER = """ 1. key pain points or challenges which is challenges or frustration experinced by users in specific area.
            For example, if the context is **fitness apps**, some potential pain points might be:
            - "Lack of motivation to work out regularly."
            - "Difficulty tracking progress and improvements."
            - "Limited variety in workout plans."
            - "App crashes or glitches during use."
            - "Poor user interface, making navigation difficult."
            - "Unclear instructions or lack of guidance in exercises."

            If the context is **online shopping platforms**, some common pain points could be:
            - "Complicated checkout process leading to cart abandonment."
            - "Long delivery times and inaccurate tracking of orders."
            - "Inconsistent product quality compared to the descriptions."
            - "Difficulties in returning or exchanging products."
            - "Lack of customer support for urgent issues."
            - "Limited payment options or issues with payment gateway."

            For **social media apps**, potential pain points could include:
            - "Privacy concerns and data security issues."
            - "Overwhelming number of ads and interruptions."
            - "Difficulty finding relevant content or connections."
            - "App performance lags or crashes, especially during peak usage."
            - "Toxic behavior or harassment from other users."
            - "Addictive nature of the app, leading to wasted time."

            2. Triggers: Emotional or Situational Factors Driving Users to Seek Solutions

            Identify the emotional or situational triggers that prompt users to look for a solution to their pain points. These could be feelings (e.g., frustration, stress) or situations (e.g., time constraints, lack of resources) that push users to seek alternatives.

            For example, in meal delivery services:

                Lack of time: Not having enough time to cook after work.
                Convenience: Desire for a quick and easy meal option.
                Frustration: Dislike of cooking or cleaning up.

            Describe the specific triggers that drive users to search for solutions.

            3. Hooks: Attention-Grabbing Elements to Capture Interest

            Identify hooks—attention-grabbing features or statements designed to immediately captivate the audience and encourage further engagement.

            For example, in a fitness app:

                "Get fit in just 20 minutes a day—no equipment needed."
                "Transform your body in 30 days with personalized workout plans."
                
            For example, in an Instamart delivery app:

                "Get groceries delivered in 30 minutes, anytime, anywhere."
                "Shop now, pay later with easy installment options."

            These hooks should be compelling and instantly attract users' attention.
            """