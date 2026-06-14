export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-8 text-white">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/30">
          <svg
            className="h-10 w-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">ViralClip AI</h1>
          <p className="text-lg text-slate-300">
            Multimodal Reel Generation Workflow — Task 4 Internship Project
          </p>
          <p className="text-slate-400">
            This repository contains a complete Python Streamlit application. Run it locally with:
          </p>
          <code className="inline-block rounded-lg bg-slate-800 px-4 py-2 text-sm text-emerald-400">
            streamlit run app.py
          </code>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-fuchsia-400">5</div>
            <div className="text-sm text-slate-400">Reel Packages</div>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-violet-400">SRT</div>
            <div className="text-sm text-slate-400">Subtitle Export</div>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-emerald-400">Runway</div>
            <div className="text-sm text-slate-400">B-roll Prompts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
