import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Code2, Eye, FileCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SplitView() {
  const [code] = useState(`import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Your Generated App
        </h1>
        <p className="text-muted-foreground">
          This is a preview of your application.
        </p>
      </div>
    </div>
  );
}

export default App;`);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Split View</h2>
            <p className="text-sm text-muted-foreground">
              Code editor and live preview
            </p>
          </div>
        </div>
      </div>

      {/* Split Panels */}
      <PanelGroup direction="horizontal" className="flex-1">
        {/* Code Panel */}
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-muted/30">
            <div className="border-b border-border p-3 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Code</span>
            </div>
            <div className="flex-1 overflow-auto">
              <Tabs defaultValue="jsx" className="h-full">
                <div className="border-b border-border px-3">
                  <TabsList className="bg-transparent h-10">
                    <TabsTrigger value="jsx">App.jsx</TabsTrigger>
                    <TabsTrigger value="css">styles.css</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="jsx" className="mt-0 h-full">
                  <pre className="p-6 text-sm font-mono">
                    <code>{code}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="css" className="mt-0 h-full">
                  <pre className="p-6 text-sm font-mono">
                    <code>{`/* Your styles */\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-2 bg-border hover:bg-primary transition-colors" />

        {/* Preview Panel */}
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-background">
            <div className="border-b border-border p-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Preview</span>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <Card className="p-8">
                <h1 className="text-4xl font-bold mb-4">Your Generated App</h1>
                <p className="text-muted-foreground">
                  This is a preview of your application.
                </p>
              </Card>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
