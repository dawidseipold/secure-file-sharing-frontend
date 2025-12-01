import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographySmallVariants = tv({
  base: cn(
    "typography-base",
    "text-xs sm:text-sm",
    "font-normal leading-relaxed",
    "text-slate-500 dark:text-slate-400",
  ),
});

interface TypographySmallProps {
  children: ReactNode;
  className?: string;
}

export const TypographySmall: FC<TypographySmallProps> = ({
  children,
  className,
}) => {
  return <p className={cn(typographySmallVariants(), className)}>{children}</p>;
};
