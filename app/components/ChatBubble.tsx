import { motion } from "framer-motion";

export default function ChatBubble({ sender, text }: any) {
  const isUser = sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}
    >
      <div
        className={`p-3 max-w-[75%] rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[#FFCC33] text-black shadow-lg"
            : "bg-white/80 backdrop-blur-md text-gray-800 border border-gray-200 shadow-sm"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
