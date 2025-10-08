import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEngagementDataQuery } from "../../../redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const UserEngagement = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const { data: engagementData, isLoading } = useEngagementDataQuery({
    year: selectedYear,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const chartData = engagementData?.data || [];

  return (
    <div className="bg-white p-5 w-[100%] h-[450px] rounded-2xl border">
      <div className="flex justify-between items-center mb-5">
        <h2 className="mb-5 mt-4 text-2xl font-semibold">User Engagement</h2>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-md px-3 py-2 w-32 cursor-pointer"
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
            }}
          >
            {years
              .slice()
              .reverse()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" />
          <Line
            type="monotone"
            dataKey="orderCount"
            stroke="#4A4F61"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="userCount" stroke="#5c2579cc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;
