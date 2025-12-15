import { Users, UserCheck, UserX} from "lucide-react";
import { useState, useEffect } from "react";
import StatCard from "../components/Card";
import AttendanceChart from '../components/Chart';
import { fetchUserCount, fetchAttendanceStats } from "../api";


function Dashboard() {
  const [User, setUser] = useState(null);
  const [present, setPresent] = useState(null);
  const [absent, setAbsent] = useState(null);
  const [error, setError] = useState("");

  /** @type {{ day: string, value: number }[]} */
  const chartData = [
    { day: "Mon", value: 92 },
    { day: "Tue", value: 88 },
    { day: "Wed", value: 95 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 91 },
    { day: "Sat", value: 60 },
    { day: "Sun", value: 0 },
  ];

  useEffect(() => {
    fetchUserCount()
      .then(setUser)
      .catch((err) => setError(err.message));

    fetchAttendanceStats()
      .then((data) => {
        setPresent(Array(data.present).fill(0));
        setAbsent(Array(data.absent).fill(0));
      })
      .catch((err) => setError(err.message));
  }, []);


  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800">
          Dashboard Overview
        </h2>
        <p className="text-text-secondary text-gray-500 mt-1">
          Welcome back, Administrator. Here's what's happening today.
        </p>
      </div>

      {/* Card Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Example Card 1 */}
        <StatCard
          title="Total Users"
          value={error ? error : User !== null ? User : "Loading..."}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Present Today"
          value={present ? present.length : "Loading..."}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="On Leave"
          value={absent ? absent.length : "Loading..."}
          icon={UserX}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-4 h-[400px]">
          <AttendanceChart data={chartData} />
        </div>
      </div>
    </>
  );
}

export default Dashboard
