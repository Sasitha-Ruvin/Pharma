// /components/TierRingChart.tsx
"use client";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface CustomerStats {
  labels: string[];
  data: number[];
}

const TierRingChart = () => {
  const [chartData, setChartData] = useState<CustomerStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/charts/clientTier");
      const data = await response.json();
      if (response.ok) {
        setChartData(data);
      } else {
        console.error("Failed to fetch customer stats");
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  // Doughnut Chart (Ring Chart) data structure
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Customer Distribution by Tier",
        data: chartData.data,
        backgroundColor: ['#494fe6', '#e64966', '#49e68d', '#FF33A8'], // Colors for each section
        borderColor: ['#494fe6', '#e64966', '#49e68d', '#FF33A8'], 
        borderWidth: 1,
      },
    ],
  };

  // Doughnut Chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw} clients`; // Custom tooltip message
          },
        },
      },
      legend: {
        position: "top" as const, // Explicitly casting to avoid TypeScript error
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-black items-center justify-center text-center">Client Tiers</h1>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TierRingChart;
