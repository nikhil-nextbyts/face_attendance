export default function RecentLogsTable() {
  // TODO: replace with real data fetch
  const rows = [
    {
      name: "Sarah Jenkins",
      id: "#EMP-892",
      status: "Granted",
      point: "Front Entrance",
      time: "08:42 AM",
      confidence: "99.2%",
    },
    {
      name: "Michael Chen",
      id: "#EMP-441",
      status: "Granted",
      point: "Side Gate B",
      time: "08:38 AM",
      confidence: "96.8%",
    },
    {
      name: "Unknown",
      id: "--",
      status: "Denied",
      point: "Back Loading Dock",
      time: "08:15 AM",
      confidence: "12.4%",
    },
    {
      name: "James Wilson",
      id: "#EMP-103",
      status: "Granted",
      point: "Front Entrance",
      time: "08:10 AM",
      confidence: "98.5%",
    },
  ];

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">Recent Recognition Logs</h3>
          <p className="text-sm text-slate-500">
            Real-time entry logs from all access points
          </p>
        </div>
        <button className="text-sm font-medium text-primary">
          View Full Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-semibold text-slate-500 border-b">
              <th className="px-6 py-4">User Profile</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Access Point</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://i.pravatar.cc/150?img=${
                          i + 5
                        }')`,
                      }}
                    />
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      r.status === "Granted"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        r.status === "Granted" ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    ></span>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{r.point}</td>
                <td className="px-6 py-4 text-slate-600">{r.time}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          r.status === "Granted" ? "bg-primary" : "bg-red-500"
                        }`}
                        style={{ width: r.confidence.replace("%", "") + "%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {r.confidence}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
