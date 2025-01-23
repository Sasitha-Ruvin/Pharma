'use client';

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
import { colorConfig } from '@/utils/colorConfig';

type RoleData = {
  role: string;
  _count: { id: number };
};

const RoleCountChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRoleCounts = async () => {
      try {
        const response = await fetch('/api/charts/rolecount');
        const data: RoleData[] = await response.json();

        const labels = data.map((item) => item.role);
        const values = data.map((item) => item._count.id);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Employees',
              data: values,
              backgroundColor: colorConfig.backgroundColor,
              borderColor: colorConfig.borderColor,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching role counts:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchRoleCounts();
  }, []);

  return (
    <div style={{ width: '350px', margin: 'auto' }}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          {/* Material-UI Circular Loader */}
          <CircularProgress />
        </div>
      ) : (
        <>
          <h3 className="text-center text-black">Employee Roles</h3>
          <Pie data={chartData} />
        </>
      )}
    </div>
  );
};

export default RoleCountChart;
