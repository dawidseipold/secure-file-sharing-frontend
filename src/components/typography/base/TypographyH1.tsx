import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyH1Variants = tv({
  base: cn(
    "typography-base",
    "scroll-m-20 text-4xl sm:text-5xl lg:text-6xl",
    "font-semibold tracking-tight leading-tight",
  ),
});

interface TypographyH1Props {
  children: ReactNode;
  className?: string;
}

export const TypographyH1: FC<TypographyH1Props> = ({
  children,
  className,
}) => {
  return <h1 className={cn(typographyH1Variants(), className)}>{children}</h1>;
};
