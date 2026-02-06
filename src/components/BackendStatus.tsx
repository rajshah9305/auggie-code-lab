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
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
      <Cloud className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <p className="text-sm font-medium">Backend Status</p>
        {message && <p className="text-xs text-muted-foreground">{message}</p>}
      </div>
      <div className="flex items-center gap-2">
        {status === "connected" && <CheckCircle2 className="h-5 w-5 text-primary" />}
        {status === "error" && <XCircle className="h-5 w-5 text-destructive" />}
        {status === "checking" && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
        <Button 
          size="sm" 
          variant="outline" 
          onClick={checkBackend}
          disabled={status === "checking"}
        >
          {status === "idle" ? "Test Connection" : "Retest"}
        </Button>
      </div>
    </div>
  );
}
