import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sat", Monthly: 420, Daily: 200 },
  { name: "Sun", Monthly: 400, Daily: 180 },
  { name: "Mon", Monthly: 250, Daily: 150 },
  { name: "Tue", Monthly: 550, Daily: 380 },
  { name: "Wed", Monthly: 540, Daily: 350 },
  { name: "Thu", Monthly: 580, Daily: 420 },
  { name: "Fri", Monthly: 520, Daily: 400 },
];

const TotalUserChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Total User</h2>
        <select className="bg-[#F1F2F6] px-4 py-2 rounded-lg">
          <option>Sat</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F2F6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              domain={[0, 600]}
              ticks={[0, 100, 200, 300, 400, 500, 600]}
            />
            <Tooltip />
            <Legend
              iconType="circle"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            <Bar
              name="Monthly"
              dataKey="Monthly"
              fill="#474761"
              radius={[5, 5, 0, 0]}
              barSize={20}
            />
            <Bar
              name="Daily"
              dataKey="Daily"
              fill="#E9E9EC"
              radius={[5, 5, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalUserChart;
