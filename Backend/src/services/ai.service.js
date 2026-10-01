require("dotenv").config();

const getAIResponse = async (prompt) => {
  // try block ke andar hum wo code likhte hain
  // jisme error aa sakta hai
  try {
    // .env file se OpenRouter API key le rahe hain
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_MODEL =
      process.env.OPENROUTER_MODEL || "google/gemini-3.7-flash";

    //if api is not available
    // Agar API key nahi hai to error throw hoga
    if (!OPENROUTER_API_KEY) {
      throw new Error("No api key configured. Please set OPENROUTER_API_KEY.");
    }

    // fetch() ka use karke OpenRouter API ko request bhej rahe hain
    //
    // await ka matlab:
    // response aane tak wait karo
    //actual api req bhjenge
    //  fetch() ek Promise return karta hai
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // POST ka matlab hum server ko data bhej rahe hain
        method: "POST",
        // headers API ko request ke baare me
        // additional information dete hain
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`, //OpenRouter ko API key deni hai.
          "Content-Type": "application/json", //Server ko bata rahe://Main request body JSON format mein bhej raha hoon.

          "HTTP-Referer": "http://localhost:5173", //Development mein frontend ka URL.
          "X-Title": "ChattyBot", //Application identification ke liye.
        },
        // body ke andar hum actual data bhej rahe hai
        //js ko json string me convert kar rhe hai
        body: JSON.stringify({
          model: OPENROUTER_MODEL, //openRouter ko batao:Kaunsa AI model use karna hai?
          messages: [
            {
              // system message AI ki personality/
              // instructions define karta hai
              role: "system",
              // AI ko instruction de rahe hain
            content: `You are a helpful AI assistant.Keep answers concise and easy to understand.
               Your personality traits:
              - You're warm, approachable, and conversational
              - You provide clear, concise answers
              - You use emojis sparingly to add personality
              - You're genuinely helpful and empathetic
              - You can handle both serious and lighthearted conversations
              Guidelines:
              - Keep answers concise and easy to understand.
              - Prefer short answers unless the user asks for detailed explanation.
              - Avoid unnecessary repetition.
              - Use markdown when helpful.
            Remember: You're here to help users feel understood and supported.`,
            },
            {
              //actual user ques
              role: "user",
              content: prompt,
            },
          ],
          //
          //low temperature
          // → more predictable

          // higher temperature
          // → more varied
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 700,
        }),
      },
    );
    const data = await response.json();

    console.log("OPENROUTER RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.error?.message || "OPENROUTER API Error");
    }

    return (
      data.choices[0]?.message?.content || "I couldn't generate a response."
    );
  } catch (error) {

    console.error("AI Service Error:", error);
    return "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.";
  }
};

module.exports = {
  getAIResponse,
};
