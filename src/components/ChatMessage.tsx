import { User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        role === "user" ? "bg-muted" : "bg-card"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
        )}
      >
        {role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-medium text-sm">
          {role === "user" ? "You" : "AI Assistant"}
        </div>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Generating your app...</span>
          </div>
        ) : (
          <div className="text-sm leading-relaxed">{content}</div>
        )}
      </div>
    </div>
  );
}
