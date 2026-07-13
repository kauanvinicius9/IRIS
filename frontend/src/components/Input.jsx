"use client";

import { useState } from "react";

export default function Input({ sendMessage }) {
  const [message, setMessage] = useState("");

  function handleSend() {
    sendMessage(message);
    setMessage("");
  }

  return (
    <div className="p-5 flex gap-3">
      <input type="text" placeholder="Digite uma mensagem..." className="flex-1 bg-zinc-100 text-zinc-600 p-3 outline-none active:bg-zinc-200"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {handleSend()}}}/>

      

      <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700 px-6 text-white cursor-pointer">
        Enviar
      </button>
    </div>
  );
}
