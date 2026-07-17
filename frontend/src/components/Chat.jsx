"use client";

import Message from "./Message";
import Input from "./Input";
import VoiceButton from "./VoiceButton";
import Loading from "./Loading";
import Navbar from "./Navbar";
import Image from "next/image";

import { useState, useEffect } from "react";
import { sendMessage as sendChatMessage } from "@/services/chat";
import { translations } from "@/i18n/locales/translations";

import logo from "../assets/Logo-Text-Iris-Background-397.66x151.66.png";

export default function Chat() {
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [language, setLanguage] = useState("pt");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const t = translations[language];

    useEffect(() => {
        setMessages([
            {
                sender: "assistant",
                text: translations[language].welcome
            }
        ]);
    }, [language]);

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

        const voiceMap = {
            pt: "pt-BR",
            en: "en-US",
            es: "es-ES"
        };

        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find((v) => v.lang.startsWith(voiceMap[language]));
        const utterance = new SpeechSynthesisUtterance(text);
        
        if (voice) {
            utterance.voice = voice;
        }

        utterance.lang = voiceMap[language],
        utterance.rate = 1.6;
        utterance.pitch = 1.25;
        
        window.speechSynthesis.cancel();
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

        const currentLanguage = languageMap[language] || "Português Brasileiro";

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
                    text: translations[language].error,
                },
            ]);

            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative w-full max-w-4xl h-[90vh] bg-white border-2 border-zinc-200 flex flex-col overflow-hidden">
            <Image src={logo} alt="Iris" className="absolute inset-0 m-auto w-95 h-auto pointer-events-none select-none"/>

            <header>
                <Navbar 
                        voiceEnabled={voiceEnabled} 
                        setVoiceEnabled={setVoiceEnabled}
                        language={language}
                        setLanguage={setLanguage}/>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 ">
                {
                    messages.map((msg,index)=>(
                        <Message key={index} sender={msg.sender} text={msg.text}/>
                    ))
                }

                {loading && <Loading/>}
            </div>
            <div className="flex items-center p-4 w-full">
                <VoiceButton language={language} onTranscript={setMessage}/>

                <div className="flex-1">
                    <Input sendMessage={handleSend} placeholder={t.placeholder} language={language}/>
                </div>
            </div>
        </div>

    )
}