"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

type ChartData = {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
  }>;
};

const OrderStatus = () => {
  const [orderStats, setOrderStats] = useState<{ labels: string[]; data: number[] } | null>(null);

  const fetchOrderStatusStats = async () => {
    try {
      const response = await fetch("/api/charts/orderstatus");
      const data = await response.json();
      if (data && data.labels && data.data) {
        setOrderStats({ labels: data.labels, data: data.data });
      }
    } catch (error) {
      console.error("Error fetching order status stats:", error);
    }
  };

  useEffect(() => {
    fetchOrderStatusStats();
  }, []);

  if (!orderStats) {
    return <div>Loading...</div>;
  }

  const chartData: ChartData = {
    labels: orderStats.labels,
    datasets: [
      {
        data: orderStats.data,
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(153, 102, 255, 0.6)"],
        hoverOffset: 4,
      }
    ]
  };

  return (
    <div className="p-8 space-y-4 text-black">
      <h2 className="text-2xl font-bold">Orders Based on Status</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default OrderStatus;
