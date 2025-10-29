import { Sparkles, Zap, Rocket, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Advanced AI creates production-ready code from your descriptions",
  },
  {
    icon: Zap,
    title: "Instant Preview",
    description: "See your app come to life in real-time as code is generated",
  },
  {
    icon: Rocket,
    title: "Ready to Deploy",
    description: "Generated code is clean, optimized, and ready for deployment",
  },
  {
    icon: Shield,
    title: "Best Practices",
    description: "Code follows industry standards and security best practices",
  },
];

export default function Generate() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-glow shadow-orange mx-auto">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Generate Your <span className="text-primary">App</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into working applications with the power of AI
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-orange-glow/5">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-2xl">Ready to Build?</CardTitle>
            <CardDescription className="text-base max-w-2xl mx-auto">
              Head to the Home page to describe your app, or check out the Split View to see
              code and preview side by side.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
