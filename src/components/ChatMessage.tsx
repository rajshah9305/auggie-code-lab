import { User, Bot, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 p-4 rounded-xl transition-colors",
        role === "user" 
          ? "bg-muted/50" 
          : "bg-gradient-to-br from-card to-card/80 border border-border/50"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm",
          role === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-gradient-to-br from-secondary to-muted"
        )}
      >
        {role === "user" ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>
      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="font-medium text-sm flex items-center gap-2">
          {role === "user" ? "You" : (
            <>
              <span className="text-primary">AI Assistant</span>
              <Sparkles className="h-3 w-3 text-primary/60" />
            </>
          )}
        </div>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            </div>
            <span className="text-sm">Building your app...</span>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-foreground/90">{content}</div>
        )}
      </div>
    </motion.div>
  );
}
