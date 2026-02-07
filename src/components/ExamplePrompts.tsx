import { motion } from "framer-motion";
import { Lightbulb, CheckSquare, Calculator, Cloud } from "lucide-react";

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const examples = [
  { 
    prompt: "Create a todo list app", 
    icon: CheckSquare, 
    desc: "Task management" 
  },
  { 
    prompt: "Build a calculator", 
    icon: Calculator, 
    desc: "Math operations" 
  },
  { 
    prompt: "Weather dashboard", 
    icon: Cloud, 
    desc: "Data display" 
  },
];

export function ExamplePrompts({ onSelectPrompt }: ExamplePromptsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <p className="text-xs font-medium uppercase tracking-wider">
          Try these examples
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {examples.map((example, i) => (
          <motion.button
            key={example.prompt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all text-left"
            onClick={() => onSelectPrompt(example.prompt)}
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <example.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{example.prompt}</p>
              <p className="text-xs text-muted-foreground">{example.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
