// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const PlatformPerformance = () => {
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

//   const [selectedYear, setSelectedYear] = useState(currentYear);

//   const { data: getPerformanceData } = useGetPlatformPerformanceQuery({
//     range: selectedYear,
//   });

//   const handleYearChange = (e) => {
//     const newYear = e.target.value;
//     setSelectedYear(newYear);
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="mb-5 mt-4 text-2xl font-semibold">Total User</h2>
//         <div className="relative">
//           <select
//             value={selectedYear}
//             onChange={handleYearChange}
//             className="border rounded-md px-3 py-2 w-32 cursor-pointer"
//             style={{
//               maxHeight: "150px",
//               overflowY: "scroll",
//             }}
//           >
//             <option value="">Select Year</option>
//             {years
//               ?.slice()
//               ?.reverse()
//               ?.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={310}>
//         <BarChart
//           data={userJoined}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 25,
//           }}
//         >
//           <CartesianGrid
//             strokeDasharray="3 3"
//             vertical={false}
//             stroke="#F1F2F6"
//           />
//           <XAxis
//             dataKey="month"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#666" }}
//           />
//           <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666" }} />
//           <Tooltip />
//           <Legend
//             iconType="circle"
//             verticalAlign="bottom"
//             align="center"
//             wrapperStyle={{
//               paddingTop: "20px",
//             }}
//           />
//           <Bar
//             name="User"
//             dataKey="user"
//             fill="#474761"
//             radius={[5, 5, 0, 0]}
//             barSize={20}
//           />
//           <Bar
//             name="Service Provider"
//             dataKey="serviceProvider"
//             fill="#8e8e8e"
//             radius={[5, 5, 0, 0]}
//             barSize={20}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PlatformPerformance;

const PlatformPerformance = () => {
  return <div>PlatformPerformance</div>;
};

export default PlatformPerformance;
