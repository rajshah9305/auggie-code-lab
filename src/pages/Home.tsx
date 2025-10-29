import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";
import { ExamplePrompts } from "@/components/ExamplePrompts";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
    toast({
      title: "Message Sent",
      description: "Your app idea has been submitted for generation.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-8">
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

        {/* Messages Display */}
        {messages.length > 0 && (
          <div className="space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-primary/10 border border-primary/20 p-4"
              >
                <p className="text-sm">{msg}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
