export default function KPICard({ title, value, delta, icon }) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {delta && (
          <span className="text-xs font-medium text-emerald-500 bg-emerald-100 px-2 py-1 rounded-full">
            {delta}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}
