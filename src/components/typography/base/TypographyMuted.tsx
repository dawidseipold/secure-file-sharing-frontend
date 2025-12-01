import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyMutedVariants = tv({
  base: cn(
    "typography-base",
    "text-sm",
    "leading-relaxed",
    "text-slate-500 dark:text-slate-400",
  ),
});

interface TypographyMutedProps {
  children: ReactNode;
  className?: string;
}

export const TypographyMuted: FC<TypographyMutedProps> = ({
  children,
  className,
}) => {
  return <p className={cn(typographyMutedVariants(), className)}>{children}</p>;
};
