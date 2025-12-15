import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg text-xs shadow-xl border border-gray-700">
        <p className="font-semibold text-gray-300 mb-1">{label}</p>
        <p className="font-bold text-lg">
          {payload[0].value}%{" "}
          <span className="text-gray-400 text-xs font-normal">Attendance</span>
        </p>
      </div>
    );
  }
  return null;
};

const AttendanceChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col w-lvh">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Weekly Attendance Overview
          </h3>
          <p className="text-sm text-gray-500">
            Compare daily attendance rates
          </p>
        </div>
        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 outline-none">
          <option>This Week</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={7}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6" }} />
            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
              barSize={40}
              activeBar={{ fill: "#2563EB" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
