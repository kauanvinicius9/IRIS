"use client";

import { useState } from "react";

export default function Input({ sendMessage }) {
  const [message, setMessage] = useState("");

  function handleSend() {
    sendMessage(message);
    setMessage("");
  }

  return (
    <div className="p-5 border-t border-slate-800 flex gap-3">
      <input type="text" placeholder="Digite uma mensagem..." className="flex-1 rounded-xl bg-slate-800 text-white p-4 outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {handleSend()}}}/>

      <button onClick={handleSend} className="bg-violet-600 hover:bg-violet-700 transition px-6 rounded-xl text-white font-semibold">
        Enviar
      </button>
    </div>
  );
}
