// /components/MedicationPieChart.tsx
"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components for Pie chart
ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

interface MedicationStats {
  labels: string[];
  data: number[];
}

const MedicationPieChart = () => {
  const [chartData, setChartData] = useState<MedicationStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/charts/medquantity");
      const data = await response.json();
      if (response.ok) {
        setChartData(data);
      } else {
        console.error("Failed to fetch medication data");
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  // Pie chart data structure
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Medication Quantity",
        data: chartData.data,
        backgroundColor: ["#FF5733", "#4CAF50", "#FFEB3B", "#8E44AD", "#3498DB"], // Multiple colors for each section
        borderColor: "#fff", // White borders between sections
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Medication Quantities",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw} units`, // Custom tooltip message
        },
      },
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <Pie data={data} options={options} />
    </div>
  );
};

export default MedicationPieChart;
