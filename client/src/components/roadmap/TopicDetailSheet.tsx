"use client";

import React from "react";
import { Sparkles, BookOpen, Zap, ArrowRight, User, Link as LinkIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RoadmapNode, ChatMessage } from "@/types/roadmap";

interface TopicDetailSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    topic: RoadmapNode | null;
    activeTab: "resources" | "tutor";
    onTabChange: (tab: "resources" | "tutor") => void;
    messages: ChatMessage[];
    tutorInput: string;
    onTutorInputChange: (value: string) => void;
    onTutorSend: () => void;
    tutorLoading: boolean;
}

export const TopicDetailSheet = ({
    open,
    onOpenChange,
    topic,
    activeTab,
    onTabChange,
    messages,
    tutorInput,
    onTutorInputChange,
    onTutorSend,
    tutorLoading
}: TopicDetailSheetProps) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-2xl p-0 border-l border-slate-100 shadow-2xl overflow-hidden rounded-l-4xl">
                <div className="flex h-full flex-col bg-white">
                    <div className="relative p-8 bg-[#2443B0] text-white">
                        <div className="relative z-10 space-y-2">
                            <Badge className="bg-[#D7FE44] text-[#1a1a1a] border-none font-black text-[10px] uppercase tracking-widest hover:bg-[#D7FE44]">
                                Learning Module
                            </Badge>
                            <SheetTitle className="text-3xl font-black tracking-tight leading-tight text-white m-0">
                                {topic?.title || "Topic Details"}
                            </SheetTitle>
                        </div>
                    </div>

                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => onTabChange(v as any)}
                        className="flex h-full flex-col"
                    >
                        <TabsList className="grid w-full grid-cols-2 h-14 bg-slate-100/50 p-1.5 rounded-xl">
                            <TabsTrigger value="resources" className="rounded-md font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#2443B0] data-[state=active]:shadow-sm cursor-pointer">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Bahan Materi
                            </TabsTrigger>
                            <TabsTrigger value="tutor" className="rounded-md font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#2443B0] data-[state=active]:shadow-sm cursor-pointer">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Tanya Root
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="resources" className="flex-1 data-[state=active]:flex flex-col mt-0">
                            <ScrollArea className="flex-1">
                                <div className="p-8 space-y-8">
                                    <div className="space-y-3">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                            Overview Pembelajaran
                                        </p>
                                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                            <p className="text-slate-600 font-medium leading-relaxed">
                                                {topic?.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                            Ekosistem Belajar (Suggested Links)
                                        </p>
                                        <div className="grid gap-3">
                                            {topic?.resources && topic.resources.length > 0 ? (
                                                topic.resources.map((res, i) => (
                                                    <a
                                                        key={i}
                                                        href={res.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-[#D7FE44] hover:bg-[#D7FE44]/5 transition-all"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={cn(
                                                                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                                                res.type === "video" ? "bg-red-50 text-red-500 group-hover:bg-red-100" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
                                                            )}>
                                                                {res.type === "video" ? (
                                                                    <Zap className="h-6 w-6" />
                                                                ) : (
                                                                    <BookOpen className="h-6 w-6" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900 text-base">{res.label}</p>
                                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                                    {res.type} Resource
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#2443B0] group-hover:text-white transition-all">
                                                            <ArrowRight className="h-4 w-4" />
                                                        </div>
                                                    </a>
                                                ))
                                            ) : (
                                                <div className="text-center py-10 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                                    <p className="text-sm text-slate-400 font-medium">
                                                        Belum ada link materi spesifik. <br />Gunakan AI Tutor di tab sebelah untuk meminta bantuan.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="tutor" className="flex-1 data-[state=active]:flex flex-col mt-0">
                            <ScrollArea className="flex-1">
                                <div className="p-8 space-y-6">
                                    {messages.length === 0 && (
                                        <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-3">
                                            <div className="h-12 w-12 rounded-full bg-[#2443B0]/5 flex items-center justify-center mb-2">
                                                <Sparkles className="h-6 w-6 text-[#2443B0]" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700">
                                                Selamat datang di Root AI
                                            </h3>
                                            <p className="max-w-md text-sm leading-relaxed">
                                                Ajukan pertanyaanmu di sini.
                                                Aku akan membantu kamu belajar dengan penjelasan yang mudah dipahami.
                                            </p>
                                        </div>
                                    )}

                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex w-full gap-3",
                                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                                    msg.role === "user"
                                                        ? "bg-slate-100 text-slate-500"
                                                        : "bg-[#2443B0] text-white"
                                                )}
                                            >
                                                {msg.role === "user" ? (
                                                    <User className="h-4 w-4" />
                                                ) : (
                                                    <Sparkles className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div
                                                className={cn(
                                                    "max-w-[85%] rounded-[1.5rem] p-4 text-sm font-medium leading-relaxed",
                                                    msg.role === "user"
                                                        ? "bg-[#2443B0] text-white rounded-tr-none"
                                                        : "bg-slate-100 text-slate-800 rounded-tl-none"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}

                                    {tutorLoading && (
                                        <div className="flex gap-3">
                                            <div className="h-8 w-8 rounded-full bg-[#2443B0] flex items-center justify-center flex-shrink-0 animate-pulse">
                                                <Sparkles className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="bg-slate-50 rounded-[1.5rem] p-4 rounded-tl-none flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce" />
                                                <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce delay-75" />
                                                <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        onTutorSend();
                                    }}
                                    className="relative"
                                >
                                    <Textarea
                                        rows={2}
                                        value={tutorInput}
                                        onChange={(e) => onTutorInputChange(e.target.value)}
                                        placeholder={`Apa yang ingin kamu ketahui tentang ${topic?.title ?? "topik ini"}?`}
                                        className="w-full bg-white rounded-3xl border-slate-200 focus:border-[#2443B0] focus:ring-[#2443B0]/10 p-5 pr-14 resize-none shadow-sm text-sm font-medium"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={tutorLoading || !tutorInput.trim()}
                                        className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-[#2443B0] text-white hover:bg-[#1a36a9] cursor-pointer"
                                    >
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </SheetContent>
        </Sheet>
    );
};
