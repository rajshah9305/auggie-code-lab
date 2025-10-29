import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";
import { ExamplePrompts } from "@/components/ExamplePrompts";

export default function Home() {
  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    // Navigate to split view with the prompt
    navigate("/split-view", { state: { prompt: message } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-glow shadow-orange mx-auto">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Start Creating <span className="text-primary">Apps</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Describe your application idea and I'll generate the code for you.
            </p>
          </div>
        </div>

        {/* Example Prompts */}
        <ExamplePrompts onSelectPrompt={handleSendMessage} />

        {/* Chat Input */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
