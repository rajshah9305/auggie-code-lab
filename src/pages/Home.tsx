import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";

export default function Home() {
  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    navigate("/split-view", { state: { prompt: message } });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] bg-background">
      {/* Centered hero */}
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-glow mx-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            What do you want to build?
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Describe your idea and watch it come to life.
          </p>
        </motion.div>
      </div>

      {/* Bottom-pinned input */}
      <motion.div
        className="w-full max-w-2xl mx-auto px-4 pb-6 sm:pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-3 sm:p-4 shadow-sm">
          <ChatInput
            onSend={handleSendMessage}
            placeholder="Describe the app you want to build..."
          />
        </div>
      </motion.div>
    </div>
  );
}
