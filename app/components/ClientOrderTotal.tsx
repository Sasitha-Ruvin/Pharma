// /components/CustomerBarChart.tsx
"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface CustomerStats {
  labels: string[];
  data: number[];
}

const CustomerBarChart = () => {
  const [chartData, setChartData] = useState<CustomerStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/charts/clientOrderTotal");
      const data = await response.json();
      if (response.ok) {
        setChartData(data);
      } else {
        console.error("Failed to fetch order stats");
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  // Bar chart data structure
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Number of Orders",
        data: chartData.data,
        backgroundColor: "#4CAF50", // Green color for bars
        borderColor: "#388E3C", // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Orders per Customer",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw} orders`; // Custom tooltip message
          },
        },
      },
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CustomerBarChart;
