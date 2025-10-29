import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Home from "./pages/Home";
import SplitView from "./pages/SplitView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold">RAJ AI</div>
            <div className="text-xs text-muted-foreground">APP BUILDER</div>
          </div>
        </button>
        {location.pathname === "/split-view" && (
          <div className="ml-auto text-xs text-muted-foreground">
            Building your app...
          </div>
        )}
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
        <div className="flex flex-col min-h-screen w-full">
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
