const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "j473gNRsF3IFgD_TtUDUkQdrhlwI3a-KU-hswnGDC0Q";

export async function fetchPhoto({ query }: { query: string | null }) {
    const url = "https://api.unsplash.com/photos/random";
    const params = new URLSearchParams({
        query: query || "random",  // Search query
        orientation: "landscape",  // Optional: 'landscape', 'portrait', 'squarish'
    });
    try {
        console.log("Fetching photo...", ACCESS_KEY);
        const response = await fetch(`${url}?${params.toString()}`, {
            headers: {
                "Authorization": `Client-ID ${ACCESS_KEY}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Photo Details:");
            console.log(`ID: ${data[0].id}`);
            console.log(`Description: ${data[0].description || 'No description'}`);
            console.log(`Photographer: ${data[0].user.name}`);
            console.log(`Download URL: ${data[0].urls.full}`);  // URL to the high-resolution image
            return data[0].urls.full;
        } else {
            console.log(`Failed to fetch photo: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching photo:", error);
    }
}
