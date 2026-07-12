"use client";

import { Volume2, VolumeX } from "lucide-react";

export default function Navbar({
  voiceEnabled,
  setVoiceEnabled,
}) {
  return (
    <header className="h-20 bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
          I
        </div>

        <div>
          <h1 className="text-black text-2xl font-bold">IRIS</h1>
          <p className="text-zinc-600 text-sm">Assistente Inteligente</p>
        </div>
      </div>

      <div className="text-white text-sm">
        <button  className="p-2  bg-purple-600 hover:bg-purple-700 cursor-pointer"onClick={() => {
          if (voiceEnabled) {window.speechSynthesis.cancel()

          }
          setVoiceEnabled(!voiceEnabled);
        }}>
          {voiceEnabled ? <Volume2 size={20}/> : <VolumeX size={20}/>}
        </button>
      </div>
    </header>
  );
}
