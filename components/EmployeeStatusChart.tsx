"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// types for the user and chart data
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status?: string; 
  isDeleted: boolean;
}

// types for the chart data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}

const EmployeeStatusChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
     
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const users: User[] = await response.json();

        // Count employees by status
        const traineeCount = users.filter(
          (user) => user.status === "Trainee"
        ).length;
        const permanentCount = users.filter(
          (user) => user.status === "Permanent"
        ).length;

        // Prepare chart data
        setChartData({
          labels: ["Trainee", "Permanent"],
          datasets: [
            {
              label: "Employee Status",
              data: [traineeCount, permanentCount],
              backgroundColor: ["#36A2EB", "#FF6384"],
              hoverBackgroundColor: ["#36A2EB80", "#FF638480"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div className="w-1/2 mx-auto mt-10">
      <h2 className="text-center text-md  mb-4 text-black">
        Employee Status Distribution
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export default EmployeeStatusChart;
