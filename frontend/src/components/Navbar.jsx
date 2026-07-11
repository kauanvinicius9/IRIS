export default function Navbar() {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-xl">
          I
        </div>

        <div>
          <h1 className="text-white text-2xl font-bold">IRIS</h1>
          <p className="text-slate-400 text-sm">Assistente Inteligente</p>
        </div>
      </div>

      <div className="text-slate-400 text-sm">Llama 3.2</div>
    </header>
  );
}
