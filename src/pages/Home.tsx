import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Zap, Code2, Layers } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";

export default function Home() {
  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    navigate("/split-view", { state: { prompt: message } });
  };

  const features = [
    { icon: Zap, title: "Instant", desc: "Generate in seconds" },
    { icon: Code2, title: "Full Code", desc: "React & TypeScript" },
    { icon: Layers, title: "Live Preview", desc: "See it working" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-background to-muted/30">
      <motion.div 
        className="w-full max-w-3xl space-y-6 sm:space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div 
            className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary shadow-glow mx-auto"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Build Apps with <span className="text-gradient">AI</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Describe your application idea in plain English and watch it come to life instantly.
            </p>
          </motion.div>
        </div>

        {/* Features Row */}
        <motion.div 
          className="flex justify-center gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            >
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-2">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm font-medium">{feature.title}</div>
              <div className="text-xs text-muted-foreground">{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Input */}
        <motion.div 
          className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ChatInput 
            onSend={handleSendMessage} 
            placeholder="Describe the app you want to build..."
          />
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Powered by AI • Generate React apps instantly
        </motion.p>
      </motion.div>
    </div>
  );
}
