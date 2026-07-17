import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Groq } from "groq-sdk";
import { tavily } from "@tavily/core";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Initialize API clients
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// API endpoint for chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Create a system message
    const systemMessage = {
      role: "system",
      content: `You are a smart personal assistant who answers questions.
      You have access to the following tool:
      1. webSearch({query}: string) - Search the latest information and real-time data on the internet.
      Current datetime: ${new Date().toUTCString()}`,
    };

    const messagesWithSystem = [systemMessage, ...messages];

    // Call Groq with tools
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: messagesWithSystem,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the latest information and real-time data on the internet.",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
    });

    // Check if tool was called
    if (
      chatCompletion.choices[0].message.tool_calls &&
      chatCompletion.choices[0].message.tool_calls.length > 0
    ) {
      const toolCall = chatCompletion.choices[0].message.tool_calls[0];
      const searchQuery = JSON.parse(toolCall.function.arguments).query;

      // Perform web search
      const searchResults = await tvly.search(searchQuery);

      // Get final response with search results
      const finalMessages = [
        ...messagesWithSystem,
        {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
          tool_calls: chatCompletion.choices[0].message.tool_calls,
        },
        {
          role: "user",
          content: `Search results: ${JSON.stringify(searchResults)}`,
        },
      ];

      const finalResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: finalMessages,
      });

      return res.json({
        response: finalResponse.choices[0].message.content,
        searchResults: searchResults.results,
      });
    }

    res.json({
      response: chatCompletion.choices[0].message.content,
      searchResults: null,
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
