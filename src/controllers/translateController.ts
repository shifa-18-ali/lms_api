import { Request, Response } from "express";
import { translateUsingAPI } from "../services/translateService";

export const translateText = async (req: Request, res: Response) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({
        message: "Please provide both 'text' and 'targetLang' fields.",
      });
    }

    const translated = await translateUsingAPI(text, targetLang);
    res.json({
      original: text,
      translated: translated,
      targetLang,
    });
  } catch (error: any) {
    console.error("Error translating:", error.message);
    res.status(500).json({ message: "Translation failed", error: error.message });
  }
};
