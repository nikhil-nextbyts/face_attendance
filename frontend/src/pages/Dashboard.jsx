import { Users, UserCheck, UserX} from "lucide-react";
import StatCard from "../components/Card";
import AttendanceChart from '../components/Chart';

function Dashboard() {
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

  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-text-secondary mt-1">
          Welcome back, Administrator. Here's what's happening today.
        </p>
      </div>

      {/* Card Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Example Card 1 */}
        <StatCard
          title="Total Users"
          value={120}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Present Today"
          value="94.2%"
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="On Leave"
          value="18"
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
