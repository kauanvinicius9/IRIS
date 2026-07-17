"use client";

import { motion } from "framer-motion";

export default function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <motion.div initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} 
                        transition={{ duration: 0.25 }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`z-1000 max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-white text-black border-2 border-zinc-200"
            : "bg-white text-black border-2 border-zinc-200"
        }`}>
        {text}
      </div>
    </motion.div>
  );
}
