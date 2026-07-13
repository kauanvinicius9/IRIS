"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function Navbar({
  voiceEnabled,
  setVoiceEnabled,
}) {

  const { t, i18n } = useTranslation();

  return (
    <header className="h-20 bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
          I
        </div>

        <div>
          <h1 className="text-black text-2xl font-bold">{t("title")}</h1>
          <p className="text-zinc-600 text-sm">{t("assistant")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button  className="p-2  bg-purple-600 hover:bg-purple-700 cursor-pointer"onClick={() => {
          if (voiceEnabled) {window.speechSynthesis.cancel()

          }
          setVoiceEnabled(!voiceEnabled);
        }}>
          {voiceEnabled ? <Volume2 size={20}/> : <VolumeX size={20}/>}
        </button>

        <select onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language} 
                     className="p-2  bg-purple-600 hover:bg-purple-700 cursor-pointer">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
        </select>
      </div>
    </header>
  );
}
