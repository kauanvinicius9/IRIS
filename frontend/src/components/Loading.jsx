export default function Loading() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-2xl px-5 py-4 max-w-fit">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
        </div>
      </div>
    </div>
  );
}
