export default function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] rounded-2xl px-5 py-3 whitespace-pre-wrap ${isUser ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-100"}`}>
        {text}
      </div>
    </div>
  );
}
