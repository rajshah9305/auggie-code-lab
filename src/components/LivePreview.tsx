import { Monitor, Smartphone, Tablet, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  jsx: string;
  css: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";

export function LivePreview({ jsx, css }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isLoading, setIsLoading] = useState(true);

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

  const iframeSrcDoc = useMemo(() => {
    if (!jsx) return "";
    
    const cleanedJsx = jsx
      .replace(/import React.*?from ['"]react['"];?\n?/g, '')
      .replace(/import \{ useState \}.*?from ['"]react['"];?\n?/g, '')
      .replace(/import \{.*?\}.*?from ['"]react['"];?\n?/g, '');

    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      ${css}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" data-presets="react">
      const { useState, useEffect, useRef, useCallback, useMemo } = React;
      
      ${cleanedJsx}
      
      const componentMatch = \`${cleanedJsx}\`.match(/function\\s+(\\w+)/);
      const ComponentName = componentMatch ? componentMatch[1] : null;
      
      if (ComponentName) {
        const Component = eval(ComponentName);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Component));
      }
    </script>
  </body>
</html>`;
  }, [jsx, css]);

  if (!jsx) {
    return (
      <div className="flex items-center justify-center h-full bg-preview-bg">
        <motion.div 
          className="text-center text-muted-foreground p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative mb-6">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <Monitor className="h-10 w-10 opacity-40" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Live Preview</h3>
          <p className="text-sm max-w-xs mx-auto">
            Describe your app in the chat and see it come to life here
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-preview-bg">
      {/* Toolbar */}
      <div className="border-b border-border px-3 sm:px-4 py-2 flex items-center justify-between bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium">Live Preview</span>
        </div>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
          {[
            { mode: "desktop" as ViewMode, icon: Monitor },
            { mode: "tablet" as ViewMode, icon: Tablet },
            { mode: "mobile" as ViewMode, icon: Smartphone },
          ].map(({ mode, icon: Icon }) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 rounded-md",
                viewMode === mode && "shadow-sm"
              )}
              onClick={() => setViewMode(mode)}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-2 sm:p-4 md:p-6 flex justify-center bg-gradient-to-b from-muted/20 to-muted/40">
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            className={cn("transition-all duration-300 w-full", getPreviewWidth())}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/50 relative">
              {/* Browser Chrome */}
              <div className="bg-muted/50 px-3 py-2 border-b border-border/50 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 ml-2">
                  <div className="bg-background/80 rounded-md px-3 py-1 text-xs text-muted-foreground text-center max-w-xs mx-auto">
                    localhost:5173
                  </div>
                </div>
              </div>
              
              {/* Iframe */}
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                )}
                <iframe
                  srcDoc={iframeSrcDoc}
                  className="w-full min-h-[400px] h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)] border-0"
                  title="Live Preview"
                  sandbox="allow-scripts"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
