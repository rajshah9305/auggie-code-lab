import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MvpBadgeProps {
  size?: "sm" | "md";
  className?: string;
}

export function MvpBadge({ size = "sm", className }: MvpBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-widest rounded-full bg-primary text-primary-foreground shadow-md select-none",
        size === "sm" && "text-[9px] px-2 py-0.5",
        size === "md" && "text-[11px] px-3 py-1",
        className
      )}
    >
      MVP
    </motion.span>
  );
}
