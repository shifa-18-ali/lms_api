import axios from "axios";

export const translateUsingMyMemory = async (text: string, targetLang: string) => {
  try {
    const response = await axios.get("https://api.mymemory.translated.net/get", {
      params: {
        q: text,
        langpair: `auto|${targetLang}`
      }
    });

    return response.data.responseData.translatedText;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Translation failed");
  }
};
