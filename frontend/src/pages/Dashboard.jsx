import React from "react";
import KPICard from "../components/KPICard";
// import LiveFeed from "../components/LiveFeed";
import RecentLogsTable from "../components/RecentLogsTable";

export default function Dashboard() {
  // TEMP: replace with fetch calls and state
  const kpis = [
    { title: "Total Registered", value: "1,240", delta: "+12%", icon: "group" },
    { title: "Present Today", value: "856", delta: "+5%", icon: "how_to_reg" },
    { title: "Absent Today", value: "42", delta: "-2%", icon: "person_off" },
    {
      title: "Avg. Accuracy",
      value: "98.5%",
      delta: "",
      icon: "center_focus_strong",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, Admin. System status is{" "}
            <span className="text-primary font-medium">Normal</span>.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary">
                search
              </span>
            </div>
            <input
              placeholder="Search users, logs..."
              className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 rounded-full w-64 pl-10 p-3"
            />
          </div>
          <button className="relative p-3 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k) => (
          <KPICard key={k.title} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Attendance Trends</h3>
              <p className="text-sm text-slate-500">
                Weekly overview of employee presence
              </p>
            </div>
            <select className="rounded-lg px-3 py-2 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="min-h-[300px] relative">
            {/* Chart placeholder — integrate Chart.js or Recharts here */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-slate-400">
              <p className="mb-2">Chart placeholder</p>
              <p className="text-xs">
                Integrate Chart.js / Recharts / ApexCharts for real charts
              </p>
            </div>
          </div>
        </div>

        {/* <LiveFeed /> */}
      </div>

      <RecentLogsTable />
    </div>
  );
}
