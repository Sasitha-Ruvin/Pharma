"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }>;
};

const OrderChart = () => {
  const [ordersData, setOrdersData] = useState<number[]>(Array(12).fill(0)); // Default to 0 orders
  const [year, setYear] = useState<number>(new Date().getFullYear()); // Default to current year

  const fetchOrderStats = async (year: number) => {
    try {
      const response = await fetch(`/api/charts/orderstat?year=${year}`);
      const data = await response.json();
      if (Array.isArray(data)) setOrdersData(data);
      else console.error("Failed to fetch data:", data);
    } catch (error) {
      console.error("Error fetching order stats:", error);
    }
  };

  useEffect(() => {
    fetchOrderStats(year);
  }, [year]);

  const chartData: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: `Orders in ${year}`,
        data: ordersData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="p-8 space-y-4 text-black">
        <h1 className="text-center text-3xl">Total Order per Month</h1>
      <div className="flex space-x-4 text-black">
        <label htmlFor="year">Select Year:</label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-md px-2 py-1 w-28"
        />
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default OrderChart;
