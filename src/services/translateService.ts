import axios from "axios";

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await axios.post(
      "https://translate.argosopentech.com/translate",
      {
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data.translatedText;
  } catch (err: any) {
    console.error("Error:", err.message);
    throw new Error("Translation failed");
  }
};
