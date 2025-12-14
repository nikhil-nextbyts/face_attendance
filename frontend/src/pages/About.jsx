import {
  Info,
  Target,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-14 text-zinc-800 dark:text-zinc-200 rounded-xl shadow-xl shadow-cyan-500/50">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
              About the Project
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A face recognition–based attendance system built to automate
            identification and attendance marking with accuracy and efficiency.
          </p>
        </header>

        {/* Cards */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Objective */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                Objective
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                Automate attendance using face recognition
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                Reduce manual effort and proxy attendance
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                Maintain accurate digital records
              </li>
            </ul>
          </div>

          {/* Working */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
              <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                How It Works
              </h2>
            </div>
            <div className="">
              <ol className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300 list-decimal flex flex-col justifty-start ml-5 items-start">
                <li>User registers with face image</li>
                <li>Face is encoded using FastAPI</li>
                <li>Data is stored securely in database</li>
                <li>Face is recognized during attendance</li>
                <li>Attendance is marked automatically</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-500" />
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Technology Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            {[
              "React.js",
              "Node.js",
              "Express.js",
              "FastAPI",
              "Python",
              "MySQL",
              "REST APIs",
              "Face Recognition",
            ].map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-700 dark:text-zinc-200"
              >
                <Database className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Scope */}
        <section className="max-w-3xl">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            This project is developed as a college mini project to demonstrate
            full-stack development, API integration, and practical use of face
            recognition. The system can be extended with dashboards, analytics,
            and role-based access in the future.
          </p>
        </section>
      </div>
    </div>
  );
}
