'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData } from 'chart.js';

type UserData = { dateJoined: string };

const EmployeeFrequencyChart = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/charts/employeeJoined');
      const data: UserData[] = await response.json();
      
     
      const years = Array.from(new Set(data.map(item => new Date(item.dateJoined).getFullYear())))
        .sort((a, b) => b - a);

      setYears(years);

      const filteredData = data.filter(item => new Date(item.dateJoined).getFullYear() === selectedYear);
      const groupedData = groupByMonth(filteredData);
      const labels = Object.keys(groupedData);
      const frequencies = Object.values(groupedData);

      setChartData({
        labels,
        datasets: [
          {
            label: `Employee Frequency (${selectedYear})`,
            data: frequencies,
            borderColor: 'rgba(0, 200, 200, 1)',
            backgroundColor: 'rgba(0, 200, 200, 0.2)',
            tension: 0,
            pointStyle: 'circle',
            pointRadius: 4,
          },
        ] as ChartData<'line'>['datasets'],
      });
    };

    fetchData();
  }, [selectedYear]);

  const groupByMonth = (data: UserData[]) => {
    const result: Record<string, number> = {};
    data.forEach((item: UserData) => {
      const month = new Date(item.dateJoined).toLocaleString('default', { month: 'long' });
      result[month] = (result[month] || 0) + 1;
    });
    return result;
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div>
    <h3 className='text-center text-black'>Employee Recruitment Rate</h3>
      <select
        value={selectedYear}
        onChange={handleYearChange}
        style={{ marginBottom: '10px' }}
        className='text-black'
      >
        {years.map((year) => (
          <option key={year} value={year} className='text-black'>
            {year}
          </option>
        ))}
      </select>

      {/* Chart */}
      <div className="chart-container" style={{ width: '500px', height: '300px' }}>
     
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } },
            scales: {
              y: {
                ticks: {
                  stepSize: 5,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeFrequencyChart;
