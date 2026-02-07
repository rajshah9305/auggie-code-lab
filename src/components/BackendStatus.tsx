import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Cloud, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function BackendStatus() {
  const [status, setStatus] = useState<"idle" | "checking" | "connected" | "error">("idle");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const checkBackend = async () => {
    setStatus("checking");
    try {
      const { data, error } = await supabase.functions.invoke("health-check");
      
      if (error) throw error;
      
      setStatus("connected");
      setMessage(data.message);
      toast({
        title: "Backend Connected!",
        description: data.message,
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to connect");
      toast({
        title: "Connection Failed",
        description: "Could not reach the backend",
        variant: "destructive",
      });
    }
  };

  const statusConfig = {
    idle: { color: "text-muted-foreground", bg: "bg-muted" },
    checking: { color: "text-primary", bg: "bg-primary/10" },
    connected: { color: "text-emerald-500", bg: "bg-emerald-500/10" },
    error: { color: "text-destructive", bg: "bg-destructive/10" },
  };

  const config = statusConfig[status];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition-all duration-300",
        status === "connected" ? "border-emerald-500/30 bg-emerald-500/5" :
        status === "error" ? "border-destructive/30 bg-destructive/5" :
        "border-border bg-muted/30"
      )}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className={cn("p-2 rounded-lg", config.bg)}>
          <Cloud className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium">Backend</p>
          {message ? (
            <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-none">
              {message}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {status === "idle" ? "Click to test connection" : "Checking..."}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {status === "connected" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 text-emerald-500"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-medium hidden sm:inline">Connected</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 text-destructive"
          >
            <XCircle className="h-4 w-4" />
            <span className="text-xs font-medium hidden sm:inline">Error</span>
          </motion.div>
        )}
        {status === "checking" && (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        )}
        <Button 
          size="sm" 
          variant={status === "idle" ? "default" : "outline"}
          onClick={checkBackend}
          disabled={status === "checking"}
          className="flex-1 sm:flex-none text-xs h-8 gap-1.5"
        >
          {status === "idle" ? (
            "Test"
          ) : (
            <>
              <RefreshCw className={cn("h-3 w-3", status === "checking" && "animate-spin")} />
              <span className="hidden sm:inline">Retest</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
