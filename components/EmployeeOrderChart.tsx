'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import 'chart.js/auto';

type Employee = {
  id: number;
  name: string;
};

const EmployeeOrdersChart = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState('');
  const [year, setYear] = useState('');
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch('/api/users/salesemployee'); 
      const data: Employee[] = await res.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  // Fetch available years
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await fetch('/api/charts/employeeOrders'); 
        const data = await res.json();
        setAvailableYears(data.years || []);
      } catch (error) {
        console.error('Error fetching available years:', error);
      }
    };

    fetchYears();
  }, []);

  const fetchData = async () => {
    if (!employeeId || !year) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/charts/employeeOrders?employeeId=${employeeId}&year=${year}`
      );
      const data = await res.json();
      setChartData(data.data || []);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [employeeId, year]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Order Count',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  const chartLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const chartDataset = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Orders',
        data: chartData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Employee Orders Chart</h1>

      <div className="mb-4 flex gap-4">
        <select
          className="p-2 border rounded text-black"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="" className="text-black">
            Select Year
          </option>
          {availableYears.map((availableYear) => (
            <option key={availableYear} value={availableYear}>
              {availableYear}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded text-black"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="" className="text-black">
            Select Employee
          </option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id} className="text-black">
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          {/* Material-UI Circular Loader */}
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <Line data={chartDataset} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default EmployeeOrdersChart;
