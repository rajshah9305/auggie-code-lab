import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Home as HomeIcon, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Home from "./pages/Home";
import SplitView from "./pages/SplitView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBuilding = location.pathname === "/split-view";

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold tracking-tight">RAJ AI</div>
            <div className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
              App Builder
            </div>
          </div>
        </motion.button>

        <div className="flex items-center gap-2">
          {isBuilding && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full"
            >
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>Building your app...</span>
            </motion.div>
          )}
          {isBuilding && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="h-8 px-3 text-xs"
            >
              <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen w-full bg-background">
          <AppHeader />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/split-view" element={<SplitView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
