export type WizardStep = "welcome" | "purpose" | "field" | "level" | "time" | "goal" | "confirm" | "generating" | "result";

export interface RoadmapFormData {
    purpose: string;
    field: string;
    level: string;
    dailyTime: string;
    duration: string;
    goal: string;
    additionalInfo: string;
}

export interface RoadmapResource {
    type: "video" | "article" | "official" | "course";
    label: string;
    url: string;
}

export interface RoadmapNode {
    id: string;
    title: string;
    type: "topic" | "checkpoint";
    description: string;
    resources: RoadmapResource[];
}

export interface RoadmapData {
    overview: string;
    nodes: RoadmapNode[];
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}
