import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
}) {
  const styles = {
    default: "bg-stone-100 text-stone-700",
    accent: "bg-amber-100 text-amber-900",
    outline: "border border-stone-200 text-stone-600 bg-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
