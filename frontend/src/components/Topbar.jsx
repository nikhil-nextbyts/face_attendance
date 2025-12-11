export default function Topbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800/50">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">face</span>
        <span className="font-bold">FaceAuth</span>
      </div>
      <button className="text-slate-500 dark:text-white">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </div>
  );
}
