"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, X, User as UserIcon, MoreHorizontal, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
    id: string;
    sender: {
        id: string;
        name: string;
        avatar?: string;
    };
    content: string;
    images?: string[];
    timestamp: Date;
    isMe: boolean;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        sender: { id: "2", name: "Sarah Connor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        content: "Halo semua! Ada yang sudah paham bagian 'Advanced Hook' belum? Agak bingung di pengaplikasiannya.",
        timestamp: new Date(Date.now() - 3600000 * 2),
        isMe: false,
    },
    {
        id: "2",
        sender: { id: "3", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
        content: "Gw juga sempet bingung, tapi coba cek gambar arsitektur ini, mungkin ngebantu.",
        images: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop"],
        timestamp: new Date(Date.now() - 3600000 * 1.5),
        isMe: false,
    },
    {
        id: "3",
        sender: { id: "4", name: "Anita Wijaya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita" },
        content: "Wah makasih banyak mas Budi! Membantu banget gambarnya.",
        timestamp: new Date(Date.now() - 3600000),
        isMe: false,
    },
];

export const DiscussionForum = () => {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() && selectedImages.length === 0) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: {
                id: user?.id || "me",
                name: user?.name || "Anda",
                avatar: user?.avatar,
            },
            content: inputValue,
            images: selectedImages.map(file => URL.createObjectURL(file)),
            timestamp: new Date(),
            isMe: true,
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
        setSelectedImages([]);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedImages(prev => [...prev, ...Array.from(files)]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="relative w-full h-full bg-slate-50/50">
            {/* Forum Header */}
            <div className="absolute top-0 left-0 right-0 px-4 py-3 border-b border-border bg-white flex items-center justify-between z-30">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">Forum Diskusi</h3>
                    <p className="text-[10px] text-muted-foreground">Aktif sekarang • {messages.length + 12} anggota</p>
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </button>
            </div>

            {/* Messages List */}
            <div
                ref={scrollRef}
                className="absolute top-[57px] bottom-[180px] left-0 right-0 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.isMe ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        <Avatar className="h-8 w-8 shrink-0 border border-slate-100 shadow-sm mt-0.5">
                            <AvatarImage src={msg.sender.avatar} />
                            <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                        </Avatar>

                        <div className={cn(
                            "flex flex-col max-w-[80%]",
                            msg.isMe ? "items-end" : "items-start"
                        )}>
                            <div className="flex items-center gap-2 mb-1 px-1">
                                <span className="text-[11px] font-bold text-slate-700">{msg.sender.name}</span>
                                <span className="text-[9px] text-slate-400">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className={cn(
                                "p-3 rounded-2xl shadow-sm text-sm leading-relaxed",
                                msg.isMe
                                    ? "bg-[#2443B0] text-white rounded-tr-none"
                                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                            )}>
                                {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}

                                {msg.images && msg.images.length > 0 && (
                                    <div className={cn(
                                        "grid gap-2 mt-2",
                                        msg.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                                    )}>
                                        {msg.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt="Shared"
                                                className="rounded-lg object-cover w-full max-h-48 border border-white/20 shadow-sm"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area (Fixed Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-xl border-t border-slate-200/80 z-30 shadow-2xl">
                <form onSubmit={handleSendMessage} className="px-4 py-3 pb-14">
                    {/* Image Previews */}
                    {selectedImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 p-2 bg-slate-50/50 rounded-xl border border-slate-100">
                            {selectedImages.map((file, index) => (
                                <div key={index} className="relative group animate-in zoom-in-95 duration-200">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="h-16 w-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:shadow-lg transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Input Container */}
                    <div className="relative bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#2443B0]/20 focus-within:border-[#2443B0]">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            placeholder="Tulis pesan Anda..."
                            className="w-full bg-transparent px-4 py-3 pr-24 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none min-h-[52px] max-h-32"
                            rows={1}
                        />

                        {/* Action Buttons */}
                        <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-slate-400 hover:text-[#2443B0] hover:bg-slate-50 rounded-xl transition-all group"
                                title="Unggah gambar"
                            >
                                <ImageIcon className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" />
                            </button>

                            <div className="w-px h-6 bg-slate-200"></div>

                            <button
                                type="submit"
                                disabled={!inputValue.trim() && selectedImages.length === 0}
                                className="p-2 bg-[#2443B0] text-white rounded-sm hover:bg-[#1e3895] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 group"
                                title="Kirim pesan"
                            >
                                <Send className="h-4.5 w-4.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden"
                        accept="image/*"
                        multiple
                    />

                    {/* Helper Text */}
                    <p className="text-[10px] text-center text-slate-400 mt-2.5 flex items-center justify-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                        Hargai sesama pengguna dalam berdiskusi
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                    </p>
                </form>
            </div>
        </div>
    );
};
