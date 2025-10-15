import axios from "axios";

export const translateUsingAPI = async (text: string, targetLang: string): Promise<string> => {
  const url = "https://translate.argosopentech.com/translate";

  const response = await axios.post(
    url,
    {
      q: text,
      source: "auto", // Automatically detects language
      target: targetLang,
      format: "text"
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  return response.data.translatedText;
};
