"use client";
import { useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

export default function ChatInput({ onSend }: any) {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn’t support speech recognition.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        mt: 2,
        gap: 1,
        width: "100%",
        maxWidth: "700px",
        mx: "auto",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something about GMU..."
      />
      <IconButton
        color={listening ? "secondary" : "primary"}
        onClick={handleVoice}
        title="Voice input"
      >
        {listening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
      <IconButton color="primary" type="submit" title="Send">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
