"use client";

import { useState } from "react";
import Message from "./Message";
import Input from "./Input";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";
import { sendMessage as sendChatMessage } from "@/services/chat";

export default function Chat() {
    const { i18n } = useTranslation;
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            text: "Olá! Meu nome é Íris, como posso te ajudar?"
        }
    ]);

    function sendMessage(message) {
        if (message.trim() === "") return;
        setMessages(old => [
            ...old,
            {
                sender: "user",
                text: message
            }
        ]);
    }

    function speak(text) {
        if (!voiceEnabled) return;
        
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "pt-BR";
        utterance.rate = 1.6;
        utterance.pitch = 1.25;

        const voices = window.speechSynthesis.getVoices();

         const femaleVoice = voices.find((voice) =>
            voice.name.includes("pt-BR-FranciscaNeural")
    );

    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
}


    async function handleSend(message) {
        if (!message.trim()) return;

        const history = [
            ...messages,
            {
                sender: "user",
                text: message,
            },
        ];

        setMessages(history);
        setLoading(true);

        const languageMap = {
            pt: "Português Brasileiro",
            en: "English",
            es: "Español",
        };

        const currentLanguage = languageMap[i18n.language] || "Português Brasileiro";

        try {
            const response = await sendChatMessage([
                {
                    role: "system",
                    content: `
                        Você é íris, uma assistente virtual.

                        Responde sempre em ${currentLanguage}.
                        Nunca misture idiomas.
                        Se o usuário escrever em outro idioma, responda no idioma atualmente selecionado.
                    `,
                },
                ...history.map((msg) => ({
                    role: msg.sender === "assistant" ? "assistant" : "user",
                    content: msg.text,
                })),
            ]);

            setMessages((old) => [
                ...old,
                {
                    sender: "assistant",
                    text: response,
                },
            ]);

            speak(response, voiceEnabled);
        } catch (error) {
            setMessages((old) => [
                ...old,
                {
                    sender: "assistant",
                    text: "Não consegui me conectar ao Ollama",
                },
            ]);

            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-4xl h-[90vh] bg-white border-2 border-zinc-200 flex flex-col overflow-hidden">
            <header>
                <Navbar voiceEnabled={voiceEnabled} setVoiceEnabled={setVoiceEnabled}/>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {
                    messages.map((msg,index)=>(
                        <Message key={index} sender={msg.sender} text={msg.text}/>
                    ))
                }

                {loading && <Loading/>}
            </div>
            <Input sendMessage={handleSend}/>
        </div>

    )
}