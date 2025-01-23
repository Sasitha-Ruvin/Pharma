// /components/MedicationRingChart.tsx
"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

interface MedicationStats {
  labels: string[];
  data: number[];
}

const MedicationRingChart = () => {
  const [chartData, setChartData] = useState<MedicationStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/charts/medcategory");
      const data = await response.json();
      if (response.ok) {
        setChartData(data);
      } else {
        console.error("Failed to fetch medication category data");
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  // Ring chart data structure
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Medication Categories",
        data: chartData.data,
        backgroundColor: [
          "#FF5733", "#4CAF50", "#FFEB3B", "#8E44AD", "#3498DB", "#2ECC71", "#E74C3C", "#F39C12"
        ], // Multiple colors for each segment
        borderColor: "#fff", // White borders between segments
        borderWidth: 2,
      },
    ],
  };

  // Ring chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Medication Categories Distribution",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw} medications`, 
        },
      },
      legend: {
        position: "top" as const,
      },
    },
    cutout: "70%", // Creates the ring chart (instead of a full donut chart)
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default MedicationRingChart;
