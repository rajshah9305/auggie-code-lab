import { useState, useEffect } from "react";
import { Settings, Key, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function ApiKeySettings() {
  const [open, setOpen] = useState(false);
  const [groqKey, setGroqKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setGroqKey(localStorage.getItem("groq_api_key") || "");
    }
  }, [open]);

  const handleSave = () => {
    if (groqKey.trim()) {
      localStorage.setItem("groq_api_key", groqKey.trim());
    } else {
      localStorage.removeItem("groq_api_key");
    }
    toast({ title: "Settings saved", description: "Your API key has been updated." });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            API Keys
          </DialogTitle>
          <DialogDescription>
            Configure your API keys for code generation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="groq-key">Groq API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="groq-key"
                  type={showKey ? "text" : "password"}
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="gsk_..."
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your key from{" "}
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                console.groq.com
              </a>
            </p>
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
