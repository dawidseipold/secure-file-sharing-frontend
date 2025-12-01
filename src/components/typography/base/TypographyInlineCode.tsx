import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyInlineCodeVariants = tv({
  base: cn(
    "font-mono text-[0.95em]",
    "px-1 py-0.5 rounded",
    "bg-slate-100/80 dark:bg-slate-800/80",
    "text-slate-900 dark:text-slate-50",
    "border border-slate-200/70 dark:border-slate-700",
  ),
});

interface TypographyInlineCodeProps {
  children: ReactNode;
  className?: string;
}

export const TypographyInlineCode: FC<TypographyInlineCodeProps> = ({
  children,
  className,
}) => {
  return (
    <code className={cn(typographyInlineCodeVariants(), className)}>
      {children}
    </code>
  );
};
