import { Card } from "@/components/ui/card";

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const examples = [
  "Create a todo list",
  "Build a calculator",
  "Weather dashboard",
];

export function ExamplePrompts({ onSelectPrompt }: ExamplePromptsProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        TRY ASKING:
      </p>
      <div className="space-y-2">
        {examples.map((prompt) => (
          <Card
            key={prompt}
            className="p-4 cursor-pointer transition-all hover:border-primary hover:shadow-md hover:scale-[1.02]"
            onClick={() => onSelectPrompt(prompt)}
          >
            <p className="text-sm font-medium">"{prompt}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
