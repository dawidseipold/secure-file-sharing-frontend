import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyPVariants = tv({
  base: cn(
    "typography-base",
    "text-base sm:text-[15px]",
    "leading-relaxed",
    "text-slate-800 dark:text-slate-100",
  ),
});

interface TypographyPProps {
  children: ReactNode;
  className?: string;
}

export const TypographyP: FC<TypographyPProps> = ({ children, className }) => {
  return <p className={cn(typographyPVariants(), className)}>{children}</p>;
};
