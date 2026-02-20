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
    <div className="flex flex-col h-[calc(100dvh-57px)] bg-background overflow-hidden">
      {/* Centered hero */}
      <div className="flex-1 flex items-center justify-center px-4 min-h-0">
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary shadow-glow mx-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            What do you want to build?
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm sm:max-w-md mx-auto">
            Describe your idea and watch it come to life.
          </p>
        </motion.div>
      </div>

      {/* Bottom-pinned input */}
      <motion.div
        className="shrink-0 w-full max-w-2xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-2.5 sm:p-4 shadow-sm">
          <ChatInput
            onSend={handleSendMessage}
            placeholder="Describe the app you want to build..."
          />
        </div>
      </motion.div>
    </div>
  );
}
