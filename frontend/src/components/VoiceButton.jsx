"use client";

import { Mic } from "lucide-react";

export default function VoiceButton({ onTranscript, language }) {
    function startListening() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Seu navegador não suporta reconhecimento de voz");
            return;
        }

        const recognition = new SpeechRecognition();

        const languageMap = {
            pt: "pt-BR",
            en: "en-US",
            es: "es-ES"
        };

        recognition.lang = languageMap[language];
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            onTranscript(text);
        };

        recognition.start();
    }

    return (
        <button onClick={startListening} className="bg-purple-600 hover:bg-purple-700 px-6 text-white cursor-pointer h-11">
            <Mic size={20} />
        </button>
    );
}