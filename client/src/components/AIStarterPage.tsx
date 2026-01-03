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

// Available AI models
const aiModels = [
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Cepat & efisien' },
    { id: 'gemini-2.0-pro', name: 'Gemini 2.0 Pro', description: 'Lebih akurat' },
    { id: 'gpt-4o', name: 'GPT-4o', description: 'Model OpenAI' },
    { id: 'claude-3.5', name: 'Claude 3.5 Sonnet', description: 'Model Anthropic' },
];

export const AIStarterPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedModel, setSelectedModel] = useState(aiModels[0]);
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() || uploadedFiles.length > 0) {
            console.log("Submitted:", inputValue, "Files:", uploadedFiles, "Model:", selectedModel.id);
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
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mb-12">
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

                {/* Input Box */}
                <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-4">
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
                            placeholder="Apa masalah coding yang sedang kamu hadapi?"
                            rows={1}
                            className="w-full bg-transparent border-none outline-none text-slate-900 text-base placeholder:text-slate-400 mb-4 resize-none min-h-[24px] max-h-[200px]"
                        />

                        {/* Bottom row with icons */}
                        <div className="flex items-center justify-between">
                            {/* Left icons */}
                            <div className="flex items-center gap-2">
                                {/* File Upload */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
                                    title="Upload file"
                                >
                                    <Paperclip className="h-4 w-4" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept=".txt,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.html,.css,.json,.md"
                                />

                                {/* Image Upload */}
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current?.click()}
                                    className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
                                    title="Upload gambar"
                                >
                                    <ImageIcon className="h-4 w-4" />
                                </button>
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>

                            {/* Right icons */}
                            <div className="flex items-center gap-2">
                                {/* Model Selector Dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                                        className="h-9 px-3 rounded-lg border border-slate-200 flex items-center gap-2 text-slate-600 hover:border-slate-300 transition-colors text-sm"
                                    >
                                        <Bot className="h-4 w-4" />
                                        <span className="hidden sm:inline">{selectedModel.name}</span>
                                        <ChevronDown className="h-3.5 w-3.5" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showModelDropdown && (
                                        <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                                            <div className="p-2">
                                                <p className="text-xs font-medium text-slate-400 px-2 py-1 uppercase tracking-wider">
                                                    Pilih Model AI
                                                </p>
                                                {aiModels.map((model) => (
                                                    <button
                                                        key={model.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedModel(model);
                                                            setShowModelDropdown(false);
                                                        }}
                                                        className={`w-full flex items-start gap-3 p-2 rounded-lg text-left transition-colors ${selectedModel.id === model.id
                                                            ? 'bg-[#2443B0]/10 text-[#2443B0]'
                                                            : 'hover:bg-slate-50 text-slate-700'
                                                            }`}
                                                    >
                                                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <div className="font-medium text-sm">{model.name}</div>
                                                            <div className="text-xs text-slate-400">{model.description}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="h-9 w-9 rounded-lg bg-[#2443B0] flex items-center justify-center text-white hover:bg-[#1e3895] transition-colors"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer text */}
                <p className="text-xs text-slate-400 mt-6 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Didukung oleh {selectedModel.name}
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
