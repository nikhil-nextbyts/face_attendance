import { Users, UserCheck, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "../components/Card";
import AttendanceChart from "../components/Chart";
import {
  fetchUserCount,
  fetchAttendanceStats,
  fetchWeeklyAttendance,
} from "../api";

function Dashboard() {
  const [userCount, setUserCount] = useState(null);
  const [presentCount, setPresentCount] = useState(null);
  const [absentCount, setAbsentCount] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserCount()
      .then(setUserCount)
      .catch(() => setError("Failed to load user count"));

    fetchAttendanceStats()
      .then((data) => {
        setPresentCount(data.present);
        setAbsentCount(data.absent);
      })
      .catch(() => setError("Failed to load attendance stats"));

    fetchWeeklyAttendance()
      .then(setChartData)
      .catch(() => setError("Failed to load chart data"));
  }, []);

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-zinc-800 ">
          Dashboard Overview
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Welcome back. Here’s what’s happening today.
        </p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={userCount ?? "—"}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Present Today"
          value={presentCount ?? "—"}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Absent Today"
          value={absentCount ?? "—"}
          icon={UserX}
          color="orange"
        />
      </div>

      {/* Chart */}
      <div className="flex justify-center mb-8">
        <div className="h-[400px]">
          <AttendanceChart data={chartData} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
