import { NextResponse } from "next/server";

export async function GET(request:Request) {

    try {
        const NEWS_API_KEY = process.env.NEWS_API_KEY;

    const pharmaNews = fetch(
       `https://newsapi.org/v2/everything?q=pharmaceuticals&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );

    const hrNews = fetch(
        `https://newsapi.org/v2/everything?q=workplace+management&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );

    const [pharmaResponse, hrResponse] = await Promise.all([pharmaNews,hrNews]);

    const pharmaData = await pharmaResponse.json();
    const hrData = await hrResponse.json();

    // Group the articles: Get top 5 pharma-related and top 5 HR-related articles
    const medicalArticles = pharmaData.articles.slice(0, 5);
    const hrArticles = hrData.articles.slice(0, 5);

    // Respond with grouped data
    return NextResponse.json({
      medicalArticles,
      hrArticles,
    });
    } catch (error) {
        console.log("Error",error)
        return NextResponse.json({error:"Failed to fetch news"},{status:500})
        
    }
    
}