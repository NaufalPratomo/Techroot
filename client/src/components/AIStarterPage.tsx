"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import {
    Sparkles,
    ArrowRight,
    Bot,
    Paperclip,
    Image as ImageIcon,
    ChevronDown,
    X,
    FileText,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const requestedModels = [
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B", description: "Google (Terbaru)" },
    { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B", description: "OpenAI (Free)" },
    { id: "qwen/qwen3-coder:free", name: "Qwen 3 Coder", description: "Qwen (Free)" },
    { id: "deepseek/deepseek-r1-0528:free", name: "Deepseek R1", description: "Deepseek (Free)" },
];

export const AIStarterPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedModel, setSelectedModel] = useState(requestedModels[0]);
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // auto scroll to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const message = inputValue.trim();
        if (!message && uploadedFiles.length === 0) return;

        const newMessages = [...messages, { role: "user", content: message } as const];
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);

        try {
            const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
            const endpoint = `${apiUrl}/api/ai/chat`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    model: selectedModel.id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.data.reply }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: `Error: ${data.message}` },
                ]);
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Maaf, terjadi kesalahan saat menghubungi AI." },
            ]);
        } finally {
            setIsLoading(false);
            if (textareaRef.current) textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploadedFiles((prev) => [...prev, ...Array.from(files)]);
        }
        e.target.value = "";
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                Math.min(textareaRef.current.scrollHeight, 200) + "px";
        }
    };

    return (
        <div className="relative flex flex-col h-screen w-full bg-white overflow-hidden">
            {/* Background design */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 right-0 h-[60%]"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(36, 67, 176, 0.08) 0%, rgba(59, 130, 246, 0.05) 30%, transparent 100%)",
                    }}
                />
                <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[400px] bg-blue-300/20 rounded-full blur-[120px]" />
                <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-200/10 rounded-full blur-[100px]" />
            </div>

            {/* Main Layout Container */}
            <div className="bottom-0 left-0 right-0 fixed z-10 flex flex-col h-full w-full overflow-hidden">
                {/* 1. SCROLLABLE CHAT AREA */}
                <div className="flex-1 w-full pb-16 overflow-y-auto scrollbar-hide">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                        {messages.length === 0 ? (
                            /* Hero Section */
                            <div className="flex-1 flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-slate-900 text-center leading-tight mb-6">
                                    <span className="block italic opacity-40 mb-2">Tanya Root.</span>
                                    <span className="block">Kamu Punya Pertanyaan.</span>
                                    <span className="block">Root Punya Jawaban.</span>
                                </h1>
                                <p className="text-slate-500 text-lg md:text-xl text-center max-w-lg">
                                    Tanyakan apapun tentang coding. Debug error. Minta contoh kode.
                                </p>
                            </div>
                        ) : (
                            /* Message List */
                            <div className="py-28 space-y-8">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-500 gap-3",
                                            msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md border animate-in zoom-in-50 duration-500",
                                                msg.role === "user"
                                                    ? "bg-white border-blue-100 text-blue-600"
                                                    : "bg-blue-600 border-blue-400 text-white"
                                            )}
                                        >
                                            {msg.role === "user" ? (
                                                <User className="h-5 w-5" />
                                            ) : (
                                                <Bot className="h-5 w-5" />
                                            )}
                                        </div>

                                        <div
                                            className={cn(
                                                "max-w-[80%] rounded-[24px] p-5 shadow-sm transition-all hover:shadow-md",
                                                msg.role === "user"
                                                    ? "bg-[#2443B0] text-white rounded-tr-none"
                                                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                                            )}
                                        >
                                            <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed opacity-95">
                                                {msg.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex w-full animate-in fade-in duration-300 gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border border-blue-400 animate-pulse">
                                            <Bot className="h-5 w-5 text-white animate-spin-slow" />
                                        </div>
                                        <div className="bg-white border border-slate-100 rounded-[24px] p-5 rounded-tl-none shadow-sm flex flex-col gap-3 min-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" />
                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                                                    Root sedang merespon
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 bg-slate-100 rounded-full w-full animate-pulse" />
                                                <div className="h-2 bg-slate-100 rounded-full w-3/4 animate-pulse delay-75" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Buffer to prevent last message from being hidden by input bar */}
                        <div className="h-[200px] shrink-0" />
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* 2. BOTTOM INPUT AREA - Fixed on top of scroll container */}
                <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                    {/* Glassmorphic Blur Effect for the bottom area */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-100 bg-white/40 backdrop-blur-xl border-t border-slate-100 -z-10 mask-gradient-bottom"
                        style={{
                            WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
                            maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
                        }}
                    />

                    <div className="pb-16 pointer-events-auto">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="bg-white rounded-[24px] shadow-2xl border border-slate-200 p-3 md:p-4 transition-all focus-within:ring-4 focus-within:ring-blue-500/5 group">
                                    {/* File Previews */}
                                    {uploadedFiles.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3 px-1">
                                            {uploadedFiles.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm"
                                                >
                                                    {file.type.startsWith("image/") ? (
                                                        <ImageIcon className="h-4 w-4 text-blue-500" />
                                                    ) : (
                                                        <FileText className="h-4 w-4 text-slate-500" />
                                                    )}
                                                    <span className="text-slate-700 max-w-[150px] truncate font-medium">
                                                        {file.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Text Input */}
                                    <textarea
                                        ref={textareaRef}
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            adjustTextareaHeight();
                                        }}
                                        onKeyDown={handleKeyDown}
                                        disabled={isLoading}
                                        placeholder={
                                            isLoading
                                                ? "Root sedang bekerja..."
                                                : "Apa masalah coding yang sedang kamu hadapi?"
                                        }
                                        rows={1}
                                        className="w-full bg-transparent border-none outline-none text-slate-900 text-base md:text-lg placeholder:text-slate-400 mb-2 px-1 resize-none min-h-[44px] max-h-[200px] py-2 scrollbar-hide"
                                    />

                                    {/* Action Buttons Row */}
                                    <div className="flex items-center justify-between border-t border-slate-50 pt-2 px-1 pb-1">
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#2443B0] transition-all"
                                                title="Attach file"
                                            >
                                                <Paperclip className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => imageInputRef.current?.click()}
                                                className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#2443B0] transition-all"
                                                title="Upload image"
                                            >
                                                <ImageIcon className="h-5 w-5" />
                                            </button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                multiple
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                            <input
                                                ref={imageInputRef}
                                                type="file"
                                                multiple
                                                onChange={handleFileUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Model Selector */}
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowModelDropdown(!showModelDropdown)
                                                    }
                                                    className="h-10 px-4 rounded-xl border border-slate-100 flex items-center gap-2 text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all text-sm font-medium"
                                                >
                                                    <Bot className="h-4 w-4 text-[#2443B0]" />
                                                    <span className="hidden sm:inline lowercase">
                                                        {selectedModel.name}
                                                    </span>
                                                    <ChevronDown
                                                        className={cn(
                                                            "h-3.5 w-3.5 transition-transform duration-200",
                                                            showModelDropdown && "rotate-180"
                                                        )}
                                                    />
                                                </button>

                                                {showModelDropdown && (
                                                    <div className="absolute bottom-full right-0 mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                                        <div className="p-2">
                                                            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                                                Pilih Model AI
                                                            </div>
                                                            <div className="space-y-1">
                                                                {requestedModels.map((model) => (
                                                                    <button
                                                                        key={model.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedModel(model);
                                                                            setShowModelDropdown(false);
                                                                        }}
                                                                        className={cn(
                                                                            "w-full flex items-start gap-4 p-3 rounded-xl text-left transition-all",
                                                                            selectedModel.id === model.id
                                                                                ? "bg-blue-50 text-[#2443B0]"
                                                                                : "hover:bg-slate-50 text-slate-600"
                                                                        )}
                                                                    >
                                                                        <div
                                                                            className={cn(
                                                                                "p-2 rounded-lg",
                                                                                selectedModel.id === model.id
                                                                                    ? "bg-white shadow-sm"
                                                                                    : "bg-slate-100"
                                                                            )}
                                                                        >
                                                                            <Bot className="h-4 w-4" />
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-bold text-sm leading-tight">
                                                                                {model.name}
                                                                            </div>
                                                                            <div className="text-[11px] opacity-60 mt-0.5">
                                                                                {model.description}
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={
                                                    isLoading ||
                                                    (!inputValue.trim() && uploadedFiles.length === 0)
                                                }
                                                className="h-10 w-10 rounded-xl bg-[#2443B0] flex items-center justify-center text-white hover:bg-[#1e3895] transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                <ArrowRight className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Click Outside Overlay */}
            {showModelDropdown && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setShowModelDropdown(false)}
                />
            )}
        </div>
    );
};