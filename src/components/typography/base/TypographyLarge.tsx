import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyLargeVariants = tv({
  base: cn(
    "typography-base",
    "text-lg sm:text-xl",
    "font-medium leading-relaxed",
  ),
});

interface TypographyLargeProps {
  children: ReactNode;
  className?: string;
}

export const TypographyLarge: FC<TypographyLargeProps> = ({
  children,
  className,
}) => {
  return <p className={cn(typographyLargeVariants(), className)}>{children}</p>;
};
