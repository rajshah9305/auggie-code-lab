import { History as HistoryIcon, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const historyItems = [
  {
    id: 1,
    title: "Todo List Application",
    description: "A simple todo list with add, edit, and delete functionality",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "Real-time weather data with 7-day forecast",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    title: "Calculator App",
    description: "Basic calculator with arithmetic operations",
    timestamp: "1 day ago",
  },
];

export default function History() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <HistoryIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Generation History</h1>
            <p className="text-muted-foreground">
              View your previously generated applications
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {historyItems.map((item) => (
            <Card
              key={item.id}
              className="hover:border-primary/50 transition-all group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{item.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (can be shown when no history) */}
        {historyItems.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <HistoryIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
                <p className="text-muted-foreground">
                  Your generated applications will appear here
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
