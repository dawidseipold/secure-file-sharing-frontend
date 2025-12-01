import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyH2Variants = tv({
  base: cn(
    "typography-base",
    "scroll-m-20 text-3xl sm:text-4xl",
    "font-semibold tracking-tight leading-snug",
  ),
});

interface TypographyH2Props {
  children: ReactNode;
  className?: string;
}

export const TypographyH2: FC<TypographyH2Props> = ({
  children,
  className,
}) => {
  return <h2 className={cn(typographyH2Variants(), className)}>{children}</h2>;
};
