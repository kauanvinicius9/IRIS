"use client";

import { Volume2, VolumeX } from "lucide-react";
import { translations } from "@/i18n/locales/translations";
import { useState } from "react";

import logo from "../assets/Logo-Icon-Iris-Purple-70x70.svg";
import Image from "next/image";

export default function Navbar({
  voiceEnabled,
  setVoiceEnabled,
}) {

  const [language, setLanguage] = useState("pt");
  const t  = translations[language];

  return (
    <header className="h-20 bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div>
          <Image src={logo} alt="íris logo" className="w-15 h-15"/>
        </div>

        <div>
          <h1 className="text-black text-2xl font-bold">{t.title}</h1>
          <p className="text-zinc-600 text-sm">{t.assistant}</p>
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

        <select onChange={(e) => setLanguage(e.target.value)} value={language} 
                     className="p-2  bg-purple-600 hover:bg-purple-700 cursor-pointer">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
        </select>
      </div>
    </header>
  );
}
