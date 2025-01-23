"use client";

import SideBar from "@/components/SideBar";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [medicalArticles, setMedicalArticles] = useState<any[]>([]);
  const [hrArticles, setHrArticles] = useState<any[]>([]);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Fetch grouped articles (medical and HR-related) from the backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        // Set the data for medical and HR articles
        setMedicalArticles(data.medicalArticles || []);
        setHrArticles(data.hrArticles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Dynamically load the Google CSE script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=b41c54496136c4924"; 
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Detect if a search is performed by monitoring Google CSE results
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (
        searchResultsRef.current &&
        searchResultsRef.current.querySelectorAll(".gsc-result").length > 0
      ) {
        setIsSearchPerformed(true);
      }
    });

    if (searchResultsRef.current) {
      observer.observe(searchResultsRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="bg-[#F7F8FA] flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-black">Resource Hub</h1>

        {/* Google Custom Search Engine */}
        <div className="mt-6 w-full">
          <div className="gcse-search"></div>
          <div className="gcse-searchresults-only" ref={searchResultsRef}></div>
        </div>

        {/* Default Content (when no search is performed) */}
        {!isSearchPerformed && (
          <div className="mt-10">
            {/* Quick Links */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
              <ul className="space-y-4">
                <li>
                  <a href="https://simplerqms.com/pharmaceutical-sop-management/" className="text-blue-600 hover:underline">
                    Pharmaceutical SOPs
                  </a>
                </li>
              </ul>
            </div>

            {/* Featured Articles */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Medical Articles</h2>
              {medicalArticles.length > 0 ? (
                <ul className="space-y-4">
                  {medicalArticles.map((article, index) => (
                    <li key={index} className="p-4 bg-white shadow-md rounded-md">
                      <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                      <p className="text-sm text-gray-600">
                        {article.description || "No description available."}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-2 inline-block"
                      >
                        Read more
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No medical articles available.</p>
              )}

              <h2 className="text-xl font-bold text-gray-800 mt-10 mb-4">Human Resources</h2>
              {hrArticles.length > 0 ? (
                <ul className="space-y-4">
                  {hrArticles.map((article, index) => (
                    <li key={index} className="p-4 bg-white shadow-md rounded-md">
                      <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                      <p className="text-sm text-gray-600">
                        {article.description || "No description available."}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-2 inline-block"
                      >
                        Read more
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No HR articles available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
