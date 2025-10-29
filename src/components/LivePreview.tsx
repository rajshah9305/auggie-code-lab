import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  jsx: string;
  css: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";

export function LivePreview({ jsx, css }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  if (!jsx) {
    return (
      <div className="flex items-center justify-center h-full bg-preview-bg">
        <div className="text-center text-muted-foreground">
          <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Live preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-preview-bg">
      <div className="border-b border-border px-4 py-2 flex items-center justify-between bg-card">
        <span className="text-sm font-medium">Preview</span>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "desktop" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("desktop")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "tablet" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "mobile" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("mobile")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div className={cn("transition-all duration-300", getPreviewWidth())}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
            <iframe
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      * { margin: 0; padding: 0; box-sizing: border-box; }
                      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
                      ${css}
                    </style>
                  </head>
                  <body>
                    <div id="root"></div>
                    <script type="module">
                      try {
                        ${jsx.replace("export default", "const Component =")}
                        
                        const root = document.getElementById('root');
                        if (root) {
                          root.innerHTML = '<div style="min-height: 100vh;">App is rendering...</div>';
                        }
                      } catch(e) {
                        console.error('Preview error:', e);
                      }
                    </script>
                  </body>
                </html>
              `}
              className="w-full h-[600px] border-0"
              title="Live Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
