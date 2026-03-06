import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(16,185,129,0.25)] hover:-translate-y-px hover:bg-[var(--accent-primary-bright)] hover:shadow-[0_10px_24px_rgba(16,185,129,0.2)]",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground shadow-[0_2px_10px_rgba(239,68,68,0.24)] hover:-translate-y-px hover:brightness-110",
        outline:
          "border border-[var(--border-normal)] bg-transparent text-foreground shadow-none hover:-translate-y-px hover:border-[var(--border-hover)] hover:bg-[rgba(255,255,255,0.035)]",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground shadow-[0_2px_10px_rgba(245,158,11,0.22)] hover:-translate-y-px hover:bg-[var(--accent-gold-light)] hover:shadow-[0_10px_24px_rgba(245,158,11,0.18)]",
        ghost:
          "border border-transparent bg-transparent text-muted-foreground shadow-none hover:bg-[rgba(255,255,255,0.05)] hover:text-foreground",
        link: "rounded-none border-0 bg-transparent px-0 text-primary shadow-none hover:text-[var(--accent-primary-bright)] hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
