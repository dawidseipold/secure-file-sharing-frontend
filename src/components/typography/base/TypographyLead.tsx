import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyLeadVariants = tv({
  base: cn(
    "typography-base",
    "text-lg sm:text-xl",
    "leading-relaxed",
    "text-slate-600 dark:text-slate-300",
  ),
});

interface TypographyLeadProps {
  children: ReactNode;
  className?: string;
}

export const TypographyLead: FC<TypographyLeadProps> = ({
  children,
  className,
}) => {
  return <p className={cn(typographyLeadVariants(), className)}>{children}</p>;
};
