// src/pages/Dashboard.jsx
import React from 'react';
import BarChart from '../components/chart/BarChart';
import LineChart from '../components/chart/LineChart';
import PieChart from '../components/chart/PieChart';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al Dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 dark:bg-gray-800 rounded shadow">
          <BarChart />
        </div>
        <div className="p-4 dark:bg-gray-800 rounded shadow">
          <LineChart />
        </div>
        <div className="p-4 dark:bg-gray-800 rounded shadow">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;