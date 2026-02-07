import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50 border border-border">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium">Backend</p>
          {message && <p className="text-xs text-muted-foreground truncate">{message}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {status === "connected" && <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />}
        {status === "error" && <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive shrink-0" />}
        {status === "checking" && <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary shrink-0" />}
        <Button 
          size="sm" 
          variant="outline" 
          onClick={checkBackend}
          disabled={status === "checking"}
          className="flex-1 sm:flex-none text-xs sm:text-sm h-8"
        >
          {status === "idle" ? "Test" : "Retest"}
        </Button>
      </div>
    </div>
  );
}
