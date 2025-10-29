import { FileCode, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const sampleCode = {
  jsx: `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

export default App;`,
  css: `.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.counter {
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 2rem;
}

button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}`,
  json: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`,
};

export default function Code() {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileCode className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Generated Code</h1>
              <p className="text-muted-foreground">
                View and download your application code
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>

        {/* Code Viewer */}
        <Card className="overflow-hidden">
          <Tabs defaultValue="jsx" className="w-full">
            <div className="border-b border-border bg-muted/30 p-1">
              <TabsList className="bg-transparent">
                <TabsTrigger value="jsx">App.jsx</TabsTrigger>
                <TabsTrigger value="css">App.css</TabsTrigger>
                <TabsTrigger value="json">package.json</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(sampleCode).map(([key, code]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 gap-2"
                    onClick={() => handleCopy(code)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <pre className="p-6 overflow-auto max-h-[600px] text-sm font-mono">
                    <code>{code}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
