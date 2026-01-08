"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Typography, Avatar, Paper, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamBotResponse = async (fullText: string) => {
    let currentText = "";
    for (const word of fullText.split(" ")) {
      currentText += word + " ";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "bot", text: currentText.trim() };
        return updated;
      });
      await new Promise((resolve) => setTimeout(resolve, 50)); // speed
    }
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setHistory((prev) => [message, ...prev.slice(0, 9)]);
    setLoading(true);

    // Simulate a “typing” delay, then stream bot response
    const fakeResponse = `Here’s some detailed information about "${message}" from George Mason University. 🏛️`;

    setTimeout(async () => {
      setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
      setLoading(false);
      await streamBotResponse(fakeResponse);
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      <Sidebar onSelect={handleSend} />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />

        {/* Chat Window */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            scrollBehavior: "smooth",
          }}
        >
          {messages.length === 0 && (
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 10, color: "text.secondary" }}
            >
              👋 Welcome to the <b>George Mason Assistant</b>.  
              Ask me about courses, housing, shuttles, or dining!
            </Typography>
          )}

          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.sender === "bot" && (
                <Avatar sx={{ bgcolor: "#006633" }}>🎓</Avatar>
              )}
              <Paper
                elevation={msg.sender === "user" ? 3 : 1}
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  bgcolor:
                    msg.sender === "user"
                      ? "#006633"
                      : "background.paper",
                  color:
                    msg.sender === "user" ? "white" : "text.primary",
                  borderRadius: 4,
                  borderTopRightRadius: msg.sender === "user" ? 0 : 4,
                  borderTopLeftRadius: msg.sender === "bot" ? 0 : 4,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                  fontSize: "1rem",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
              {msg.sender === "user" && (
                <Avatar sx={{ bgcolor: "#FFCC33", color: "black" }}>🧑</Avatar>
              )}
            </motion.div>
          ))}

          {loading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <CircularProgress size={20} color="secondary" />
              <Typography variant="body2" color="text.secondary">
                George Mason Assistant is typing...
              </Typography>
            </Box>
          )}

          <div ref={chatEndRef} />
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: "1px solid #ccc" }}>
          <ChatInput onSend={handleSend} />
        </Box>

        {/* History Drawer */}
        <ChatHistory history={history} onSelect={handleSend} />
      </Box>
    </Box>
  );
}
