"use client";

import { useState } from "react";
import Message from "./Message";
import Input from "./Input";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { sendMessage as sendChatMessage } from "@/services/chat";

export default function Chat() {
    const time = new Date().toLocaleDateString();
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
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "pt-BR";
    utterance.rate = 1.6;
    utterance.pitch = 1.25;
    utterance.volume = 1;

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

        try {
            const response = await sendChatMessage([
                {
                    role: "system",
                    content:
                        "Você é IRIS, uma assistente virtual",
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

            speak(response);
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
        <div className="w-full max-w-4xl h-[90vh] bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <header>
                <Navbar/>
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