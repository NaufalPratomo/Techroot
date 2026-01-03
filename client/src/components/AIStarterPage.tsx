"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import {
    Search,
    Sparkles,
    Link2,
    Globe,
    Smile,
    ArrowRight,
    Bot,
    Paperclip,
    Image as ImageIcon,
    ChevronDown,
    X,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";


// Available AI models (OpenRouter Free Models)
const aiModels = [
    { id: 'google/gemma-2-27b-it:free', name: 'Gemma 2 27B', description: 'Google (Free)' },
    { id: 'openai/gpt-3.5-turbo', name: 'GPT-OSS 120B', description: 'OpenAI (Free)' }, // Note: Using gpt-3.5 as fallback if oss-120b is placeholder
    { id: 'qwen/qwen-2-7b-instruct:free', name: 'Qwen 3 Coder', description: 'Alibaba (Free)' },
    { id: 'deepseek/deepseek-r1-distill-llama-70b:free', name: 'Deepseek R1', description: 'Deepseek (Free)' },
];

// Fallback to exactly what user requested if they want specific strings
const requestedModels = [
    { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B', description: 'Google (Terbaru)' },
    { id: 'openai/gpt-oss-120b:free', name: 'GPT OSS 120B', description: 'OpenAI (Free)' },
    { id: 'qwen/qwen3-coder:free', name: 'Qwen 3 Coder', description: 'Qwen (Free)' },
    { id: 'deepseek/deepseek-r1-0528:free', name: 'Deepseek R1', description: 'Deepseek (Free)' },
];

export const AIStarterPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedModel, setSelectedModel] = useState(requestedModels[0]);
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const message = inputValue.trim();
        if (!message && uploadedFiles.length === 0) return;

        // Add user message to UI
        const newMessages = [...messages, { role: 'user', content: message } as const];
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);

        try {
            const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
            const endpoint = `${apiUrl}/api/ai/chat`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    model: selectedModel.id
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.message}` }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, terjadi kesalahan saat menghubungi AI." }]);
        } finally {
            setIsLoading(false);
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        }

    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Enter, new line on Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploadedFiles(prev => [...prev, ...Array.from(files)]);
        }
        e.target.value = '';
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    };

    return (
        <div className="relative flex flex-col h-full w-full overflow-hidden">
            {/* Background with bottom gradient - Blue & White */}
            <div className="absolute inset-0 bg-white" />

            {/* Bottom gradient overlay - Blue tones */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(36, 67, 176, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, rgba(147, 197, 253, 0.08) 50%, transparent 100%)'
                }}
            />

            {/* Additional gradient blobs - Blue theme */}
            <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-[20%] w-[350px] h-[350px] bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 w-full max-w-4xl mx-auto overflow-hidden">
                {messages.length === 0 ? (
                    /* Hero Section */
                    <div className="text-center max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-slate-900 leading-tight mb-6">
                            <span className="block">Kamu Punya Pertanyaan.</span>
                            <span className="block">Root Punya Jawaban.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-500 text-lg md:text-xl">
                            Tanyakan apapun tentang coding. Debug error. Minta contoh kode.
                        </p>
                    </div>
                ) : (
                    /* Chat History */
                    <div className="flex-1 w-full overflow-y-auto mb-6 px-2 space-y-6 pt-10 scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-500",
                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[85%] rounded-2xl p-4 shadow-sm",
                                    msg.role === 'user'
                                        ? "bg-[#2443B0] text-white rounded-tr-none"
                                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                                )}>
                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-2 mb-2 text-[#2443B0]">
                                            <Bot className="h-4 w-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Root AI</span>
                                        </div>
                                    )}
                                    <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="bg-white border border-slate-200 rounded-2xl p-4 rounded-tl-none shadow-sm">
                                    <div className="flex items-center gap-2 text-[#2443B0] mb-2">
                                        <Bot className="h-4 w-4 animate-bounce" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Root sedang berpikir...</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Input Box */}
                <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 transition-all focus-within:border-[#2443B0]/50 focus-within:ring-4 focus-within:ring-[#2443B0]/5">
                        {/* Uploaded Files Preview */}
                        {uploadedFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {uploadedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 text-sm"
                                    >
                                        {file.type.startsWith('image/') ? (
                                            <ImageIcon className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <FileText className="h-4 w-4 text-slate-500" />
                                        )}
                                        <span className="text-slate-700 max-w-[150px] truncate">
                                            {file.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Textarea Input */}
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                adjustTextareaHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            placeholder={isLoading ? "Tunggu sebentar..." : "Apa masalah coding yang sedang kamu hadapi?"}
                            rows={1}
                            className="w-full bg-transparent border-none outline-none text-slate-900 text-base placeholder:text-slate-400 mb-4 resize-none min-h-[24px] max-h-[200px] disabled:opacity-50"
                        />

                        {/* Bottom row with icons */}
                        <div className="flex items-center justify-between">
                            {/* Left icons */}
                            <div className="flex items-center gap-2 text-slate-400">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 rounded-lg hover:bg-slate-50 hover:text-[#2443B0] transition-colors"
                                >
                                    <Paperclip className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current?.click()}
                                    className="p-2 rounded-lg hover:bg-slate-50 hover:text-[#2443B0] transition-colors"
                                >
                                    <ImageIcon className="h-4 w-4" />
                                </button>
                                <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} className="hidden" />
                                <input ref={imageInputRef} type="file" multiple onChange={handleFileUpload} className="hidden" accept="image/*" />
                            </div>

                            {/* Right icons */}
                            <div className="flex items-center gap-2">
                                {/* Model Selector */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                                        className="h-9 px-3 rounded-lg border border-slate-200 flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-colors text-xs font-medium"
                                    >
                                        <Bot className="h-3.5 w-3.5 text-[#2443B0]" />
                                        <span className="hidden sm:inline">{selectedModel.name}</span>
                                        <ChevronDown className="h-3 w-3" />
                                    </button>

                                    {showModelDropdown && (
                                        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                                            <div className="p-2">
                                                <p className="text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-[0.1em]">
                                                    Pilih Model AI
                                                </p>
                                                {requestedModels.map((model) => (
                                                    <button
                                                        key={model.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedModel(model);
                                                            setShowModelDropdown(false);
                                                        }}
                                                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${selectedModel.id === model.id
                                                            ? 'bg-[#2443B0]/5 text-[#2443B0]'
                                                            : 'hover:bg-slate-50 text-slate-600'
                                                            }`}
                                                    >
                                                        <Bot className={`h-4 w-4 mt-0.5 ${selectedModel.id === model.id ? 'text-[#2443B0]' : 'text-slate-400'}`} />
                                                        <div>
                                                            <div className="font-bold text-sm leading-none mb-1">{model.name}</div>
                                                            <div className="text-[10px] opacity-70">{model.description}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Send Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || (!inputValue.trim() && uploadedFiles.length === 0)}
                                    className="h-9 w-9 rounded-lg bg-[#2443B0] flex items-center justify-center text-white hover:bg-[#1e3895] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer text */}
                <p className="text-[10px] text-slate-400 mt-2 mb-4 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-blue-400" />
                    Didukung oleh {selectedModel.name} melalui OpenRouter
                </p>
            </div>

            {/* Click outside to close dropdown */}
            {showModelDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowModelDropdown(false)}
                />
            )}
        </div>
    );
};
