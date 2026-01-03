import { Router, Request, Response } from 'express';
import { env } from '../config/database';

const router: Router = Router();

// ===================== AI CHAT =====================
router.post('/chat', async (req: Request, res: Response) => {
    try {
        const { message, model } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Pesan tidak boleh kosong'
            });
        }

        if (!env.openRouterApiKey) {
            return res.status(500).json({
                success: false,
                message: 'API Key OpenRouter tidak dikonfigurasi'
            });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.openRouterApiKey}`,
                "HTTP-Referer": "https://techroot.id", // Site URL
                "X-Title": "Techroot", // Site Name
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model || "google/gemma-2-9b-it:free",
                "messages": [
                    { "role": "user", "content": message }
                ],
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenRouter error:', data);
            return res.status(response.status).json({
                success: false,
                message: 'Terjadi kesalahan pada AI service',
                error: data.error?.message || 'Unknown error'
            });
        }

        res.json({
            success: true,
            data: {
                reply: data.choices[0].message.content,
                model: data.model
            }
        });

    } catch (error: any) {
        console.error('AI Chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
});

export default router;
