import { tv } from "tailwind-variants";
import { cn } from "@/utils/styles";
import { type FC, type ReactNode } from "react";

const typographyH4Variants = tv({
  base: cn(
    "typography-base",
    "scroll-m-20 text-xl sm:text-2xl",
    "font-semibold tracking-tight leading-snug",
  ),
});

interface TypographyH4Props {
  children: ReactNode;
  className?: string;
}

export const TypographyH4: FC<TypographyH4Props> = ({
  children,
  className,
}) => {
  return <h4 className={cn(typographyH4Variants(), className)}>{children}</h4>;
};
