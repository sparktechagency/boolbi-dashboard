import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TotalRevenue = ({
  yearlyRevenueData,
  years,
  selectedYear,
  setSelectedYear,
}) => {
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
  };

  return (
    <div
      style={{ width: "100%", height: 410 }}
      className="px-5 py-3 mt-3 bg-white rounded-2xl"
    >
      <div className="flex justify-between items-center">
        <h4 className="mb-5 mt-4 text-2xl font-semibold">Total Revenue</h4>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border rounded-md px-3 py-2 w-32 cursor-pointer"
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
            }}
          >
            <option value="">Select Year</option>
            {years
              ?.slice()
              ?.reverse()
              ?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={yearlyRevenueData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A4F61" stopOpacity={1} />
              <stop offset="100%" stopColor="#4A4F61" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="commission"
            stroke="#4A4F61"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalRevenue;
