import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodePreviewProps {
  jsx: string;
  css: string;
  html: string;
}

export function CodePreview({ jsx, css, html }: CodePreviewProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!jsx && !css && !html) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Generated code will appear here</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="jsx" className="flex flex-col h-full">
      <div className="border-b border-border px-4 py-2 bg-code-bg">
        <TabsList className="bg-transparent">
          <TabsTrigger value="jsx" className="text-xs">
            App.jsx
          </TabsTrigger>
          <TabsTrigger value="css" className="text-xs">
            styles.css
          </TabsTrigger>
          <TabsTrigger value="html" className="text-xs">
            index.html
          </TabsTrigger>
        </TabsList>
      </div>

      <ScrollArea className="flex-1">
        <TabsContent value="jsx" className="mt-0 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={() => handleCopy(jsx, "jsx")}
          >
            {copied === "jsx" ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <pre className="p-4 text-xs font-mono overflow-x-auto">
            <code>{jsx}</code>
          </pre>
        </TabsContent>

        <TabsContent value="css" className="mt-0 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={() => handleCopy(css, "css")}
          >
            {copied === "css" ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <pre className="p-4 text-xs font-mono overflow-x-auto">
            <code>{css}</code>
          </pre>
        </TabsContent>

        <TabsContent value="html" className="mt-0 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={() => handleCopy(html, "html")}
          >
            {copied === "html" ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <pre className="p-4 text-xs font-mono overflow-x-auto">
            <code>{html}</code>
          </pre>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
