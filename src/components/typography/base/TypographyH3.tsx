import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyH3Variants = tv({
  base: cn(
    "typography-base",
    "scroll-m-20 text-2xl sm:text-3xl",
    "font-semibold tracking-tight leading-snug",
  ),
});

interface TypographyH3Props {
  children: ReactNode;
  className?: string;
}

export const TypographyH3: FC<TypographyH3Props> = ({
  children,
  className,
}) => {
  return <h3 className={cn(typographyH3Variants(), className)}>{children}</h3>;
};
